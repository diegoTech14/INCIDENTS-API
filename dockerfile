FROM node:20

WORKDIR /app

COPY package*.json ./

COPY prisma ./prisma/

RUN npm install --include=dev

COPY . .

RUN npx prisma generate

EXPOSE 3000 

CMD ["npm", "run", "dev"]