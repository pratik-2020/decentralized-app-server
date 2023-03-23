FROM node:alpine3.17

WORKDIR /server
COPY . /server
RUN npm install

CMD npm run serve