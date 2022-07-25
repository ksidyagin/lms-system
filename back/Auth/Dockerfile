FROM node:latest

WORKDIR /backend/auth

COPY package.json package-lock.json ./

RUN npm i

COPY . .

CMD ["npm", "start"]