FROM node:18

WORKDIR /app

ENV MONGO_URL='mongodb+srv://nsripani:backend3@dbbackend3coder.wr9ah.mongodb.net/?retryWrites=true&w=majority&appName=DBBackend3Coder'

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
