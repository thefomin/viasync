# FROM node:20-slim AS base

# FROM base AS builder
# WORKDIR /app
# COPY package.json package-lock.json ./
# RUN npm ci --legacy-peer-deps --frozen-lockfile
# COPY . .
# ENV NEXT_TELEMETRY_DISABLED=1
# ENV NOVE_ENV=production

# RUN npm run build


# FROM base AS production
# ENV NODE_ENV=production

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

# COPY --from=builder /app/public ./public
# COPY --from=builder /app/package.json /app/package-lock.json ./

# RUN mkdir .next
# RUN chown nextjs:nodejs .next

# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# USER nextjs

# EXPOSE 3000
# ENV PORT=3000

# ARG HOSTNAME 

# CMD ["node", "server.js"]


FROM node:20-slim AS base

WORKDIR /app

COPY package*.json ./

COPY .next .next

COPY .next .next
COPY public public
COPY next.config.js next.config.js

EXPOSE 3000

CMD ["npm", "start"]
