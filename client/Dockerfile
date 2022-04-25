FROM node:14.14.0-alpine
WORKDIR '/app'
COPY ./package.json ./
RUN npm install
WORKDIR '/app/public'
COPY ./package.json ./public
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "run", "dev" ]