const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const sessionUuid = require('uuid/v4');
const helmet = require('helmet');
const config = require('./config');
const history = require('connect-history-api-fallback');
const storj = require('storj-lib');
const client = storj.BridgeClient(config.app.BRIDGE_URL);
const errors = require('storj-service-error-types');
// Allows use of .env file. Does not override already set env vars
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const sessionMiddleware = session({
  name: config.app.NAME,
  genid: () => sessionUuid(),
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 86400000
  },
  saveUninitialized: false,
  resave: false
});
/* Security Headers */
// app.use(function(req, res, next) {
//   res.set('X-Frame-Options', 'DENY');
//   next();
// });
// app.use(helmet());
// app.use(helmet.contentSecurityPolicy({
//   directives: {
//     defaultSrc: [ "'self'" ],
//     scriptSrc: [ "'self'", 'https://js.stripe.com', "'unsafe-eval'" ],
//     styleSrc: [ "'self'", "'unsafe-inline'", 'https://maxcdn.bootstrapcdn.com' ],
//     objectSrc: [ "'none'" ],
//     frameSrc: [ 'https://js.stripe.com', 'https://storj.github.io' ],
//     childSrc: [ 'https://js.stripe.com', 'https://storj.github.io' ],
//     imgSrc: [ "'self'", 'https://q.stripe.com' ]
//   }
// }));

/* Static App */
app.use(history());
app.use(express.static(__dirname + '/dist'));

console.log('bridge_URL', config.app.BRIDGE_URL, typeof(config.app.BRIDGE_URL));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sessionMiddleware);
/**
* Creates a new user with BridgeClient
* @param {http.IncomingMessage} req
* @param {http.ServerResponse} res
* @param {Function} next
*/
app.post('/api/user/create', function(req, res, next) {
  console.log('req', req.body);
  // Create User
  client.createUser({
    email: req.body.email,
    password: req.body.password
  }, function(err, result) {
    if (err) {
      console.log('error', err);
      return res.status(400).send(new errors.InternalError(err.message));
    }
    console.log('user created!', result);
    return res.status(200).send('User created');
  });
});

app.listen(config.dev.port, function() {
  console.log('listening on port', config.dev.port);
});
