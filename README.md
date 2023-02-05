# MovieAPI
Simple Movie API using NestJS

Steps:
1- nest new movie-api with npm
2- build project structure
    - moudlar
    - application containing the use cases
    - domain containing the domain objects and logic
    - infra: containing both http (controllers) and data-access (entities, repositories implementation)
3- added online movies provider, used explicit injection instead of injection by interface to respect hexagonal architecture reference: https://github.com/fmcarrero/nest-js-products-api

Decisions:
NestJS 
Monolith
DDD tactical patterns
Hexagonal as possible
