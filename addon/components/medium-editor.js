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
  A
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
   * @property value
   * @default null
   * @type String
   */
  value: null,

  /**
   * Options to pass to MediumEditor instance. List of all available options is
   * accessible by link: https://github.com/yabwe/medium-editor/blob/master/OPTIONS.md
   *
   * @property options
   * @default {}
   * @type {Object}
   */
  options: null,

  /**
   * `onChange` is alias for `editableInput` event. Lists of all events:
   * https://github.com/yabwe/medium-editor/blob/master/CUSTOM-EVENTS.md
   *
   * @event onChange
   * @default null
   * @type {function}
   */
  onChange: null,

  init() {
    this._super(...arguments);
    this._setOptions();
  },

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
    this._setContent();
  },

  _initEditor() {
    let _editor = new MediumEditor(this.element, get(this, 'options'));
    this._subscribeToEvents(_editor);
    this._setContent(_editor);

    set(this, '_editor', _editor);
  },

  _subscribeToEvents(editor) {
    mediumEditorEvents.forEach((event) => {
      let handler = get(this, event);
      if (typeof handler === 'function') {
        editor.subscribe(event, handler.bind(this));
      }
    });

    let onChangeHandler = get(this, 'onChange');
    if (typeof onChangeHandler === 'function') {
      editor.subscribe('editableInput', () => {
        onChangeHandler(editor.getContent());
      });
    }
  },

  _setContent(_editor = null) {
    let editor = _editor || get(this, '_editor');
    if (isPresent(editor)) {
      editor.setContent(get(this, 'value'));
    }
  },

  _setOptions() {
    let filteredOptions = optionsList.map((option) => (
      isPresent(get(this, option)) ? option : null
    ));
    filteredOptions = (new A(filteredOptions)).compact();

    let collectedOptions = getProperties(this, filteredOptions);
    let optionsHash = get(this, 'options');
    let options = Object.assign(
      {},
      defaultOptions,
      optionsHash,
      collectedOptions
    );

    set(this, 'options', options);
  },

  _destroyEditor() {
    let _editor = get(this, '_editor');
    if (isPresent(_editor)) {
      _editor.destroy();
    }
  }
});

MediumEditorComponent.reopenClass({
  positionalParams: ['value']
});

export default MediumEditorComponent;
