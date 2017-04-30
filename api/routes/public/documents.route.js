
/**
 * Routes
 */

module.exports = function route (express) {
  const ctrl = require('../../controllers/documents.ctrl');
  const router = express.Router();

  router.route('/document')
    .post(ctrl.save);

  router.route('/documents')
    .get(ctrl.findOne)
    .post(ctrl.findAll);

  return router;
};
