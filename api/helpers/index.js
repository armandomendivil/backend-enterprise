const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../../config/config');

exports.getPayloadDecoded = function getPayloadDecoded (headers) {
  const token = headers.authorization.split(' ')[1];
  const payload = jwt.decode(token, config.TOKEN_SECRET);
  return payload;
};

exports.createToken = function createToken (user) {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix(),
  };

  return jwt.encode(payload, config.TOKEN_SECRET);
};
