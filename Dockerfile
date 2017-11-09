FROM node:8.9-slim

COPY . /opt/app

WORKDIR /opt/app

RUN npm install

EXPOSE 3000 8080

CMD ["npm run start:docker"]
