import { app } from './apps/eshop.mjs'
import * as esbuild from 'esbuild'

/*
React Without a Framework

Maximize flexibility in adopting React into existing web applications.

First time installation steps for the project (npm init has been made):
    npm i

To run the project: 
    npm run start

Go to eShop:
    http://127.0.0.1:4000/
*/

const esbuildCtx = await esbuild.context({
    entryPoints: ['apps/src/eshop/main.tsx'],
    bundle: true,
    logLevel: 'info',
    minify: false,
    outfile: 'apps/dist/eshop/bundle.js',
    color: true,
    globalName: 'react',
})

await esbuildCtx.serve({ port: 4001 })
await esbuildCtx.watch()

app.listen(4000, () => {
    console.log(`Server listening at http://localhost:${4000}`);
});