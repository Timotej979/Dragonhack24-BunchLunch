package woltRoutes

import (
	"github.com/rs/zerolog"

	"github.com/gofiber/fiber/v2"

	"github.com/Timotej979/Dragonhack24-BunchLunch/backend/api/dal"
	woltHandler "github.com/Timotej979/Dragonhack24-BunchLunch/backend/api/internals/handlers/wolt"
)

// SetupRoutes sets up the routes for the wolt and glovo APIs
func SetupWoltRoutes(router fiber.Router, dalConfig dal.DALConfig, defaultLogger zerolog.Logger) {
	// Create handlers
	wolt := router.Group("/wolt")

	// Initialize the handlers
	woltHandlerInstance := woltHandler.NewWoltHandler(dalConfig, defaultLogger)

	// Health check of APIs
	wolt.Get("/healthz", woltHandlerInstance.Healthz)

}
