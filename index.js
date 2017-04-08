/* eslint-env node */
'use strict';

const path = require('path');
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');

function isFastboot() {
  return process.env.EMBER_CLI_FASTBOOT === 'true';
}

module.exports = {
  name: 'ember-medium-editor',

  included(parent) {
    this._super.included.apply(this, arguments);

    // exit from hook in the fastboot mode
    if (isFastboot()) { return; }

    let options = this.getConfig(parent);

    let vendorPath = this.treePaths.vendor;
    let jsPath = path.join(vendorPath, 'medium-editor', 'js');
    let stylesPath = path.join(vendorPath, 'medium-editor', 'css');

    // import js
    this.import({
      development: path.join(jsPath, 'medium-editor.js'),
      production: path.join(jsPath, 'medium-editor.min.js')
    });
    this.import(path.join(vendorPath, 'shims', 'medium-editor.js'));

    // import styles
    if (!options.excludeStyles) {
      this.import({
        development: path.join(stylesPath, 'medium-editor.css'),
        production: path.join(stylesPath, 'medium-editor.min.css')
      });
      this.import({
        development: path.join(stylesPath, 'themes', `${options.theme}.css`),
        production: path.join(stylesPath, 'themes', `${options.theme}.min.css`)
      });
    }
  },

  treeForVendor(vendorTree) {
    // do not include assets in the fastboot mode
    if (isFastboot()) { return vendorTree; }

    let distPath = path.join(require.resolve('medium-editor'), '..', '..');
    let meTree = new Funnel(distPath, {
      include: ['**/*'],
      destDir: 'medium-editor'
    });

    return mergeTrees([vendorTree, meTree]);
  },

  getConfig(parent) {
    let defaultConfig = {
      excludeStyles: false,
      theme: 'default'
    };

    return Object.assign(defaultConfig, parent.options.mediumEditor);
  }
};
