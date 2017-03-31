FROM node:6

EXPOSE 3001

WORKDIR /bridge-gui

COPY . /bridge-gui

RUN npm install -g yarn && \
  yarn install --ignore-engines && \
  npm rebuild node-sass && \
  npm run build

CMD npm run start-dev
