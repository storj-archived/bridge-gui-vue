module.exports = {
  // Don't need any of the config vars from bridge-gui because none of this
  // is server-side rendered
  // dev server is for hot reloading
  BRIDGE_URL: process.env.NODE_ENV === 'development'
    ? 'http://bridge-ssl-proxy' : process.env.BRIDGE_URL,
  BILLING_URL: process.env.NODE_ENV === 'development'
    ? 'localhost:3000/graphql' : process.env.BILLING_URL,
  RESET_PASSWORD_REDIRECT_URL: process.env.NODE_ENV === 'development'
    ? 'https://app.staging.storj.io'
    : 'https://app.storj.io'
};
