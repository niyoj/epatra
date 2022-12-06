FROM node:16

WORKDIR /frontend

COPY package*.json /frontend/

RUN npm install 

COPY . /frontend/

RUN chown -R node:node /frontend/node_modules

CMD [ "npm", "start" ]