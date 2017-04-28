# bridge-gui-vue

> A web-based GUI for Storj Bridge

## Local Development Setup

### Prerequisites

1. Nodemon
  - Installation: `npm install -g nodemon`

2. Mongodb

  - Installation: `brew update && brew install mongodb`

    - If you don't have Mac OSX, follow the [install instructions](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)

    - If you don't have Homebrew, [install it](https://brew.sh/)

    - As an easy way to manage Mongo and other databases, I recommend [Launch Rocket](https://github.com/jimbojsb/launchrocket). Install with `brew cask install launchrocket`. This will allow you to easily turn Mongo on and off and even have it start automatically.

    - Start Mongo with `mongod` in a new terminal window. If you don't use Launch Rocket, then you'll need to follow the [Mongo instructions](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/#run-mongodb) to start it

3. Redis

  - Installation: `brew update && brew install redis`

  - Just get Launch Rocket by now to start and manage all your databases

4. Node >= v.6.9.4

### Create `storj-dev` folder
> Optional: You don't need this folder, but it may help in organizing if you've got a lot going on

```sh
$ mkdir storj-dev
$ cd storj-dev
```

### Git clone all the repos

```sh
$ git clone https://github.com/Storj/bridge.git
$ git clone https://github.com/Storj/billing.git
$ git clone https://github.com/Storj/bridge-gui-vue.git
```

Open up two more terminal windows and navigate to the `storj-dev` folder

### Setup bridge

In the first one, navigate to `storj-dev/bridge`

```sh
$ npm install && npm link
$ NODE_ENV=develop storj-bridge
```

If it's running correctly, you should see output like this:

```sh
{"level":"info","message":"starting the bridge engine","timestamp":"2017-04-28T20:47:51.665Z"}
{"level":"info","message":"opening database connection to mongodb://127.0.0.1:27017/__storj-bridge-develop","timestamp":"2017-04-28T20:47:51.666Z"}
{"level":"info","message":"configuring service endpoints","timestamp":"2017-04-28T20:47:51.688Z"}
{"level":"info","message":"setting up http(s) server instance","timestamp":"2017-04-28T20:47:51.701Z"}
{"level":"info","message":"connected to database","timestamp":"2017-04-28T20:47:51.718Z"}
```

### Setup billing

In another terminal window, navigate to `storj-dev/billing`

```sh
$ npm install
$ STRIPE_TEST_KEY=your_stripe_test_key npm run start-dev
```

If it's running correctly, you should see output like this:

```sh
> storj-billing@0.2.0 start-dev /Users/barbara/Documents/Code/storj-dev/billing
> NODE_ENV=develop nodemon ./bin/storj-billing.js

[nodemon] 1.11.0
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node ./bin/storj-billing.js`
**** server listening on  3000
{"level":"info","message":"starting the billing engine","timestamp":"2017-04-28T20:51:26.215Z"}
{"level":"info","message":"opening database connection","timestamp":"2017-04-28T20:51:26.216Z"}
{"level":"info","message":"configuring service endpoints","timestamp":"2017-04-28T20:51:26.238Z"}
{"level":"info","message":"setting up http(s) server instance","timestamp":"2017-04-28T20:51:26.308Z"}
{"level":"info","message":"connected to database","timestamp":"2017-04-28T20:51:26.325Z"}
```

### bridge-gui-vue

In the last terminal window, navigate to `storj-dev/bridge-gui-vue`

Create a `.env` file to hold app secrets

```sh
$ touch .env
```

Inside, you'll need to add this:

```
STRIPE_PUBLISHABLE_KEY=test_key
```

Then, you can start up everything

```sh
$ npm install
$ npm run dev
```

The initial load takes around ~17 secs, but every other load after that is ~0.5-2 seconds

If running correctly, you'll see output like this:

```bash
> bridge-gui-vue@1.0.0 dev /Users/barbara/Documents/Code/storj-vagrant/bridge-gui-vue
> node build/dev-server.js



 DONE  Compiled successfully in 16180ms                                                                                      4:27:05 PM

> Listening at http://localhost:3001
```

Open up `localhost:3001`. Now, upon making changes and saving the file, the app will hot reload and display those changes.
