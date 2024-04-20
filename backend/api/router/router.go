package router

import (
	"github.com/rs/zerolog"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/swagger"

	"github.com/Timotej979/Dragonhack24-BunchLunch/api/dal"
	woltRoutes "github.com/Timotej979/Dragonhack24-BunchLunch/api/internals/routes/wolt"
	glovoRoutes "github.com/Timotej979/Dragonhack24-BunchLunch/api/internals/routes/glovo"
)

func SetupRouter(app *fiber.App, dalConfig dal.DALConfig, defaultLogger zerolog.Logger) {

	app.Get("/swagger/*", swagger.HandlerDefault)

	api := app.Group("/bunchlunch-api/v1", logger.New())

	woltRoutes.SetupRoutes(api, dalConfig, defaultLogger)
	glovoRoutes.SetupRoutes(api, dalConfig, defaultLogger)
}
