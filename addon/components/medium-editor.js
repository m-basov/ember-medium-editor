import Component from '@ember/component';
import layout from '../templates/components/medium-editor';
import MediumEditor from 'medium-editor';
import { set, getProperties, get } from '@ember/object';
import createOptions from 'ember-medium-editor/utils/create-options';
import { schedule } from '@ember/runloop';
import createLogger from 'ember-medium-editor/utils/logger';

const log = createLogger('component', 'medium-editor');
/** These are the default options for the editor,
  * if nothing is passed this is what is used
  * https://github.com/yabwe/medium-editor/blob/master/OPTIONS.md#core-options
  */
const CORE_OPTIONS = [
  'allowMultiParagraphSelection', // true
  'buttonLabels',                 // false
  'contentWindow',                // window
  'delay',                        // 0
  'disableReturn',                // false
  'disableDoubleReturn',          // false
  'disableExtraSpaces',           // false
  'disableEditing',               // false
  'elementsContainer',            // false
  'extensions',                   // {}
  'ownerDocument',                // document
  'spellcheck',                   // true
  'targetBlank'                   // false
];

export default Component.extend({
  // component props
  layout,
  // component props

  // internal props
  _instance: null,
  _options: null,
  // internal props

  // props
  // props

  // hooks
  init() {
    this._super(...arguments);

    log`init`;
    this._setupMediumEditor();
  },

  willDestroyElement() {
    this._super(...arguments);

    log`willDestroyElement`;
    this._maybeDestroyPrevInstance();
  },
  // hooks

  // methods
  _setupMediumEditor() {
    schedule('afterRender', () => {
      this._maybeDestroyPrevInstance();
      let options = createOptions(
        getProperties(this, CORE_OPTIONS),
        get(this, '_options') || {}
      );
      let instance = new MediumEditor(this.element, options);
      set(this, '_instance', instance);
      log`_setupMediumEditor: options:${options}instance:${instance}`;
    });
  },

  _maybeDestroyPrevInstance() {
    let instance = get(this, '_instance');
    if (instance) {
      instance.destroy();
      set(this, '_instance', null);
      log`_maybeDestroyPrevInstance: destroyed`;
    }
  },
  // methods

  actions: {
    registerExtension(key, val) {
      log`registerExtension: key:${key}val:${val}`;
      let options = get(this, '_options') || {};
      options[key] = val;
      set(this, '_options', options);
      this._setupMediumEditor();
    }
  }
});
