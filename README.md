# ■ Welcome to ASEticle
## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:49513](http://localhost:49513) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.



## Generate proto
```
pwd
/app #
yarn run grpc_tools_node_protoc --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts --js_out=import_style=commonjs,binary:./src/features/api/pkg --grpc_out=grpc_js:./src/features/api/pkg --ts_out=grpc_js:./src/features/api/pkg -I ./src/features/api/ ./src/features/api/service.proto
```