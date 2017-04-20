const Mailgun = require('mailgun-js');
const config = require('../config/config');

const mailgun = new Mailgun({
  apiKey: 'key-2f2d1a4ba0a57317e1e0988de622971b',
  domain: 'https://api.mailgun.net/v3/sandbox62aa5b1463574d1abe7e02c68cda8eaf.mailgun.org',
});

module.exports = mailgun;
