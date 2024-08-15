FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN ls -la /usr/src/app/
RUN npx prisma generate --schema=./prisma/schema.prisma

EXPOSE 5000

CMD [ "node", "index.js" ]