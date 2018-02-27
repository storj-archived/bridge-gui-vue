console.log('building container with envs: ', process.env)

module.exports = {
  NODE_ENV: process.env.NODE_ENV || '"production"',
  STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY || '"sk_test_W6L09JRZ1YR4Ua0KuDCDTST3"',
  BILLING_URL: process.env.BILLING_URL || '"https://billing.staging.storj.io"',
  BRIDGE_URL: process.env.BRIDGE_URL || '"https://api.staging.storj.io"'
}
