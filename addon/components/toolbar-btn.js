import Component from '@ember/component';
import { set,get, getProperties } from '@ember/object';
import MediumEditor from 'medium-editor';
import createOptions from 'ember-medium-editor/utils/create-options';
import { isEmpty } from '@ember/utils';
import layout from 'ember-medium-editor/templates/components/toolbar-btn';
import { schedule } from '@ember/runloop';
import { invokeAction } from 'ember-invoke-action';
import createLogger from 'ember-medium-editor/utils/logger';

const log = createLogger('component', 'toolbar-btn');

const BUTTON_DEFAULTS = MediumEditor.extensions.button.prototype.defaults;

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

function createBtn(builtIn, options, content) {
  log`createBtn: builtIn:${builtIn}options:${options}content:${content}`;
  let defaults = builtIn ? BUTTON_DEFAULTS[builtIn] : {};
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

  willDestroyElement() {
    this._super();
    this._unregister();
  },

  _register(el) {
    schedule('afterRender', () => {
      let builtIn = get(this, 'builtIn');
      let options = getProperties(this, BUTTON_OPTIONS);
      BUTTON_OPTIONS_COLLISIONS.forEach((opt) => {
        options[opt.key] = get(this, opt.safeKey);
      });
      let btn = createBtn(builtIn, options, el);
      set(this, '_btn', btn);

      log`_register: ${btn}`;
      invokeAction(this, 'registerButton', btn);
    });
  },

  _unregister() {
    let btn = get(this, '_btn');
    log`_unregister: ${btn}`;
    invokeAction(this, 'registerButton', btn, true);
  },

  actions: {
    scheduleRegister(el) {
      log`scheduleRegister: ${el}`;
      this._register(el);
    }
  }
});
