# MovieAPI

Simple Movie API using NestJS

Steps:
1- nest new movie-api with npm
2- build project structure - moudlar - application containing the use cases - domain containing the domain objects and logic - infra: containing both http (controllers) and data-access (entities, repositories implementation)
3- added online movies provider, used explicit injection instead of injection by interface to respect hexagonal architecture reference: https://github.com/fmcarrero/nest-js-products-api
4- fix movies domain functionality
5- added repository (no DB access yet)
6- link the above together orchastrated in the use case

7- implement authentication module (following nestjs official documentation)
8- add local and jwt guards
9- guard create movie APi by JWT token

10- create entities and install typeORM packages
11- create docker files for postgres
12- create database from typeORM to postgres docker

Decisions:
NestJS
Monolith
DDD tactical patterns
Hexagonal as possible
