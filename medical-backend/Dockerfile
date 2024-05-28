FROM node:20-alpine

RUN rm -rf node_modules

WORKDIR /app

COPY . .

RUN npm install

# EXPOSE 3333

RUN mkdir -p tmp/

RUN node ace migration:run

CMD ["node", "ace", "serve", "--watch"]