FROM node:18-alpine

RUN rm -rf node_modules

WORKDIR /app

COPY . .

RUN npm install

# EXPOSE 3334

RUN node ace migration:run

CMD ["node", "ace", "serve", "--watch"]