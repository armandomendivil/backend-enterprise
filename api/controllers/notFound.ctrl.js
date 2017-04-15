
/**
 * Controller
 */

async function notFound (req, res, next) {
  res.status(404).format({
    'default': function () {
      res.send({ error: 'Route not found' });
    },
  });
}

module.exports = {
  notFound,
};
