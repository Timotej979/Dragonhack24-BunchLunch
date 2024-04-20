package glovoHandlers

import (
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"

	"github.com/gofiber/fiber/v2"

	"github.com/Timotej979/Dragonhack24-BunchLunch/backend/api-docker/api/dal"
)

type GlovoHandler struct {
	// DAL is the Data Access Layer
	dal *dal.DAL
}

func NewGlovoHandler(dalConfig dal.DALConfig, logger zerolog.Logger) *GlovoHandler {
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

	return &GlovoHandler{
		dal: dalInstance,
	}
}

// Healthz is a handler for the Instagram API health check
func (h *GlovoHandler) Healthz(c *fiber.Ctx) error {
	log.Info().Msg("Checking mock API health...")
	return c.JSON(fiber.Map{"status": "ok"})
}
