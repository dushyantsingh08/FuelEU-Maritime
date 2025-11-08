FROM node:20-alpine AS base
WORKDIR /app

COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN npm ci --ignore-scripts || npm install --ignore-scripts

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]

