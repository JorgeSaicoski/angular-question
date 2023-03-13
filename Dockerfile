# base image
FROM node:14.17.5 AS build

# set working directory
WORKDIR /app

# install dependencies
COPY package*.json ./
RUN npm install

# copy project files
COPY . .

# build project
RUN npm run build --prod

# final image
FROM nginx:1.21.3-alpine

# copy build artifacts from previous image
COPY --from=build /app/dist/angular-courses /usr/share/nginx/html

# copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf
