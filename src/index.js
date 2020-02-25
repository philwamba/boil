#!/usr/bin/env node

/**
 * Copyright (c) 2020-present, Phil Wamba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const chalk = require('chalk');

const currentNodeVersion = process.versions.node;
const semver = currentNodeVersion.split('.');
const major = semver[0];

if (major < 8) {
  // eslint-disable-next-line no-console
  console.log(chalk.yellow(`You are running Node ${currentNodeVersion}.\nBoil requires Node 8 or higher.\nPlease update your version of Node.`));
  process.exit(1);
}

require('./lib');
