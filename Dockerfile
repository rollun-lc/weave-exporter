FROM node:14

WORKDIR /root/app

COPY . .

RUN npm install
CMD ["node", "index.js"]
