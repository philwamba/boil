/**
 * Copyright (c) 2020-present, Phil Wamba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const program = require('commander');
const detail = require('../../package.json');

program
  .version(detail.version)
  .option('-p, --page', 'generate HTML Page');

module.exports = program;
