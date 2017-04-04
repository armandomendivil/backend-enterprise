
/**
 * Controller
 */

const UsersBL = require('../../BL');

const collectionName = 'Users';
const usersBL = new UsersBL(collectionName);

async function findAll (req, res, next) {
  let results = [];
  try {
    results = await usersBL.getAll();
  } catch (e) {
    throw Error(e);
  }
  res.send({ data: results });
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
