package dal

import (
	"fmt"
	"time"

	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"

	"github.com/Timotej979/Dragonhack24-BunchLunch/backend/api-docker/api/dal/postgres"
)

// DALConfig represents the configuration for the Data Access Layer
type DALConfig struct {
	DbType   string
	DbHost   string
	DbPort   int
	DbUser   string
	DbPass   string
	DbName   string
	DbLogger zerolog.Logger
}

type DatabaseDriver interface {
	Connect() error
	Close() error
	Migrate() error
	InsertRestaurantData(name string, lattiude float64, longitude float64, price float64, rating float64) error
	GetRestaurantData(name string) (string, time.Time, error)
	DeleteRestaurantData(name string) error
}

// DAL is the Data Access Layer
type DAL struct {
	// Configuration
	DbConfig *DALConfig

	// Database driver interface
	DbDriver DatabaseDriver
}

// NewDAL creates a new instance of the Data Access Layer
func NewDAL(config *DALConfig) (*DAL, error) {
	// Create the Data Access Layer
	dal := &DAL{
		DbConfig: config,
	}

	// Create the database driver
	switch config.DbType {
	case "postgres":
		dal.DbDriver = postgres.NewPostgresDriver(config.DbHost, config.DbPort, config.DbUser, config.DbPass, config.DbName, config.DbLogger)
	default:
		err := fmt.Errorf("invalid database type: %s", config.DbType)
		log.Error().Err(err).Msg("failed to create DAL")
		return nil, err
	}

	return dal, nil
}
