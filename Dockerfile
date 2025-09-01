FROM node:20
WORKDIR /app
COPY Backend/package*.json ./
RUN npm install --production
COPY Backend .
EXPOSE 3000
CMD ["node", "index.js"]

