FROM node:alpine3.19

WORKDIR /app

COPY package.json .

# Install npm package
RUN npm install -g next@14.2.4

RUN yarn add @radix-ui/themes
RUN yarn add @radix-ui/react-icons

COPY . .