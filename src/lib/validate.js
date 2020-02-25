/**
 * Copyright (c) 2020-present, Phil Wamba
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const validatePageName = (val) => {
  if (val.length) {
    return true;
  }
  return 'Please enter a file name!';
};

const validateBoilerplate = (val) => {
  if (val.length) {
    return true;
  }
  return 'Please select a css framework!';
};

const validateProjectName = (val) => {
  if (val.length) {
    return true;
  }
  return 'Please enter the project name!';
};

module.exports = {
  validatePageName,
  validateBoilerplate,
  validateProjectName,
};
