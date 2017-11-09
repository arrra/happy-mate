FROM node:8.9-slim

COPY . /opt/app

WORKDIR /opt/app

RUN cd /opt/app && \
    rm -rf node_modules && \
    npm install

EXPOSE 3000 8080

CMD ["npm run start:docker"]
