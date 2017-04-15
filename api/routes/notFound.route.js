/**
 * Routes 404
 */

module.exports = function route (express) {
  const ctrl = require('../controllers/notFound.ctrl');
  const router = express.Router();
  router.route('/:url(api|modules|lib)/*')
    .get(ctrl.notFound)
    .post(ctrl.notFound)
    .put(ctrl.notFound)
    .patch(ctrl.notFound)
    .delete(ctrl.notFound);

  return router;
};
