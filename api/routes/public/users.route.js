
/**
 * Routes
 */

module.exports = function route (express) {
  const ctrl = require('../../controllers/users.ctrl');
  const router = express.Router();
  router.route('/users')
    .get(ctrl.findOne)
    .post(ctrl.findAll);

  router.route('/users/change-password')
    .post(ctrl.changePassword);

  return router;
};
