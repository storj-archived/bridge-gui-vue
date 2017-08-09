console.log('node_env', process.env.NODE_ENV);
console.log('BILLING_URL', process.env.BILLING_URL);
console.log('BRIDGE_URL', process.env.BRIDGE_URL);
module.exports = {
  // Don't need any of the config vars from bridge-gui because none of this
  // is server-side rendered
  // dev server is for hot reloading
  BRIDGE_URL: process.env.NODE_ENV === 'development'
    ? 'http://bridge-ssl-proxy' : 'https://api.storj.io',
  BILLING_URL: process.env.NODE_ENV === 'development'
    ? 'localhost:3000/graphql' : 'https://billing.storj.io'
};
