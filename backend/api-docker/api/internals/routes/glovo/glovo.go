package glovoRoutes

import (
	"github.com/rs/zerolog"

	"github.com/gofiber/fiber/v2"

	"github.com/Timotej979/Dragonhack24-BunchLunch/backend/api-docker/api/dal"
	glovoHandler "github.com/Timotej979/Dragonhack24-BunchLunch/backend/api-docker/api/internals/handlers/glovo"
)

// SetupRoutes sets up the routes for the glovo and glovo APIs
func SetupGlovoRoutes(router fiber.Router, dalConfig dal.DALConfig, defaultLogger zerolog.Logger) {
	// Create handlers
	glovo := router.Group("/glovo")

	// Initialize the handlers
	glovoHandlerInstance := glovoHandler.NewGlovoHandler(dalConfig, defaultLogger)

	// Health check of APIs
	glovo.Get("/healthz", glovoHandlerInstance.Healthz)

}
