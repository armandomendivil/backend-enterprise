const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../micro-mongo/lib/models/users');
const config = require('./config');

module.exports = function (passport) {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('Bearer');
  opts.secretOrKey = config.TOKEN_SECRET;
  passport.use(new JwtStrategy(opts, function (jwt_payload, done) { // eslint-disable-line
    User.find({ id: jwt_payload.id }, function (err, user) {
      console.log('Here ------');
      if (err) return done(err, false);
      return done(null, user);
    });
  }));
};
