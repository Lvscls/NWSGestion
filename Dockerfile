FROM node:latest AS nws_app

WORKDIR /app
COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm","start"]