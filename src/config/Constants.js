module.exports = {
    JWT_SALT_KEY: process.env.SALT_KEY,
    DEFAULT_ROLES:  ['provider'],
    APP_URL : process.env.APP_URL,
    PUBLIC_URL : process.env.PUBLIC_URL,
    AWS_SECRET: process.env.AWS_SECRET,
    AWS_ID: process.env.AWS_ID,
    AWS_BUCKET: process.env.AWS_BUCKET,
    AWS_BUCKET_URL: process.env.AWS_BUCKET_URL,
}