FROM node:18-alpine

RUN rm -rf node_modules

WORKDIR /app

COPY . .

RUN node -v

RUN npm install

RUN node ace migration:run

EXPOSE 3336


CMD ["node", "ace", "serve", "--watch"]