# base image
FROM node:14-alpine

# create app directory
WORKDIR /app

# install Angular CLI globally
RUN npm install -g @angular/cli

RUN npm install @auth0/angular-jwt jwt-decode

# install app dependencies
COPY package*.json ./
RUN npm install

# copy app files
COPY . .

# expose port for the app
EXPOSE 4200

# start the app
CMD [ "ng", "serve" ]
