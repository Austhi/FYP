FROM node:18-alpine

RUN rm -rf node_modules

WORKDIR /app

COPY . .

RUN npm install

# EXPOSE 3333

CMD ["node", "ace", "serve", "--watch"]