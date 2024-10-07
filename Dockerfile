FROM node:alpine3.19

WORKDIR /app

COPY package.json yarn.lock ./

# Install dependencies using yarn
RUN yarn install

# Install global npm package
RUN yarn global add next@14.2.4

# Add additional npm packages
CMD yarn add @radix-ui/themes@3.1.3
CMD yarn add @radix-ui/react-icons@1.3.0
CMD yarn add fs@0.0.1-security
CMD yarn add next-auth@4.24.8

COPY . .

#Add git command
RUN apk update && apk add --no-cache git
RUN apk add sudo
