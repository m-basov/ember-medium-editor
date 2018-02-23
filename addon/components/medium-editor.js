import Component from '@ember/component';
import layout from '../templates/components/medium-editor';
import MediumEditor from 'medium-editor';
import { set, getProperties, get, computed, getWithDefault } from '@ember/object';
import createOptions from 'ember-medium-editor/utils/create-options';
import { scheduleOnce } from '@ember/runloop';
import { getOwner } from '@ember/application';
import { reads } from '@ember/object/computed';
import mediumEditorEvents from 'ember-medium-editor/-private/medium-editor-events';
import { capitalize } from '@ember/string';

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
  _firstRender: true,

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
    this._scheduleSetupMediumEditor();
  },

  /**
   * We need teardown editor if wrapper component is destroying;
   */
  willDestroyElement() {
    this._super(...arguments);
    this._maybeDestroyPrevInstance();
  },

  _scheduleSetupMediumEditor() {
    if (get(this, 'isFastboot')) return;
    scheduleOnce('afterRender', this, '_setupMediumEditor');
  },

  _setupMediumEditor() {
    /**
     * We need access to the DOM to setup MediumEditor so this must be executed
     * only inside of afterRender queue.
     */
    let options = this._createOptions();
    /**
     * There are no way to update options on the fly so we need to teardown
     * previous instance first and create a new one with new options.
     *
     * https://github.com/yabwe/medium-editor/issues/1129
     */
    this._maybeDestroyPrevInstance();
    // Create a new instance with the current set of options
    let instance = this._createInstance(options);
    // Attach all passed events
    this._attachEvents(instance);
    // Set content with preserving current cursor position
    this._setContent();
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
   * Update MediumEditor content if it has been changed
   * with preserving cursor position.
   */
  _setContent() {
    let editor = get(this, '_instance');
    let value = get(this, 'value');
    let prevValue = get(this, '_prevValue');

    if (value !== prevValue) {
      set(this, '_prevValue', value);
      editor.saveSelection();
      editor.setContent(value);
      editor.restoreSelection();
    }
  },

  _registerExtension(storage, key, val) {
    let options = getWithDefault(this, storage, {});
    options = {
      ...options,
      [key]: val
    };
    set(this, storage, options);
    this._scheduleSetupMediumEditor();
  },

  _attachEvents(editor) {
    mediumEditorEvents.forEach((event) => {
      let handler = get(this, `on${capitalize(event)}`);
      if (typeof handler === 'function') editor.subscribe(event, handler);
    });
    this._attachOnInput(editor)
  },

  _attachOnInput(editor) {
    let onInput = get(this, 'onInput');
    if (typeof onInput !== 'function') return;
    editor.subscribe('editableInput', (...args) => {
      let content = editor.getContent();
      // Fix triggering onInput after first render
      if (get(this, '_firstRender')) return set(this, '_firstRender', false);
      onInput(content, ...args);
    });
  }
});

MediumEditorComponent.reopenClass({
  positionalParams: ['value']
});

export default MediumEditorComponent;
