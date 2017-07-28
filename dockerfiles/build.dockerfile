FROM node:6.10

VOLUME ./dist:/opt/bridge-gui-vue/dist

RUN mkdir /opt/bridge-gui-vue

COPY ./package.json /opt/bridge-gui-vue/package.json

WORKDIR /opt/bridge-gui-vue/

RUN npm install

COPY . /opt/bridge-gui-vue/

ARG NODE_ENV=NODE_ENV_ENV
ARG BILLING_URL=BILLING_URL_ENV
ARG BRIDGE_URL=BRIDGE_URL_ENV
ARG STRIPE_PUBLISHABLE_KEY=STRIPE_PUBLISHABLE_KEY_ENV

ENV NODE_ENV $NODE_ENV
ENV BILLING_URL $BILLING_URL
ENV BRIDGE_URL $BRIDGE_URL
ENV STRIPE_PUBLISHABLE_KEY $STRIPE_PUBLISHABLE_KEY

CMD ["npm", "run", "build"]
