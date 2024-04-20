package woltHandlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"

	"github.com/gofiber/fiber/v2"

	"github.com/Timotej979/Dragonhack24-BunchLunch/backend/api-docker/api/dal"
)

type WoltHandler struct {
	// DAL is the Data Access Layer
	dal *dal.DAL
}

func NewWoltHandler(dalConfig dal.DALConfig, logger zerolog.Logger) *WoltHandler {
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

	/*
		// Migrate the database
		err = dalInstance.DbDriver.Migrate()
		if err != nil {
			log.Fatal().Err(err).Msg("error migrating the database")
		}
	*/

	return &WoltHandler{
		dal: dalInstance,
	}
}

// ////////////////////////////////////////////////////////////////////////////////////////

// Healthz is a handler for the Instagram API health check
func (h *WoltHandler) Healthz(c *fiber.Ctx) error {
	log.Info().Msg("Checking mock API health...")
	return c.JSON(fiber.Map{"status": "ok"})
}

// Struct to unmarshal JSON data
type Location struct {
	Lat float64 `json:"lat"`
	Lon float64 `json:"lon"`
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

	// Call Wolt API
	apiUrl := fmt.Sprintf("https://restaurant-api.wolt.com/v1/pages/restaurants?lat=%s&lon=%s", lat, lon)
	resp, err := http.Get(apiUrl)
	if err != nil {
		log.Error().Err(err).Msg("Error calling Wolt API")
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error calling Wolt API"})
	}

	// Deocde JSON response from Wolt API
	var response map[string]interface{}
	if err := json.NewDecoder(resp.Body).Decode(&response); err != nil {
		log.Error().Err(err).Msg("Error decoding Wolt API response")
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error decoding Wolt API response"})
	}

	// Write response to log
	log.Info().Interface("response", response).Msg("Wolt API response")

	// TODO: Save response to database

	// Return response
	return c.JSON(response)

}
