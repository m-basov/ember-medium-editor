import Component from '@ember/component';
import { set,get, getProperties, computed, getWithDefault } from '@ember/object';
import MediumEditor from 'medium-editor';
import createOptions from 'ember-medium-editor/utils/create-options';
import { isEmpty } from '@ember/utils';
import layout from 'ember-medium-editor/templates/components/toolbar-btn';
import { schedule } from '@ember/runloop';
import { invokeAction } from 'ember-invoke-action';
import { guidFor } from '@ember/object/internals';

// MediumEditor is not imported inside of Fastboot
const BUTTON_DEFAULTS = getWithDefault(MediumEditor, 'extensions.button.prototype.defaults', {});
const ANCHOR_DEFAULTS = getWithDefault(MediumEditor, 'extensions.anchor.prototype', {});

const BUTTON_OPTIONS = [
  'name',
  'action',
  'aria',
  'tagNames',
  'style',
  'useQueryState',
  'contentDefault',
  'contentFA'
];

const BUTTON_OPTIONS_COLLISIONS = [
  { key: 'action', safeKey: 'btnAction' }
];

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

function createBtn(builtIn, options, content) {
  let defaults = getDefaults(builtIn);
  content = isEmpty(content) || content === '<!---->' ? undefined : content;
  options.contentDefault = content;
  options.contentFA = content;
  return createOptions(defaults, options);
}

export default Component.extend({
  layout,
  tagName: '',

  builtIn: false,
  registerButton() {},

  buttonId: computed({
    get() {
      return guidFor(this);
    }
  }),

  didReceiveAttrs() {
    this._super(...arguments);
    this._register();
  },

  willDestroyElement() {
    this._super(...arguments);
    this._unregister();
  },

  _register(el) {
    schedule('afterRender', () => {
      let builtIn = get(this, 'builtIn');
      let options = getProperties(this, BUTTON_OPTIONS);
      BUTTON_OPTIONS_COLLISIONS.forEach((opt) => {
        options[opt.key] = get(this, opt.safeKey);
      });
      options.id = get(this, 'buttonId');
      let btn = createBtn(builtIn, options, el);
      set(this, '_btn', btn);

      invokeAction(this, 'registerButton', btn);
    });
  },

  _unregister() {
    let btn = get(this, '_btn');
    invokeAction(this, 'registerButton', btn, { remove: true });
  }
});
