# bridge-gui-vue

> A web-based GUI for Storj Bridge

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:3001
npm run dev

# build for production with minification
npm run build

```
## Service Dependencies

Bridge-gui uses [billing](https://github.com/Storj/billing) and [bridge](https://github.com/Storj/bridge).

`git clone` each of those repos.

To start `billing`, run `npm run start-dev`

To start `bridge`, run `NODE_ENV=develop storj-bridge`
