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
# Usamos la variable de entorno PORT que Railway asigna automáticamente
ARG PORT=3000
ENV PORT=${PORT}
COPY --from=frontend /app/frontend/dist /usr/share/nginx/html
# Configuramos Nginx para usar el puerto dinámico
RUN sed -i "s/listen 80;/listen ${PORT};/" /etc/nginx/conf.d/default.conf
EXPOSE ${PORT}
CMD ["nginx", "-g", "daemon off;"]
