# FROM node:18.16.1-alpine
# WORKDIR /app

# RUN npm install -g pnpm

# COPY package.json .
# COPY pnpm-lock.yaml .

# RUN npm install

# COPY . .

# EXPOSE 3000

FROM node:18-alpine AS base
RUN npm install -g pnpm

# Install dependencies only when needed
FROM base AS deps

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json pnpm-lock.yaml* ./

RUN pnpm i --frozen-lockfile

FROM base AS dev

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Rebuild the source code only when needed
# FROM base AS builder
# WORKDIR /app
# RUN npm install -g pnpm
# COPY --from=deps /app/node_modules ./node_modules
# COPY . .

# ENV NEXT_TELEMETRY_DISABLED 1

# RUN pnpm build

# If using npm comment out above and use below instead
# RUN npm run build

# Production image, copy all the files and run next
# FROM base AS runner
# WORKDIR /app

# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

# COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
# RUN mkdir .next
# RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# USER nextjs

EXPOSE 3000
# CMD ["pnpm", "dev"]