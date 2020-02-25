/**
 * Copyright (c) 2020-present, Phil Wamba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const path = require('path');
const download = require('download-git-repo');
const { Spinner } = require('cli-spinner');
const file = require('./files');
const inquirer = require('./inquirer');
const program = require('./program');

const spinner = new Spinner('Please wait downloading... %s');

const handleError = (err) => {
  if (err) throw err;
  // eslint-disable-next-line no-console
  console.log(chalk.green('File is created successfully.'));
};

const run = async () => {
  program.parse(process.argv);

  if (program.page) {
    const page = await inquirer.askHtmlPageName();
    const tmplsDir = path.join(__dirname, 'templates');
    const content = file.getFileContent(`${tmplsDir}/base.html`);
    file.createHtmlFile(`${page.name}.html`, content, handleError);
    return;
  }

  clear();
  // eslint-disable-next-line no-console
  console.log(chalk.yellow(figlet.textSync('Boil', { horizontalLayout: 'full' })));

  const boilerPlate = await inquirer.askBoilerplate();

  if (boilerPlate.template === 'Bootstrap') {
    spinner.start();
    download('philwamba/bootstrap4-boilerplate', boilerPlate.pName, (err) => {
      if (err) {
        spinner.stop(true);
        throw err;
      }
      spinner.stop(true);
      // eslint-disable-next-line no-console
      console.log(chalk.green('Boilerplate downloaded succesfully...'));
    });
  }

  if (boilerPlate.template === 'Materialize') {
    spinner.start();
    download('philwamba/materialize-boilerplate', boilerPlate.pName, (err) => {
      if (err) {
        spinner.stop(true);
        throw err;
      }
      spinner.stop(true);
      // eslint-disable-next-line no-console
      console.log(chalk.green('Boilerplate downloaded succesfully...'));
    });
  }

  if (boilerPlate.template === 'Tailwind') {
    spinner.start();
    download('philwamba/TailwindCSS-Webpack4-Starter-Template', 'test', (err) => {
      if (err) {
        spinner.stop(true);
        throw err;
      }
      spinner.stop(true);
      // eslint-disable-next-line no-console
      console.log(chalk.green('Boilerplate downloaded succesfully...'));
    });
  }
};

module.exports = run();
