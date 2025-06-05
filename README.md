# brdo-edureg
Test project for BRDO - register of secondary education institutions.

## Installation
### In desired directory run:
    git clone https://github.com/keen-dot-dev/brdo-edureg.git
    cd brdo-edureg
    touch .env
### Add the following environment variables to the `.env` file and fill their values:
    MYSQL_DB=
    MYSQL_USER=
    MYSQL_PASSWORD=
    MYSQL_ROOT_PASSWORD=
### Run command:
    docker-compose --env-file .env up --build

## Ports:
* MySQL database - 3306
* Spring Boot RESTful API - 8080
* NGINX serving React UI - 3000
