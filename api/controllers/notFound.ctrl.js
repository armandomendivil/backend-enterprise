
/**
 * Controller
 */

async function notFound (req, res, next) {
  var err = new Error();
  err.status = 404;
  next(err);
}

module.exports = {
  notFound,
};
