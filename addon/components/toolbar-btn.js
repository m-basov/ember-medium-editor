import Component from '@ember/component';
import { get, getWithDefault } from '@ember/object';
import MediumEditor from 'medium-editor';
import createOptions from 'ember-medium-editor/utils/create-options';
import { isEmpty } from '@ember/utils';
import layout from 'ember-medium-editor/templates/components/toolbar-btn';
import { scheduleOnce } from '@ember/runloop';

// MediumEditor is not imported inside of Fastboot
const BUTTON_DEFAULTS = getWithDefault(MediumEditor, 'extensions.button.prototype.defaults', {});
const ANCHOR_DEFAULTS = getWithDefault(MediumEditor, 'extensions.anchor.prototype', {});

function getDefaults(builtIn) {
  switch (builtIn) {
    case 'anchor':
      return ANCHOR_DEFAULTS;
    case false:
      return {};
    default:
      return BUTTON_DEFAULTS[builtIn];
  }
}

function createBtn(options) {
  let { builtIn, contentDefault } = options;
  let defaults = getDefaults(builtIn);

  options.action = options.btnAction;
  delete options.btnAction;
  options.contentDefault = contentDefault;
  options.contentFA = contentDefault;

  if (isEmpty(contentDefault) || contentDefault === '<!---->') {
    delete options.contentDefault;
    delete options.contentFA;
  }

  return createOptions(defaults, options);
}

export default Component.extend({
  layout,
  tagName: '',

  builtIn: false,
  registerButton() {},

  _scheduleRegister(options) {
    scheduleOnce('afterRender', this, '_register', options);
  },

  _register(options) {
    get(this, 'registerButton')(createBtn(options));
  }
});
