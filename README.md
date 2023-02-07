<h1>Simple Movie API using NestJS</h1>

<h2>To Run:</h2>
<h4>move into movie-api folder <pre>cd movie-api</pre> and <pre>docker compose up</pre> and wait (it will take some time to run the db migrations)</h4>
<h4>Enjoy!</h4>
<h3>Useful commands:</h3>
<ul>
    <li>
        <pre>npm run start:dev</pre> to start the project with hot reload
    </li>
    <li>
        <pre>npm run typeorm:run-migrations</pre> to run needed migrations
    </li>
    <li>
        <pre>npm run typeorm:generate-migration</pre> to create a migration after a change in the entities
    </li>
</ul>
<h2>What could've been added?</h2>
<ul>
    <li>Better Error Handling</li>
    <li>More granular e2es</li>
    <li>Customised authentication guards</li>
</ul>

<h2>Technology stack</h2>
<ul>
    <li>NestJS</li>
    <li>Docker</li>
    <li>Postgres</li>
    <li>TyperORM</li>
</ul>

<h2>Main Design and Functional Features</h2>
<ul>
    <li>Architecture Design: SOLID, DDD, Hexagonal</li>
    <li>Everything is Dockerised</li>
    <li>Authentication: JWT, generated through ('auth/login')</li>
    <li>APIs
        <ul>
            <li>GET ('/movies'): returns list of the authenticates user's movies</li>
            <li>POST('/movies'): using a provided title fetches a movie from omdAPI and saves it's data</li>
        </ul>
    </li>
    <li>Security: Authentication guards, password hashing using bcrypt</li>
    <li>Seperate .env files for docker and local</li>
    <li>...</li>
</ul>

<h2>How it was developed</h2>
<p>
    The process tried to adhere as much as possible to:
    - SOLID (especially Seperation of concerns and IoC),
    - hexagonal architecture (dependencies are outwards)
    - DDD maintaining a clean domain layer where the business rules are inforced and an in the application layer used
    use cases instead of services and seperated the persistance logic from the business logic
<p>
    The source code contains:
<ul>
    <li>main files containing docker files, cofigurations and .env</li>
    <li>under src</li>
    <ul>
        <li><b>external providers:</b> implementation of wrapper around omdAPI (since we have IoC the module will use
            the interface and not the actual implementation)</li>
        <li><b>healthcheck:</b> the hello world APIs generated by nest</li>
        <li><b>modules:</b></li>
        <ul>
            <li><b>userauths:</b> (the authentication stuff, does not strictly follow DDD as there is no need)
                <ul>
                    <li>application: the local and JWT strategies (the implementations needed to validate credentials,
                        generate
                        tokens andvalidate them; followed nestjs official documentation)</li>
                    <li><b>domain: contains the entities used by the module</li>
                    <li><b>infra:</b>
                        <ul>
                            <li><b>http:</b> the auth controller containing the ('auth/login') api</li>
                            <li><b>data-access:</b> the user database entity the repository used to retrieve users</li>
                        </ul>
                    </li>
                    <li><b>mocks:</b> the classes used by ject</li>
                    <li>the module.ts which is linking it all together</li>
                    <li>
                </ul>
            </li>
            <li><b>movies:</b> (this is the core module of the application and does adhere to tactical patterns of DDD)
                <ul>
                    <li><b>application:</b> the orchetrator layer, is not persistance ignorant (as it connects with the
                        repository but do so using IoC)
                        <ul>
                            <li><b>providers:</b> the interfaces of the external providers that the module's application
                                needs to function, the implementation of which will be offered by the module.ts</li>
                            <li><b>the use cases</b> of the application, tahese are the main functionalities of the
                                module,
                                each complete of its own accord </li>
                            <li><b>the use cases' spec files to run unit tests</li>
                        </ul>
                    </li>
                    <li><b>domain:</b> the core entities of the movies module, responsible for ensuring business rules
                    </li>
                    <li><b>infra:</b> everything not part of the core business of the module is sent to the edge of the
                        hexagone!
                        <ul>
                            <li><b>http:</b> the movies controller containing the APIs
                                <ul>
                                    <li><b>dtos:</b> cotaining the objects that will be shared with teh outside world
                                    </li>
                                </ul>
                            </li>
                            <li><b>data-access:</b>
                                <ul>
                                    <li><b>repositories:</b> responsible for the data logic and returning the aggregate
                                        root</li>
                                    <li><b>entities:</b> the database entities (ORMs) that will be used to generate the
                                        database and
                                        access
                                        it</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li><b>mocks:</b> the classes used by jest</li>
                    <li>the module.ts which is linking it all together </li>
                </ul>
            </li>
        </ul>
        <li><b>tests:</b> contains the e2e tests used to validate this application</li>
    </ul>
</ul>
<h2>Steps(Gross-modo):</h2>
<ol>
    <li>Create project: nest new movie-api with npm</li>
    <li>Build modular project structure
        <ul>
            <li>application containing the use cases</li>
            <li>domain containing the domain objects and logic </li>
            <li>infra: containing both http (controllers) and data-access (entities, repositories implementation) </li>
        </ul>
    </li>
    <li> Added online movies provider, used explicit injection instead of injection by interface to respect hexagonal
        architecture</li>
    <li> Implemented movies domain functionality</li>
    <li> Added repository (no DB access yet)</li>
    <li> Link the above together orchastrated in the use case</li>
    <li> Implement authentication module (following nestjs official documentation)</li>
    <li> Add local and jwt guards</li>
    <li> Guard create movie APi by JWT token</li>
    <li> Create entities and install typeORM packages</li>
    <li> Create docker files for postgres </li>
    <li> Create database from TypeORM to postgres docker</li>
    <li> Save created movie in DB</li>
    <li> Get authenticated user from context</li>
    <li> Implement business logic (only 5 movies for basic users)</li>
    <li> Implement get movies API fully</li>
    <li> Implement unit tests for movies use cases</li>
    <li> dockerise nestjs</li>
</ol>
