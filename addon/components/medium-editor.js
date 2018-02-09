import MediumEditor from 'medium-editor';
import mediumEditorEvents from '../events-list';
import defaultOptions, { optionsList } from '../default-options';
import Component from '@ember/component';
import { set, get, getProperties } from '@ember/object';
import { A } from '@ember/array';
import { debounce, cancel } from '@ember/runloop';
import { isPresent } from '@ember/utils';

/**
 * Ember wrapper for `medium-editor` library.
 *
 * Usage:
 *
 * ```handlebars
 * {{medium-editor
 *    model.text
 *    options=(hash)
 *    onChange=(action (mut model.text))}}
 * ```
 *
 * @exports
 * @module ember-medium-editor
 * @class MediumEditor
 */
const MediumEditorComponent = Component.extend({
  /**
   * Value to set into the editor. It is readonly.
   *
   * @public
   * @property value
   * @default null
   * @type String
   */
  value: null,

  /**
   * Options to pass to MediumEditor instance. List of all available options is
   * accessible by link: https://github.com/yabwe/medium-editor/blob/master/OPTIONS.md
   *
   * @public
   * @property options
   * @default {}
   * @type {Object}
   */
  options: null,

  /**
   * `onChange` is alias for `editableInput` event. Lists of all events:
   * https://github.com/yabwe/medium-editor/blob/master/CUSTOM-EVENTS.md
   *
   * @public
   * @event onChange
   * @default null
   * @type {function}
   */
  onChange: null,

  /**
   * Amount of milliseconds to trigger `onFinishedTyping` event.
   *
   * @public
   * @property onFinishedTypingDelay
   * @default 1000
   * @type Number
   */
  onFinishedTypingDelay: 1000,

  /**
   * Fired after user stopped typing for `onFinishedTypingDelay` milliseconds.
   *
   * @public
   * @event onFinishedTyping
   * @default null
   * @type {function}
   */
  onFinishedTyping: null,

  _skipNextOnChangeTrigger: false,

  didInsertElement() {
    this._super(...arguments);
    this._initEditor();
  },

  willDestroyElement() {
    this._super(...arguments);
    this._destroyEditor();
  },

  didUpdateAttrs() {
    this._super(...arguments);
    this.set('_skipNextOnChangeTrigger', true);
    this._setContent(get(this, '_editor'));
  },

  /**
   * Create `medium-editor` instance for components element and save it
   * for further usage.
   *
   * @private
   * @method _initEditor
   */
  _initEditor() {
    let editor = new MediumEditor(this.element, this._getOptions());
    this._setContent(editor);
    this._subscribeToEvents(editor);

    set(this, '_editor', editor);
  },

  /**
   * If handler from `medium-editor` events list is passed to component then
   * subscribe to it and pass handler.
   *
   * @private
   * @method _subscribeToEvents
   * @param {MediumEditor} editor – `medium-editor` instance
   */
  _subscribeToEvents(editor) {
    mediumEditorEvents.forEach((event) => {
      let handler = get(this, event);
      if (typeof handler === 'function') {
        editor.subscribe(event, handler);
      }
    });

    this._subscribeToOnChange(editor);
    this._subscribeToOnFinishedTyping(editor);
  },

  /**
   * Subscribe for editableInput event if onChange handler is passed. Fire it
   * only if content did change.
   *
   * @private
   * @method _subscribeToOnChange
   * @param {MediumEditor} editor – `medium-editor` instance
   */
  _subscribeToOnChange(editor) {
    let onChangeHandler = get(this, 'onChange');
    if (typeof onChangeHandler === 'function') {
      let handler = () => {
        let newValue = editor.getContent();
        let isUpdated = get(this, '_prevValue') !== newValue;
        let skipNextOnChangeTrigger = get(this, `_skipNextOnChangeTrigger`);
        if (isUpdated && !skipNextOnChangeTrigger) {
          set(this, '_prevValue', newValue);
          onChangeHandler(newValue);
        }
        set(this, `_skipNextOnChangeTrigger`, false);
      };

      editor.subscribe('editableInput', handler);
    }
  },

  /**
   * Subscribe for onFinishedTyping event.
   *
   * @private
   * @method _subscribeToOnFinishedTyping
   * @param {MediumEditor} editor – `medium-editor` instance
   */
  _subscribeToOnFinishedTyping(editor) {
    let onFinishedTypingHandler = get(this, 'onFinishedTyping');
    if (typeof onFinishedTypingHandler === 'function') {
      let delay = get(this, 'onFinishedTypingDelay');
      let handler = () => {
        let timer = debounce(this, onFinishedTypingHandler, delay);
        set(this, '_onFinishedTypingTimeout', timer);
      };

      editor.subscribe('editableInput', handler);
    }
  },

  /**
   * Update current `medium-editor` content if value did changed.
   *
   * @private
   * @method _setContent
   * @param {MediumEditor} editor – `medium-editor` instance
   */
  _setContent(editor) {
    let value = get(this, 'value');
    set(this, '_prevValue', value || '');

    editor.saveSelection();
    editor.setContent(value);
    editor.restoreSelection();
  },

  /**
   * Options can be passed 3 different ways. Addon has default options, options
   * hash and component properties from optionsList.
   *
   * Priority:
   *
   * 1. Component properties
   * 2. options hash
   * 3. default options
   *
   * @private
   * @method _getOptions
   * @return {Object}
   */
  _getOptions() {
    let filteredOptions = optionsList.map((option) => (
      isPresent(get(this, option)) ? option : null
    ));
    filteredOptions = (new A(filteredOptions)).compact();

    let collectedOptions = getProperties(this, filteredOptions);
    let optionsHash = get(this, 'options');

    return Object.assign(
      {},
      defaultOptions,
      optionsHash,
      collectedOptions
    );
  },

  /**
   * Destroy MediumEditor instance if it is exists.
   *
   * @private
   * @method _destroyEditor
   */
  _destroyEditor() {
    let editor = get(this, '_editor');
    if (isPresent(editor)) {
      editor.destroy();
    }
    // clear timers
    cancel(get(this, '_onFinishedTypingTimeout'));
  }
});

MediumEditorComponent.reopenClass({
  positionalParams: ['value']
});

export default MediumEditorComponent;
