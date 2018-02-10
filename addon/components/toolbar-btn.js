import Component from '@ember/component';
import { get, getProperties } from '@ember/object';
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
  content = isEmpty(content) ? undefined : content;
  options.contentDefault = content;
  options.contentFA = content;
  return createOptions(defaults, options);
}

export default Component.extend({
  layout,
  tagName: '',

  builtIn: false,
  registerButton() {},

  init() {
    this._super(...arguments);

    log`init`;
    this._register();
  },

  _register() {
    schedule('afterRender', () => {
      let builtIn = get(this, 'builtIn');
      let options = getProperties(this, BUTTON_OPTIONS);
      BUTTON_OPTIONS_COLLISIONS.forEach((opt) => {
        options[opt.key] = get(this, opt.safeKey);
      });
      let content = get(this, 'destinationElement');
      let btn = createBtn(builtIn, options, content);

      log`_register: ${btn}`;
      invokeAction(this, 'registerButton', btn);
    });
  }
});
