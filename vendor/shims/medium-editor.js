(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': self['MediumEditor'],
      __esModule: true,
    };
  }

  define('medium-editor', [], vendorModule);  // eslint-disable-line
})();
