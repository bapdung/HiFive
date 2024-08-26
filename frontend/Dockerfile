# Build stage
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . .
CMD ["npm", "start"]
EXPOSE 3000
