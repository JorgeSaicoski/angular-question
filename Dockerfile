# base image
FROM node:14-alpine

# create app directory
WORKDIR /app

# install Angular CLI globally
RUN npm install -g @angular/cli

# install app dependencies
COPY package*.json ./
RUN npm install

# copy app files
COPY . .

# expose port for the app
EXPOSE 4200

# start the app
CMD [ "ng", "serve" ]
