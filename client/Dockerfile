FROM node:16-alpine

WORKDIR /app/client/

COPY package*.json /app/client/

RUN npm install

COPY . /app/client/

# RUN chown root -R /app/client/

EXPOSE 3000

CMD ["npm", "run", "dev"]