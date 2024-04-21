package woltHandlers

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"
	"time"

	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"

	"github.com/gofiber/fiber/v2"

	"github.com/Timotej979/Dragonhack24-BunchLunch/backend/api-docker/api/dal"
)

type WoltHandler struct {
	// DAL is the Data Access Layer
	dal       *dal.DAL
	googleKey string
}

func NewWoltHandler(dalConfig dal.DALConfig, logger zerolog.Logger, googleKey string) *WoltHandler {
	// Assign the logger to the handler
	log.Logger = logger

	// Create the DAL
	dalInstance, err := dal.NewDAL(&dalConfig)
	if err != nil {
		log.Fatal().Err(err).Msg("error creating the DAL")
	}

	// Connect to the database
	err = dalInstance.DbDriver.Connect()
	if err != nil {
		log.Fatal().Err(err).Msg("error connecting to the database")
	}

	// Migrate the database
	err = dalInstance.DbDriver.Migrate()
	if err != nil {
		log.Fatal().Err(err).Msg("error migrating the database")
	}

	return &WoltHandler{
		dal:       dalInstance,
		googleKey: googleKey,
	}
}

// ////////////////////////////////////////////////////////////////////////////////////////

// Healthz is a handler for the Instagram API health check
func (h *WoltHandler) Healthz(c *fiber.Ctx) error {
	log.Info().Msg("Checking mock API health...")
	return c.JSON(fiber.Map{"status": "ok"})
}

// Define a struct to represent the location data
type Location struct {
	Lat float64 `json:"lat"`
	Lon float64 `json:"lon"`
}

// Define a struct to represent the response from the Google Places API
type GooglePlacesResponse struct {
	Candidates []struct {
		Name             string  `json:"name"`
		FormattedAddress string  `json:"formatted_address"`
		PriceLevel       float64 `json:"price_level,omitempty"`
		Rating           float64 `json:"rating,omitempty"`
	} `json:"candidates"`
}

func (h *WoltHandler) GetRestaurants(c *fiber.Ctx) error {

	// Parse request body into Location struct
	var location Location
	if err := c.BodyParser(&location); err != nil {
		return err
	}

	// Access latitude and longitude
	lat := location.Lat
	lon := location.Lon

	// Log location data
	//log.Info().Float64("lat", lat).Float64("lon", lon).Msg("Received location data")

	// Call Wolt API
	woltURL := fmt.Sprintf("https://restaurant-api.wolt.com/v1/pages/restaurants?lat=%f&lon=%f", lat, lon)
	resp, err := http.Get(woltURL)
	if err != nil {
		log.Error().Err(err).Msg("Error calling Wolt API")
		return c.Status(500).JSON(fiber.Map{"error": "Error calling Wolt API"})
	}
	defer resp.Body.Close()

	// Decode JSON response from Wolt API
	var response map[string]interface{}
	if err := json.NewDecoder(resp.Body).Decode(&response); err != nil {
		log.Error().Err(err).Msg("Error decoding Wolt API response")
		return c.Status(500).JSON(fiber.Map{"error": "Error decoding Wolt API response"})
	}

	// Initialize gscores map
	gscores := make(map[string]map[string]interface{})

	// Create a channel to receive results
	ch := make(chan map[string]interface{})

	for _, rest := range response["sections"].([]interface{})[1].(map[string]interface{})["items"].([]interface{}) {
		// Extract trackID here
		trackID := rest.(map[string]interface{})["track_id"].(string)

		// Start a goroutine to call Google Places API
		go func(rest interface{}, trackID string) { // Pass trackID as an argument
			venue := rest.(map[string]interface{})["venue"].(map[string]interface{})
			name := strings.Split(venue["name"].(string), " | ")[0]
			lat := venue["location"].([]interface{})[1].(float64)
			lon := venue["location"].([]interface{})[0].(float64)

			googleURL := fmt.Sprintf("https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=formatted_address%%2Cname%%2Crating%%2Cprice_level&input=%s&inputtype=textquery&locationbias=point%%3A%f%%2C%f&key=%s", name, lat, lon, h.googleKey)

			req, err := http.NewRequest("GET", googleURL, nil)
			if err != nil {
				//log.Error().Err(err).Msg("Error creating Google Places API request")
				//ch <- nil // Send nil value to channel if error occurs
				return
			}

			req.Header.Set("Accept", "application/json")

			// Set timeout for the request
			client := &http.Client{
				Timeout: 100 * time.Second,
			}

			resp, err := client.Do(req)
			if err != nil {
				//log.Error().Err(err).Msg("Error sending Google Places API request")
				ch <- nil // Send nil value to channel if error occurs
				return
			}
			defer resp.Body.Close()

			bodyBytes, err := io.ReadAll(resp.Body)
			if err != nil {
				//log.Error().Err(err).Msg("Error reading Google Places API response body")
				ch <- nil // Send nil value to channel if error occurs
				return
			}

			var googleResponse GooglePlacesResponse
			if err := json.Unmarshal(bodyBytes, &googleResponse); err != nil {
				//log.Error().Err(err).Msg("Error decoding Google Places API response")
				ch <- nil // Send nil value to channel if error occurs
				return
			}

			if len(googleResponse.Candidates) == 0 {
				//log.Warn().Str("name", name).Msg("No candidates found")
				ch <- nil // Send nil value to channel if no candidate found
				return
			}

			candidate := googleResponse.Candidates[0]

			// Prepare data to send through the channel
			result := make(map[string]interface{})
			if candidate.PriceLevel != 0 {
				result["p"] = candidate.PriceLevel
			}
			if candidate.Rating != 0 {
				result["r"] = candidate.Rating
			}

			ch <- map[string]interface{}{"trackID": trackID, "data": result} // Send trackID and result through the channel
		}(rest, trackID) // Pass trackID as an argument
	}

	// Collect results from goroutines and populate gscores map
	for range response["sections"].([]interface{})[1].(map[string]interface{})["items"].([]interface{}) {
		result := <-ch // Receive result from the channel
		if result != nil {
			gscores[result["trackID"].(string)] = result["data"].(map[string]interface{})
		}
	}

	close(ch) // Close the channel after all results have been received

	// Write data to the database
	for trackID, data := range gscores {
		// Handle nil values
		if data["p"] == nil {
			data["p"] = -1.0
		}
		if data["r"] == nil {
			data["r"] = -1.0
		}
		// Insert data into the database
		err := h.dal.DbDriver.InsertRestaurantData(trackID, lat, lon, data["p"].(float64), data["r"].(float64))
		if err != nil {
			log.Error().Err(err).Msg("Error inserting data into the database")
		}
	}

	// Return gscores map
	return c.JSON(gscores)
}
