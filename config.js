/*
 * POLYFILL `Object.assign`
 */
if (typeof Object.assign != 'function') {
  Object.assign = function(target) {
    'use strict';
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    target = Object(target);
    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index];
      if (source != null) {
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  };
}

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || '127.0.0.1',
  port: Number(process.env.PORT) || 8080,
  apiHost: process.env.APIHOST || 'api.storj.io',
  apiPort: Number(process.env.APIPORT) || '',
  apiProtocol: process.env.APIPROTOCOL || ((/develop(?:ment)?|test/.test(process.env.NODE_ENV)) ? 'http' : 'https'),
  httpsRedirect: (process.env.HTTPSREDIRECT  === 'true') || false,
  app: {
    title: 'Storj',
    description: 'Storj provides developers and IT teams with high performance, durable object storage.',
    head: {
      titleTemplate: 'Storj: %s',
      meta: [
        {name: 'description', content: 'Storj provides developers and IT teams with high performance, durable object storage.'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Storj - The Most Secure Cloud Storage'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'Storj - The Most Secure Cloud Storage'},
        {property: 'og:description', content: 'Storj provides developers and IT teams with high performance, durable object storage.'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@rforan'},
        {property: 'og:creator', content: '@rforan'},
        {property: 'og:image', content: (process.env.HOST || 'localhost') + '/img/logo-white.svg'},
        {property: 'og:image:width', content: '150'},
        {property: 'og:image:height', content: '25'}
      ]
    }
  }
}, environment);
