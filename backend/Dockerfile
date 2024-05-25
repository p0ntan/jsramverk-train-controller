# Build stage
FROM node:20-alpine3.18

WORKDIR /server

COPY ./ .

RUN npm ci --omit dev

EXPOSE 443

ENTRYPOINT [ "npm", "run", "start"]
