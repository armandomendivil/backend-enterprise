
const { test } = require('ava');
const request = require('supertest');

const fixtures = require('./fixtures');

test('POST /', async t => {
  const server = await require('../server');
  let user = fixtures.getUser();

  const response = await request(server)
    .post('/api/user/register')
    .send({
      email: user.email,
      password: user.password,
    });

  // cleanup some things
  delete user.email;
  delete user.password;
  console.log(user);

  t.is(response.statusCode, 200);
});
