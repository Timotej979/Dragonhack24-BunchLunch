# Complete backend deployement

The backend is configured using the default setup of the Supabase running in docker-compose and a Golang API accessible through a NGINX reverse proxy. The deploys are available in respective folders:
- **api-docker** (Golang API docker-compose deploy)
- **supabase-docker** (Supabase docker-compose deploy)
- **supabase-k8s** (Supabase k8s deploy: NOT COMPLETE, Postgres replication (Srtackgres) done, Supabase helm chart not yet fixed)

# Docker-compose architecture

We have the following containers running on full deployment:
- **Supabase containers**
    - __supabase/storage-api__ (A RESTful interface for managing Files stored in S3, using Postgres to manage permissions)
    - __supabase/postgres-meta__ (A RESTful API for managing your Postgres, allowing you to fetch tables, add roles, and run queries, etc)
    - __supabase/studio__ (Online code editor )
    - __kong__ (A cloud-native API gateway)
    - __supabase/gotrue__ (A JWT based API for managing users and issuing JWT tokens)
    - __supabase/realtime__ (An Elixir server that allows you to listen to PostgreSQL inserts, updates, and deletes using websockets. Realtime polls Postgres' built-in replication functionality for database changes, converts changes to JSON, then broadcasts the JSON over websockets to authorized clients)
    - __supabase/edge-runtime__ (Edge runtime functions, enabling direct exposure of Typescript webpages)
    - __postgrest/postgrest__ (Web server that turns your PostgreSQL database directly into a RESTful API)
    - __supabase/logflare__ (Analytics using logflare if needed)
    - __supabase/postgres__ (An object-relational database system with over 30 years of active development that has earned it a strong reputation for reliability, feature robustness, and performance)
    - __timberio/vector__ (Vector databse)
    - __darthsim/imgproxy__ (Image proxy)

- **Golang API containers**
    - __bunchlunch-api__ (Golang API implementing the BunchLunch API service)
    - __bunchlunch-nginx__ (NGINX reverse proxy protecting the Golnag API)

# Supabase endpoints

Check the documentation regarding which different endpoints are available: https://supabase.com/docs/guides/self-hosting/docker

# Golang API endpoints

The Golang API is running on the following endpoint: http://localhost:7000/bunchlunch-api/v1 with the following sub-paths:
- **/wolt**
- **/glovo**

Both of the sub-paths have the **/healthz** path to check the health of each route group and its handler.

Currently there is only one endpoints with actual data available for the using Wolt API scraping and Google Places API **http://localhost:7000/bunchlunch-api/v1/wolt/restaurants** which accepts two JSON type data fields:
```json
{
    "lat": 46.01234,
    "lon": 14.23145
}
```

You can test the API out using the following curl reqest:
```bash
curl --request GET --header "Content-Type: application/json" --data '{"lat": 46.049900, "lon": 14.468559}' http://127.0.0.1:7000/bunchlunch-api/v1/wolt/restaurants
```