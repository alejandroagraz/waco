# Waco api-rest

## Features

## Characteristic
* User login
* JWT storage in NestJs
* Generate data for DB in Faker
* All environments are built with docker and docker-compose

## Production environment
* [Production environment](http://localhost:3000/auths/login)

## Testing environment
* [Testing environment](http://localhost:3000/auths/login)

## Starting 🚀

*  These instructions will allow you to obtain a copy of the running project on your local machine for development and testing purposes.

* Look [Waco]() to know the project.

## Usage

#### Directory Structure
```diff

+ ┌── waco
+ |  ├── mongo
+ |  ├── projects
+ |  | └─ backend-jelou
+ |  ├── docker-compose.debug
+ |  ├── docker-compose.yml
+ |  ├── README.md
+ └──└── env-example

```

## Prerequisites for installation with docker-compose ⚙️

#### Docker Engine

##### Docker Installation On Linux
* [Docker For Linux](https://docs.docker.com/install/linux/docker-ce/ubuntu/)

##### Docker Installation On Windows
* [Docker For Windows](https://docs.docker.com/docker-for-windows/install/)

#### Docker Compose

##### Docker Compose Installation
* [Docker Compose](https://docs.docker.com/compose/install/)

#### Enabling Non-root Users to Run Docker Commands (Optional)
```diff
sudo groupadd docker
sudo gpasswd -a $USER docker
newgrp docker

+ In the case of a virtual machine, it may be necessary to restart the virtual machine for the changes to take effect.

```

## Initialize (In the main directory run this /workspace)

```diff

+ Rename the file found in the root directory ./ example-env to .env

+ Go to directory the projects/backend-waco directory and rename the file example-env to .env
    
+ Go to directory the /workspace and run the following commands from terminal
    docker-compose up -d
    
+ If during the compilation (docker-compose up -d) there is an error example: 
        ERROR: for server-yape-develop  UnixHTTPConnectionPool(host='localhost', port=None): Read timed out. (read timeout=60))
            Please execute the following commands from the terminal:
                export DOCKER_CLIENT_TIMEOUT=220
                export COMPOSE_HTTP_TIMEOUT=220
    
+ When completing the previous steps we are ready to go to the browser to start using our application go to browser to url http://localhost:3000/auths/login
    User: jagraz29
    Password: Passw*123
```

## Prerequisites for installation conventional ⚙️

```diff

+ Go to directory the projects directory and rename the file example-env to .env
    
+ Run the following commands from 
    
    1. Go to directory the /projects/backend-waco
  
       1. Rename the file example-env to .env

       2. Run the following commands from terminal:
       
          1. Install the dependencies:
              yarn install
        
          2. Generate the certificates to sign the tokens, enter the `src/auth/certs` folder once inside, execute the following command:
              openssl genrsa -out jwt-private.key 2048 && openssl rsa -in jwt-private.key -pubout -out jwt-public.key
    
          3. Compile the application:
              yarn build
          
          4. Run the application:
              yarn run start:dev
    
+ When completing the previous steps we are ready to go to the browser to start using our application go to browser to url http://localhost:3000/auths/login
    User: jagraz29
    Password: Passw*123
```

## Additional information 📖

#### Crear host
```diff

+ Edit your operating system's hosts file, adding the container's IP address example hostnames:
    172.18.0.4:3000 m.waco.xyz

+ In the case of Linux operating system the hosts file is located in the etc directory (/etc/hosts).

```

#### Docker Images
```diff

+ View images
    docker images

+ Remove an image
    docker rmi (imageId o el imageName)

+ Remove all images
    docker rmi $(docker ps -a -q)

```

#### Docker Containers
```diff

+ View containers running
    docker ps

+ View containers stopped and running
    docker docker ps -a

+ Enter a container
    docker exec -ti (containerName o el ContainerId) /bin/sh

+ Stop a container
    docker stop (containerName o el ContainerId)

+ Remove a container
    docker rm (containerName o el ContainerId)

+ Start all containers
    docker start $(docker ps -a -q)

+ Stop all containers
    docker stop $(docker ps -a -q)

+ Turn off all containers
    docker-compose down

+ Remove all containers
    docker rm $(docker ps -a -q)

```

## Built With 🛠️
```diff
+    NestJs
+    Faker
+    TypeOrm
+    Moment
+    Mongo
+    Docker
+    Docker Compose
+    Swagger
```

## Developed Container ✒️
```diff

+    Developed by: Jose Agraz 
+    Email: joseagraz29@gamil.com
```
