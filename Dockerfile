FROM node:8.4.0-alpine

ENV APP_DIR /home/node/app
WORKDIR $APP_DIR
RUN chown -R node:node $APP_DIR/

USER node

COPY package.json package-lock.json $APP_DIR/
RUN npm install

COPY . $APP_DIR/

USER root
RUN find . -type d \( -path ./node_modules \) -prune -o -exec chown node:node {} \;

USER node
