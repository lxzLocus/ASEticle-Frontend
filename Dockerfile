FROM node:alpine3.19

WORKDIR /app


#Add git command
RUN apk update && apk add --no-cache git
RUN apk add sudo
