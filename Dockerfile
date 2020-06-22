# base image
FROM node:12.18.1-alpine

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json package-lock.json ./
RUN npm i

# add app
COPY . /app

# start app
CMD npm run start -- --host 0.0.0.0
