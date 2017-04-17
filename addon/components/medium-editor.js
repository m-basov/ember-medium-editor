import Ember from 'ember';
import MediumEditor from 'medium-editor';
import mediumEditorEvents from '../events-list';
import defaultOptions, { optionsList } from '../default-options';

const {
  Component,
  set,
  get,
  isPresent,
  getProperties,
  A,
  run
} = Ember;

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
   * Amount of milliseconds to trigger `onUserFinishedTyping` event.
   *
   * @public
   * @property onUserFinishedTypingDelay
   * @default 1000
   * @type Number
   */
  onUserFinishedTypingDelay: 1000,

  /**
   * Fired after user stopped typing for `onUserFinishedTypingDelay` milliseconds.
   *
   * @public
   * @event onUserFinishedTyping
   * @default null
   * @type {function}
   */
  onUserFinishedTyping: null,

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
    this._subscribeToEvents(editor);
    this._setContent(editor);

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
    this._subscribeToOnUserFinishedTyping(editor);
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
        if (isUpdated) {
          set(this, '_prevValue', newValue);
          onChangeHandler(newValue);
        }
      };

      editor.subscribe('editableInput', handler);
    }
  },

  /**
   * Subscribe for onUserFinishedTyping event.
   *
   * @private
   * @method _subscribeToOnUserFinishedTyping
   * @param {MediumEditor} editor – `medium-editor` instance
   */
  _subscribeToOnUserFinishedTyping(editor) {
    let onUserFinishedTypingHandler = get(this, 'onUserFinishedTyping');
    if (typeof onUserFinishedTypingHandler === 'function') {
      let delay = get(this, 'onUserFinishedTypingDelay');
      let handler = () => {
        run.cancel(get(this, '_onUserFinishedTypingTimeout'));
        let later = run.later(this, onUserFinishedTypingHandler, delay);
        set(this, '_onUserFinishedTypingTimeout', later);
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
    run.cancel(get(this, '_onUserFinishedTypingTimeout'));
  }
});

MediumEditorComponent.reopenClass({
  positionalParams: ['value']
});

export default MediumEditorComponent;
