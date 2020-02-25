/**
 * Copyright (c) 2020-present, Phil Wamba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const inquirer = require('inquirer');
const validate = require('./validate');

const askHtmlPageName = () => {
  const questions = [
    {
      name: 'name',
      type: 'input',
      message: '(Generating HTML Page) Enter the file name:',
      validate: validate.validatePageName,
    },
  ];

  return inquirer.prompt(questions);
};

const askBoilerplate = () => {
  const questions = [
    {
      name: 'template',
      type: 'list',
      message: 'What boilerplate do you want?',
      choices: ['Bootstrap', 'Materialize', 'Tailwind'],
      validate: validate.validateBoilerplate,
    },
    {
      name: 'pName',
      type: 'input',
      message: 'Enter the project name?',
      validate: validate.validateProjectName,
    },
  ];

  return inquirer.prompt(questions);
};


module.exports = {
  askHtmlPageName,
  askBoilerplate,
};
