FROM node:18-alpine

RUN rm -rf node_modules

WORKDIR /app

COPY . .

RUN npm install
RUN npm install dotenv

EXPOSE 3336

CMD ["node", "ace", "serve", "--watch"]