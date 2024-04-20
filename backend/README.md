# Complete backend deployement

The backend is configured using the default setup of the Supabase running in docker-compose and a Golang API accessible through a NGINX reverse proxy.

# Docker-compose architecture

We have the following containers running on full deployment:
- **Supabase containers**
    - __supabase/storage-api__ ()
    - __supabase/postgres-meta__ ()
    - __supabase/studio__ ()
    - __kong__ ()
    - __supabase/gotrue__ ()
    - __supabase/realtime__ ()
    - __supabase/edge-runtime__ ()
    - __postgrest/postgrest__ ()
    - __supabase/logflare__ ()
    - __supabase/postgres__ ()
    - __timberio/vector__ ()
    - __darthsim/imgproxy__ ()

- **Golang API containers**
    - __bunchlunch-api__ ()
    - __bunchlunch-nginx__ ()

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