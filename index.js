'use strict';

const path = require('path');
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');
const map = require('broccoli-stew').map;

module.exports = {
  name: 'ember-medium-editor',

  included(app) {
    if (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }
    this.app = app;
    this.addonConfig = this.getConfig();

    // Setup paths
    let vendorPath = this.treePaths.vendor;
    let jsPath = path.join(vendorPath, 'medium-editor', 'js');
    let stylesPath = path.join(vendorPath, 'medium-editor', 'css');

    // Import js
    this.import({
      development: path.join(jsPath, 'medium-editor.js'),
      production: path.join(jsPath, 'medium-editor.min.js')
    });
    this.import(path.join(vendorPath, 'shims', 'medium-editor.js'));

    // Import styles
    if (!this.addonConfig.excludeStyles) {
      let theme = this.addonConfig.theme;
      this.import({
        development: path.join(stylesPath, 'medium-editor.css'),
        production: path.join(stylesPath, 'medium-editor.min.css')
      });
      this.import({
        development: path.join(stylesPath, 'themes', `${theme}.css`),
        production: path.join(stylesPath, 'themes', `${theme}.min.css`)
      });
    }

    return this._super.included.apply(this, arguments);
  },

  treeForVendor(vendorTree) {
    let moduleName = 'medium-editor';
    let modulePath = path.join(require.resolve(moduleName), '..', '..');

    let jsTree = new Funnel(modulePath, {
      include: ['js/**/*'],
      destDir: moduleName
    });

    jsTree = map(jsTree, (content) => `if (typeof FastBoot === 'undefined') { ${content} }`);

    let cssTree = new Funnel(modulePath, {
      include: ['css/**/*'],
      destDir: moduleName
    });

    return mergeTrees([vendorTree, jsTree, cssTree]);
  },

  getConfig() {
    return Object.assign({
      excludeStyles: false,
      theme: 'default'
    }, this.app.options.mediumEditor);
  }
};
