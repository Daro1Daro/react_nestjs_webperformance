FROM node:12-alpine as build
WORKDIR /app
COPY . /app/
RUN npm install --silent
RUN npm run build

FROM node:12-alpine
WORKDIR /app
COPY --from=build /app/dist /app/
COPY .env.production /app/.env.production
COPY package.json /app/package.json
RUN npm install --silent
RUN apk add --no-cache bash
