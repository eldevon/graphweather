FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --no-audit

COPY tsconfig.json ./
COPY src/ ./src/

RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production --no-audit

COPY --from=builder /app/dist ./dist

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 -G nodejs

USER nodejs

ENV NODE_ENV=production

EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:4000', (r) => {if(r.statusCode !== 200) throw new Error()})" || exit 1

# Start the application
CMD ["npm", "start"]