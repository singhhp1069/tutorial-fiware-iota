ARG  NODE_VERSION=10.17.0-slim
FROM node:${NODE_VERSION}

WORKDIR /app

COPY . /app

RUN npm install

#Expose the port
EXPOSE 8080

#Running the project
CMD [ "npm", "start"]