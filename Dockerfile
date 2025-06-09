# Build frontend
FROM node:18-alpine as frontend-build
WORKDIR /app/frontend
COPY Frontend/package*.json ./
RUN npm install
COPY Frontend/ .
RUN npm run build

# Build backend
FROM node:18-alpine as backend-build
WORKDIR /app/backend
COPY Backend/package*.json ./
RUN npm install
COPY Backend/ .
RUN npm run build

# Production image
FROM node:18-alpine
WORKDIR /app

# Copy backend
COPY --from=backend-build /app/backend /app/backend
WORKDIR /app/backend
RUN npm install --production

# Copy frontend build
COPY --from=frontend-build /app/frontend/dist /app/backend/public

# Set environment variables
ENV NODE_ENV=production

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]