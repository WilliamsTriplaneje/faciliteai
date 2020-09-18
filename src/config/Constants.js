module.exports = {
    JWT_SALT_KEY: process.env.SALT_KEY,
    DEFAULT_PROVIDER_ROLES:  ['provider'],
    DEFAULT_CLIENT_ROLES:  ['client'],
    APP_URL : process.env.APP_URL,
    SITE_URL: process.env.SITE_URL,
    PUBLIC_URL : process.env.PUBLIC_URL,
    AWS_SECRET: process.env.AWS_SECRET,
    AWS_ID: process.env.AWS_ID,
    AWS_BUCKET: process.env.AWS_BUCKET,
    STRIPE_PUBLIC: process.env.STRIPE_PUBLIC,
    STRIPE_SECRET: process.env.STRIPE_SECRET,
    STRIPE_ENPOINT_SECRET: process.env.STRIPE_ENDPOINT_SECRET,
    EMAIL_NAME: process.env.EMAIL_NAME,
    EMAIL_EMAIL: process.env.EMAIL_EMAIL,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD
}