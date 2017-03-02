const express = require('express');
const compression = require('compression');
const config = require('./config');
const targetUrl = `http://${config.apiHost}:${config.apiPort}`;
const port = config.port;
const app = express();

app
  .use(compression())
  .use(httpToHttpsRedirect)
  .use(express.static(__dirname + '/dist'));

app.listen(port, () => {
  console.log(`‡‡‡ listening on port ${port}`);
});

function httpToHttpsRedirect(req, res, next) {
  if (req.protocol !== 'https' && config.httpsRedirect) {
    res.redirect('https://' + req.hostname + req.url);
  } else {
    next();
  }
}
