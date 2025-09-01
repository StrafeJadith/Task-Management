# ====== BACKEND ======
FROM node:20 AS backend
WORKDIR /app/backend
COPY Backend/package*.json ./
RUN npm install --production
COPY Backend .
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "index.js"]

# ====== FRONTEND ======
FROM node:20 AS frontend
WORKDIR /app/frontend
COPY Frontend/package*.json ./
RUN npm install
COPY Frontend .
RUN npm run build

# ====== SERVIR FRONTEND ======
FROM nginx:alpine AS production
COPY --from=frontend /app/frontend/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
