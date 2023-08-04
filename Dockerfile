FROM node:12
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 4200
CMD ["npm", "start"]

