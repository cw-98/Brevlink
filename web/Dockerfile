FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
ENV API_BASE_URL=$API_BASE_URL
CMD ["npm", "start"]
EXPOSE 5000
