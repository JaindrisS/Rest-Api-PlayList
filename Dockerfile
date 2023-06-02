FROM node:16.20.0-alpine3.17
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --loglevel=error
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]