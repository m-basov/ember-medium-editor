import Component from '@ember/component';
import layout from '../templates/components/medium-editor';
import MediumEditor from 'medium-editor';
import { set, getProperties, get, computed, getWithDefault } from '@ember/object';
import createOptions from 'ember-medium-editor/utils/create-options';
import { schedule } from '@ember/runloop';
import shallowEqual from 'ember-medium-editor/utils/shallow-equal';
import { getOwner } from '@ember/application';
import { reads } from '@ember/object/computed';

const CORE_OPTIONS = [
  'activeButtonClass',
  'buttonLabels',
  'contentWindow',
  'delay',
  'disableReturn',
  'disableDoubleReturn',
  'disableExtraSpaces',
  'disableEditing',
  'elementsContainer',
  'ownerDocument',
  'spellcheck',
  'targetBlank',
  'extensions'
];

const MediumEditorComponent = Component.extend({
  layout,

  _instance: null,
  _options: null,
  _instanceOptions: null,
  _prevValue: '',

  value: '',

  fastboot: computed({
    get() {
      let owner = getOwner(this);
      return owner.lookup('service:fastboot');
    }
  }),

  isFastboot: reads('fastboot.isFastBoot'),

  /**
   * Use didReceiveAttrs hook to listen for props changes and update MediumEditor
   * options.
   */
  didReceiveAttrs() {
    this._super(...arguments);
    this._setupMediumEditor();
  },

  /**
   * We need teardown editor if wrapper component is destroying;
   */
  willDestroyElement() {
    this._super(...arguments);
    this._maybeDestroyPrevInstance();
  },

  _setupMediumEditor(forceRerender = false) {
    if (get(this, 'isFastboot')) return;
    /**
     * We need access to the DOM to setup MediumEditor so this must be executed
     * only inside of afterRender queue.
     */
    schedule('afterRender', () => {
      let options = this._createOptions();
      /**
       * Before render check if current set of options has been changed.
       * There is a way to force rerendering by passing boolean param.
       * It is used by built-in extensions.
       */
      if (forceRerender || this._shouldRerender(options)) {
        /**
         * There are no way to update options on the fly so we need to teardown
         * previous instance first and create a new one with new options.
         *
         * https://github.com/yabwe/medium-editor/issues/1129
         */
        this._maybeDestroyPrevInstance();
        // Create a new instance with the current set of options
        let instance = this._createInstance(options);
        // Set content with preserving current cursor position
        this._setContent(instance);
      }
    });
  },

  /**
   * Merge core options with options registered by extensions and remove empty keys.
   */
  _createOptions() {
    return createOptions(
      getProperties(this, CORE_OPTIONS),
      getWithDefault(this, '_options', {})
    );
  },

  /**
   * Create MediumEditor instance on the internal container and cache it.
   */
  _createInstance(options) {
    let el = this.element.getElementsByClassName('ember-medium-editor__container')[0];
    let instance = new MediumEditor(el, options);
    return set(this, '_instance', instance);
  },

  /**
   * If there are currently alive instance of MediumEditor destroy it and purge
   * cache.
   */
  _maybeDestroyPrevInstance() {
    let instance = get(this, '_instance');
    if (instance) {
      instance.destroy();
      set(this, '_instance', null);
    }
  },

  /**
   * Compare a new set of options with the cached one(shallow).
   * If they are different then allow component to rerender.
   * Skip rerendering otherwise.
   */
  _shouldRerender(options) {
    let instanceOptions = get(this, '_instanceOptions');
    set(this, '_instanceOptions', options);
    return !shallowEqual(options, instanceOptions);
  },

  /**
   * Update MediumEditor content if it has been changed
   * with preserving cursor position.
   */
  _setContent(editor) {
    let value = get(this, 'value');
    let prevValue = get(this, '_prevValue');

    if (value !== prevValue) {
      set(this, '_prevValue', value);
      editor.saveSelection();
      editor.setContent(value);
      editor.restoreSelection();
    }
  },

  _registerExtension(storage, key, val, props) {
    let options = getWithDefault(this, storage, {});
    options = {
      ...options,
      [key]: val
    };
    set(this, storage, options);
    this._setupMediumEditor(props.forceRerender);
  }
});

MediumEditorComponent.reopenClass({
  positionalParams: ['value']
});

export default MediumEditorComponent;
