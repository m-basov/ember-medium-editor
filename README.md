# ember-medium-editor [![Build Status](https://travis-ci.org/kolybasov/ember-medium-editor.svg?branch=master)](https://travis-ci.org/kolybasov/ember-medium-editor) [![Ember Observer Score](https://emberobserver.com/badges/ember-medium-editor.svg)](https://emberobserver.com/addons/ember-medium-editor) [![npm version](https://badge.fury.io/js/ember-medium-editor.svg)](https://badge.fury.io/js/ember-medium-editor)

[medium-editor](https://github.com/yabwe/medium-editor) library for Ember Apps.

## Installation

With `ember`:

* `ember install ember-medium-editor`

With `npm`:

* `npm install --save-dev ember-medium-editor`

With `yarn`:

* `yarn add --dev ember-medium-editor`

## Configuration

```js
// ember-cli-build.js
let app = new EmberApp(defaults, {
  mediumEditor: {
    /**
    * If true will include only JS in the build.
    *
    * @type Boolean
    * @default false
    */
    excludeStyles: false,
    
    /**
    * List of themes: https://github.com/yabwe/medium-editor/tree/master/dist/css/themes
    *
    * @type String
    * @default 'default'
    */
    theme: 'default'
  }
});
```

## Usage

```handlebars
{{medium-editor
    model.text
    options=(hash)
    onChange=(action (mut model.text))}}
```

## Issues

If you encounter any issue please report it [here](https://github.com/kolybasov/ember-medium-editor/issues).

## [API Docs](https://ember-medium-editor.mbasov.me/docs/index.html)

## Licence

[MIT](./LICENSE.md)
