FROM node:16.20.0 AS client
ARG BUILD_MODE

WORKDIR /build/client
COPY ./client/package.json /build/client/
COPY ./client/package-lock.json /build/client/

RUN npm ci --silent

COPY ./client /build/client

RUN npm run build

FROM node:16.20.0 AS server

WORKDIR /build/server

COPY ./server /build/server/

RUN npm ci --silent && npm run build

FROM node:16.20-slim

COPY --from=client /build/client/build /app/client/build

COPY --from=server /build/server/dist /app/server/dist
COPY --from=server /build/server/node_modules/ /app/server/node_modules

WORKDIR /app

CMD node server/dist/main.js

