FROM node:18.16.1-alpine
WORKDIR /app

RUN npm install -g pnpm
RUN npm install -g dotenv-cli

COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm install

# COPY prisma/schema.prisma .
# COPY prisma/seed.ts .
# COPY .env.development .
COPY . .

# RUN ls prisma/

RUN pnpm init-db:docker

# RUN dotenv -e .env.development -- npx prisma db seed

EXPOSE 3001