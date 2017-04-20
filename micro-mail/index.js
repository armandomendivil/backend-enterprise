var config = require('../config/config');
var sg = require('sendgrid')(config.sendgrid.apiKey);
var helper = require('sendgrid').mail;

/**
 * [send description]
 * @param  {String}  [from='no-reply@test.com'] [description]
 * @param  {String}  [to='']                    [description]
 * @param  {String}  [subject='']               [description]
 * @param  {String}  [body='']                  [description]
 * @return {Promise}                            [description]
 */
async function send (from = 'no-reply@test.com', to = '', subject = '', body = '') {
  var fromEmail = new helper.Email(from);
  var toEmail = new helper.Email(to);
  var content = new helper.Content('text/plain', body);
  var mail = new helper.Mail(fromEmail, subject, toEmail, content);

  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON(),
  });

  var response = await sg.API(request);
  console.log(response.statusCode);
  console.log(response.body);
  console.log(response.headers);
}

module.exports = {
  send,
};
