/**
 * Component Generator
 */

/* eslint strict: ["off"] */

'use strict';

const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'Add an unconnected component',
  prompts: [{
    type: 'list',
    name: 'type',
    message: 'Select the type of component',
    default: 'Stateless Function',
    choices: () => ['All', 'Controller', 'Route'],
  }, {
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'item',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return componentExists(value) ? 'A component with this name already exists' : true;
      }

      return 'The name is required';
    },
  }],
  actions: (data) => {
    const actions = [{
      type: 'add',
      path: '../../api/controllers/{{lowerCase name}}.ctrl.js',
      templateFile: './component/controller.js.hbs',
      abortOnFail: true,
    }, {
      type: 'add',
      path: '../../api/routes/public/{{lowerCase name}}.route.js',
      templateFile: './component/route.js.hbs',
      abortOnFail: true,
    },
    {
      type: 'add',
      path: '../../BL/{{lowerCase name}}.js',
      templateFile: './component/BL.js.hbs',
      abortOnFail: true,
    },
    {
      type: 'add',
      path: '../../DL/{{lowerCase name}}.js',
      templateFile: './component/DL.js.hbs',
      abortOnFail: true,
    },
    {
      type: 'add',
      path: '../../micro-mongo/lib/models/{{lowerCase name}}.js',
      templateFile: './component/model.js.hbs',
      abortOnFail: true,
    },
    {
      type: 'add',
      path: '../../api/swagger/{{lowerCase name}}.json',
      templateFile: './component/swagger.js.hbs',
      abortOnFail: true,
    },
    ];

    return actions;
  },
};
