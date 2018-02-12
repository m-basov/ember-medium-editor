import Component from '@ember/component';
import layout from '../templates/components/medium-editor';
import MediumEditor from 'medium-editor';
import { set, getProperties, get } from '@ember/object';
import createOptions from 'ember-medium-editor/utils/create-options';
import { schedule } from '@ember/runloop';
import createLogger from 'ember-medium-editor/utils/logger';
import shallowEqual from 'ember-medium-editor/utils/shallow-equal';

const log = createLogger('component', 'medium-editor');
/** These are the default options for the editor,
  * if nothing is passed this is what is used
  * https://github.com/yabwe/medium-editor/blob/master/OPTIONS.md#core-options
  */
const CORE_OPTIONS = [
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
  _instanceOptions: null,
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
  _setupMediumEditor(forceRerender = false) {
    schedule('afterRender', () => {
      let options = createOptions(
        getProperties(this, CORE_OPTIONS),
        get(this, '_options') || {}
      );
      if (forceRerender || this._shouldRerender(options)) {
        this._maybeDestroyPrevInstance();
        let el = this.element.getElementsByClassName('ember-medium-editor-container')[0];
        let instance = new MediumEditor(el, options);
        set(this, '_instance', instance);
        log`_setupMediumEditor: options:${options}instance:${instance}`;
      }
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

  _shouldRerender(options) {
    let instanceOptions = get(this, '_instanceOptions');
    set(this, '_instanceOptions', options);
    let isNotEqual = !shallowEqual(options, instanceOptions);
    log`_shouldRerender: ${isNotEqual}`;
    return isNotEqual;
  },
  // methods

  actions: {
    registerExtension(key, val, props = {}) {
      log`registerExtension: key:${key}val:${val}`;
      let options = get(this, '_options') || {};
      options[key] = val;
      set(this, '_options', options);
      this._setupMediumEditor(props.forceRerender);
    }
  }
});
