# ePatra

### Steps to run the project with docker
1. Clone the github repository
2. `cd ePatra`
3. `cp .env.example .env`
4. `docker compose build`
5. `docker compose up`

> This should spin up the server at SERVER_PORT and frontend at FRONTEND_EXPOSE_PORT defined in the .env file

## Apply migrations
- Run command `docker compose exec server python manage.py migrate`

## Run Your Frontend
- Run command `npm run dev`

## Get all the news viewed
- Features
    - Markdown Content placed inside
    - Epatra Points for daily viewers