const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const config = require('./config');
const history = require('connect-history-api-fallback');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Security Headers */
app.use(function(req, res, next) {
  res.set('X-Frame-Options', 'DENY');
  next();
});
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: [ "'self'" ],
    scriptSrc: [ "'self'", 'https://js.stripe.com', "'unsafe-eval'" ],
    styleSrc: [ "'self'", "'unsafe-inline'", 'https://maxcdn.bootstrapcdn.com' ],
    objectSrc: [ "'none'" ],
    frameSrc: [ 'https://js.stripe.com', 'https://storj.github.io' ],
    childSrc: [ 'https://js.stripe.com', 'https://storj.github.io' ],
    imgSrc: [ "'self'", 'https://q.stripe.com' ]
  }
}));

/* Static App */
app.use(history());
app.use(express.static(__dirname + '/dist'));

app.listen(config.dev.port, function() {
  console.log('listening on port', config.dev.port);
});
