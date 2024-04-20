package router

import (
	"github.com/rs/zerolog"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/swagger"

	"github.com/Timotej979/Dragonhack24-BunchLunch/backend/api-docker/api/dal"
	glovoRoutes "github.com/Timotej979/Dragonhack24-BunchLunch/backend/api-docker/api/internals/routes/glovo"
	woltRoutes "github.com/Timotej979/Dragonhack24-BunchLunch/backend/api-docker/api/internals/routes/wolt"
)

func SetupRouter(app *fiber.App, dalConfig dal.DALConfig, defaultLogger zerolog.Logger, googleKey string) {

	app.Get("/swagger/*", swagger.HandlerDefault)

	api := app.Group("/bunchlunch-api/v1", logger.New())

	woltRoutes.SetupRoutes(api, dalConfig, defaultLogger, googleKey)
	glovoRoutes.SetupRoutes(api, dalConfig, defaultLogger)
}
