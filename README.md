# deno-grpc-bug

This repo has been created so a reproducible test case for [this](https://github.com/denoland/deno/issues/24305#issuecomment-2185497723) Deno gRPC issue.

To make this as simple as possible, I've modified one of the examples from [grpc-node](https://github.com/grpc/grpc-node).

Here are the steps...

- Ensure you have the latest and greatest Deno installed (currently 1.44.4).
- Ensure you have NodeJS installed.
- Run `npm install`.
- Run `npm run server`. This will start the server using NodeJS.
- run `npm run client`. This will start the client using Deno.

The client should run forever printing out responses. Instead it'll only run for under a minute because of this issue.

FYI. I'm running all of this on my Macbook Pro (M2).