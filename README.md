<h1>Simple Movie API using NestJS</h1>

<h2>To Run:</h2>
<div>
    <ul></ul>
    <li>docker compose up and wait (it will take some time to run the db migrations)</li>

    <li>
        <h4>Enjoy</h4>
    </li>

</div>
<h2>How it was developed</h2>
<p>
    The development tried to adhere as much as possible to SOLID (especially IoC), hexagonal architecture (dependencies
    are outwards) and DDD maintaining a clean domain and application latyer
<p>
<div>
    The source code contains:
    - main files containing docker files, cofigurations and .env
    - under src
    - external providers: implementation of wrapper around omdAPI (since we have IoC the module will use the interface and
        not the actual implementation)
    - healthcheck: the hello world APIs generated by nest
    - modules:
        - userauths: (the authentication stuff, does not strictly follow DDD as there is no need)
            - application: the local and JWT strategies (the implementations needed to validate credentials, generate tokens and
            validate them; followed nestjs official documentation)
            - domain: contains the entities used by the module
            - infra:
                - http: the auth controller containing the ('auth/login') api
                - data-access: the user database entity the repository used to retrieve users
            - the module.ts which is linking it all together
        - movies: (this is the core module of the application and does adhere to tactical patterns of DDD)
            - application: the orchetrator layer, is not persistance ignorant (as it connects with the repository but do so using IoC)
                - providers: the interfaces of the external providers that the module's application needs to function, the implementation of which will be offered by the module.ts
                - the use cases of the application, tahese are the main functionalities of the module, each complete in its own accord

    you can see the DDD and hexagonal architecture influences in the movies module

    Steps:

    1- nest new movie-api with npm
    2- build project structure - moudlar - application containing the use cases - domain containing the domain objects
    and logic - infra: containing both http (controllers) and data-access (entities, repositories implementation)
    3- added online movies provider, used explicit injection instead of injection by interface to respect hexagonal
    architecture reference: https://github.com/fmcarrero/nest-js-products-api
    4- fix movies domain functionality
    5- added repository (no DB access yet)
    6- link the above together orchastrated in the use case

    7- implement authentication module (following nestjs official documentation)
    8- add local and jwt guards
    9- guard create movie APi by JWT token

    10- create entities and install typeORM packages
    11- create docker files for postgres
    12- create database from typeORM to postgres docker

    13- save vreated movie in DB
    14- Get authenticated user from context
    15- implement business logic
    16- implement get movies

    17- implement unit tests for movies use cases

    18- dockerise nestjs

    Decisions:
    NestJS
    Monolith
    some DDD tactical patterns
    Hexagonal as possible

</div>
