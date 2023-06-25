FROM node:18.16.1-alpine
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
CMD ["npm", "run", "dev"]
EXPOSE 3000