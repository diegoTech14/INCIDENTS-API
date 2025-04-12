FROM node:18

WORKDIR /app

COPY package*.json ./

COPY prisma ./prisma/

RUN npm install --include=dev

COPY . .

RUN npx prisma generate

EXPOSE 3000 

CMD ["sh", "-c", "npm run db:dev && npm run dev"]