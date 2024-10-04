FROM node:alpine3.19

WORKDIR /app

COPY package.json .

# Install npm package
RUN npm install -g next@14.2.4

RUN yarn add @radix-ui/themes
RUN yarn add @radix-ui/react-icons
RUN yarn add @grpc/grpc-js
RUN yarn add @grpc/proto-loader
RUN yarn add grpc-web google-protobuf
RUN yarn add grpc-tools grpc_tools_node_protoc_ts
RUN yarn add fs
RUN yarn add next-auth



COPY . .