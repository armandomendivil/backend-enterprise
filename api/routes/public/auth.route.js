
/**
 * Routes
 */

module.exports = function route (express) {
  const ctrl = require('../../controllers/auth.ctrl');
  const router = express.Router();

  router.route('/user/register')
    .post(ctrl.register);

  router.route('/user/login')
    .post(ctrl.login);

  return router;
};
