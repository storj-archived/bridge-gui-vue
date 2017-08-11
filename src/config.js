module.exports = {
  // Don't need any of the config vars from bridge-gui because none of this
  // is server-side rendered
  // dev server is for hot reloading
  URLS: {
    BRIDGE: process.env.BRIDGE_URL,
    BILLING: process.env.BILLING_URL
  },
  BRIDGE_URL: process.env.NODE_ENV === 'development'
    ? 'http://bridge-ssl-proxy' : process.env.BRIDGE_URL,
  BILLING_URL: process.env.NODE_ENV === 'development'
    ? 'localhost:3000/graphql' : process.env.BILLING_URL
};
