
/**
 * Controller
 */

const util = require('util');
const UsersBL = require('../../BL');
const usersBL = new UsersBL();

async function findAll (req, res, next) {
  const self = extractFindAllBody(req.body);

  let result = {};
  try {
    result = await usersBL.getAll(self.query, self.params);
  } catch (e) {
    throw Error(e);
  }
  res.send({
    count: result.count,
    meta: self.meta,
    data: result.data,
  });
}

function extractFindAllBody (body) {
  const limit = parseInt(body.limit, 10) || 10;
  const offset = parseInt(body.offset, 10) || 0;
  const nextOffset = offset + limit;
  const previousOffset = (offset - limit < 1) ? 0 : offset - limit;
  const search = body.search || '';

  const meta = {
    limit,
    offset,
    next: util.format('?limit=%s&offset=%s', limit, nextOffset),
    previous: util.format('?limit=%s&offset=%s', limit, previousOffset),
  };

  let params = {
    limit,
    offset,
    previousOffset,
    nextOffset,
  };

  let query = {
    $or: [
      { email: { $regex: search, $options: '-i' } },
    ],
  };

  return {
    meta,
    params,
    query,
  };
}

async function findOne (req, res, next) {
  let results = [];
  try {
    results = await usersBL.getOne();
  } catch (e) {
    throw Error(e);
  }
  res.send({ data: results });
}

module.exports = {
  findAll,
  findOne,
};
