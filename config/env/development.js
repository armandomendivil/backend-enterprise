'use estrict';

module.exports = {
  db: {
    port: process.env.port || 27017,
    username: process.env.username,
    password: process.env.password,
    db: process.env.db || 'test',
    host: process.env.host || '127.0.0.1',
  },
  SERVER_PORT: 3000,
  ip: 'localhost',
  CLIENT_EMAIL: process.env.CLIENT_EMAIL || 'test@test.com',
  TOKEN_SECRET: process.env.TOKEN_SECRET || 'secretToken',
  dialect: 'mongo',
  aws: {
    accessKey: process.env.AWS_ACCESS_KEY,
    secretKey: process.env.AWS_SECRET_KEY,
  },
  mailgun: {
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  },
};
