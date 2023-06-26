FROM node:18.16.1-alpine
WORKDIR /app  
COPY package*.json ./
RUN npm i
COPY . .

RUN npx prisma migrate dev --name init

CMD ["npm", "run", "start"]
EXPOSE 3001