# queuehaven
A Board Game Night Queue Manager

# Intro
Demonstrates knowledge of:
- React
- Spring Boot

# Setup Guide
- Install [Docker Toolbox](https://github.com/docker/toolbox/releases) (or Docker Desktop if your OS supports it).
  - Run Docker Toolbox and take note of the IP Address printed near the top of the terminal.
- In Docker Toolbox, run the following commands to start a MongoDB image:
  - ```docker run --name queuehaven-mongo -p 27017:27017 -d mongo:latest```
  - ```docker start queuehaven-mongo```
- In queuehaven-api, copy ```src/main/resources/application-template.yml``` into ```src/main/resources/application.yml```.
  - Generate a secret password for your JWT config, paste it instead of ```<my-secret>```.
  - Make up a service account username and password, paste it instead of ```<service-username>``` and ```<service-password>```.
    - This is a "virtual" user and should not exist in the MongoDB ```users``` collection.
  - Replace the MongoDB host with the IP Address from Docker Toolbox and remove the ```<db-account>``` and ```<db-password>``` properties.
- In queuehaven-ui, copy ```.env-template``` into ```.env```.
  - Copy the service-username from queuehaven-api as the value for ```REACT_APP_SERVICE_USERNAME```.
  - Copy the service-password from queuehaven-api as the value for ```REACT_APP_SERVICE_PASSWORD```.
  - Put the URL / port that you will be running queuehaven-api on as the value for ```REACT_APP_API_BASE_URL``` (for example, ```http://localhost:8080```.
  - Put the authorization API endpoint as the value for ```REACT_APP_API_AUTH_ENDPOINT``` (```/auth/``` by default).
