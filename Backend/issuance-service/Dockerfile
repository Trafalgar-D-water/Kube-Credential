FROM node:20-alpine AS base

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production && cp -R node_modules /prod_node_modules

RUN npm ci
COPY tsconfig.json ./
COPY src ./src

RUN npm run build

FROM node:20-alpine
WORKDIR /app

ENV NODE_ENV=production

COPY --from=base /prod_node_modules ./node_modules
COPY package*.json ./
COPY --from=base /app/build ./dist


ENV PORT=8080
ENV PGSSLMODE=require

EXPOSE 8080
CMD ["node", "dist/index.js"]

