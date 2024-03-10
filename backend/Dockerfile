FROM node:18.16.1-alpine
WORKDIR /app

RUN npm install -g pnpm
RUN npm install -g dotenv-cli

COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm install

COPY . .

RUN pnpm init-db:docker

CMD [ "pnpm", "start:docker" ]

EXPOSE 3001