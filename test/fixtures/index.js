'use strict';

const uuid = require('uuid-base62');

const fixtures = {
  getUser () {
    return {
      password: uuid.uuid(),
      email: `${Date.now()}@test.com`,
    };
  },
};

module.exports = fixtures;
