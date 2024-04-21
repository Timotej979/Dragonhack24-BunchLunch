package dal_test

import (
	"context"
	"flag"
	"fmt"
	"os"
	"strconv"
	"testing"
	"time"

	"github.com/rs/zerolog"
	"github.com/stretchr/testify/assert"
	"github.com/testcontainers/testcontainers-go"
	"github.com/testcontainers/testcontainers-go/wait"

	"github.com/Timotej979/Dragonhack24-BunchLunch/backend/api-docker/api/dal/postgres"
)

var disableRyuk string

func init() {
	flag.StringVar(&disableRyuk, "disable-ryuk", "", "Description of custom flag")
}

func TestMigrationAndCRUD(t *testing.T) {
	// Parse the command line flags
	flag.Parse()

	// Check if tests are running in verbose mode
	verbose := testing.Verbose()
	if verbose {
		// Check if the -disable-ryuk flag was set
		if disableRyuk != "y" {
			// Display a message and wait for rerun of the -v command with 'y' to continue
			fmt.Print("\n!!!!!!!!!!!!!! WARNING !!!!!!!!!!!!!!\n" +
				"!!! Running tests in verbose mode !!!\n" +
				"!!!-------------------------------!!!\n" +
				"!!  This means that testcontainer !!!\n" +
				"!!  module garbage collection will !!\n" +
				"!!  be disabled and DB containers  !!\n" +
				"!!  will keep on running until you !!\n" +
				"!!  remove them manually.          !!\n" +
				"!!!-------------------------------!!!\n" +
				"!!! To disable this message and   !!!\n" +
				"!!! disable garbage collection,   !!!\n" +
				"!!! please rerun the tests with   !!!\n" +
				"!!! the following command:        !!!\n" +
				"!!!-------------------------------!!!\n" +
				"!!! go test -v -disable-ryuk=y    !!!\n" +
				"!!!-------------------------------!!!\n\n")

			// Set environment variable to disable Ryuk otherwise
			t.Skip("Skipping tests in verbose mode")
		}

		// Set environment variable to disable Ryuk
		t.Setenv("TESTCONTAINERS_RYUK_DISABLED", "true")
	}

	// Run tests for PostgreSQL
	t.Run("PostgreSQL", func(t *testing.T) {
		testMigrationAndCRUD(t, "postgres")
	})
}

// Helper function to perform migration and CRUD operations for a specific database type
func testMigrationAndCRUD(t *testing.T, dbType string) {
	ctx := context.Background()

	// Create test container based on database type
	var container testcontainers.Container
	var port string

	switch dbType {
	case "postgres":
		container, port = createPostgresContainer(ctx)
	default:
		t.Fatalf("Unsupported database type: %s", dbType)
	}
	defer container.Terminate(ctx)

	// Get the host of the container
	host, err := container.Host(ctx)
	if err != nil {
		t.Fatal(err)
	}

	// Get the port of the container
	portInt, err := strconv.Atoi(port)
	if err != nil {
		t.Fatal(err)
	}

	// Create a new instance of the PostgreSQL Driver
	logger := zerolog.New(os.Stderr)
	driver := postgres.NewPostgresDriver(host, portInt, "testuser", "testpassword", "testdb", logger)

	// Connect to the database
	err = driver.Connect()
	if err != nil {
		t.Fatal(err)
	}
	defer driver.Close()

	// Perform migration
	err = driver.Migrate()
	assert.NoError(t, err)

	// Perform CRUD operations
	// Test create operation
	name := "testName"
	latitude := 123.45
	longitude := 67.89
	price := 3.5
	rating := 4.5

	err = driver.InsertRestaurantData(name, latitude, longitude, price, rating)
	assert.NoError(t, err)

	// Test get operation
	_, _, err = driver.GetRestaurantData(name)
	assert.NoError(t, err)

	// Test delete operation
	err = driver.DeleteRestaurantData(name)
	assert.NoError(t, err)

	// Verify deletion
	_, _, err = driver.GetRestaurantData(name)
	assert.Error(t, err)
}

// Helper function to create a PostgreSQL container
func createPostgresContainer(ctx context.Context) (testcontainers.Container, string) {
	req := testcontainers.ContainerRequest{
		Image:        "postgres:alpine",
		ExposedPorts: []string{"5432"},
		Env: map[string]string{
			"POSTGRES_USER":     "testuser",
			"POSTGRES_PASSWORD": "testpassword",
			"POSTGRES_DB":       "testdb",
		},
		WaitingFor: wait.ForAll(
			wait.ForLog("database system is ready to accept connections"),
			wait.ForListeningPort("5432"),
			wait.ForExec([]string{"pg_isready", "-U", "testuser", "-d", "testdb"}),
		).WithDeadline(time.Minute * 2),
		AlwaysPullImage: true,
	}
	container, err := testcontainers.GenericContainer(ctx, testcontainers.GenericContainerRequest{
		ContainerRequest: req,
		Started:          true,
	})
	if err != nil {
		panic(err)
	}

	port, err := container.MappedPort(ctx, "5432")
	if err != nil {
		panic(err)
	}

	return container, port.Port()
}
