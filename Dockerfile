FROM node:16.20.0 AS client
ARG BUILD_MODE

WORKDIR /build/client
COPY ./client/package.json /build/client/
COPY ./client/package-lock.json /build/client/

RUN npm ci --silent

COPY ./client /build/client

RUN npm run build --build=${BUILD_MODE}

FROM node:16.20.0 AS server

WORKDIR /build/server

COPY ./server/package.json /build/server/
COPY ./server/package-lock.json /build/server/

RUN npm ci --silent --omit=dev

FROM node:16.20-slim

WORKDIR /app/server

COPY ./server /app/server

COPY --from=client /build/client/build /app/client/build
COPY --from=server /build/server/node_modules/ /app/server/node_modules

WORKDIR /app