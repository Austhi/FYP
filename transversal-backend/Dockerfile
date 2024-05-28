FROM node:21-alpine

RUN rm -rf node_modules

WORKDIR /app

COPY . .

RUN npm install

# EXPOSE 3334

RUN mkdir -p tmp/

RUN node ace migration:run

CMD ["node", "ace", "serve", "--watch"]