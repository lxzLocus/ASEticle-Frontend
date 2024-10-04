FROM node:alpine3.19

WORKDIR /app

COPY package.json .

# Install npm package
RUN npm install -g next@14.2.4

RUN yarn add @radix-ui/themes@3.1.3
RUN yarn add @radix-ui/react-icons@1.3.0
RUN yarn add fs@0.0.1-security
RUN yarn add next-auth@4.24.8

COPY . .

#Add git command
RUN apk update && apk add --no-cache git
RUN apk add sudo
