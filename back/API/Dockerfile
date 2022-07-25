FROM node:latest

WORKDIR /backend/api

COPY package.json package-lock.json ./

RUN npm i

COPY . .

CMD ["npm", "start"]