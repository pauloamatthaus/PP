FROM node:10.15.1-alpine

#Create app directory
RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY package*.json ./

RUN yarn

COPY . .

CMD ["yarn", "start"]
