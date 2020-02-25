/**
 * Copyright (c) 2020-present, Phil Wamba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const fs = require('fs');
const path = require('path');

const getCurrentDir = () => path.basename(process.cwd());

const dirExists = (filePath) => fs.existsSync(filePath);

const createHtmlFile = (fName, fContent, handleErr) => fs.writeFile(fName, fContent, handleErr);

const getFileContent = (fpath) => fs.readFileSync(fpath, 'utf8');

module.exports = {
  getCurrentDir,
  dirExists,
  createHtmlFile,
  getFileContent,
};
