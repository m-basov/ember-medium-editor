import Ember from 'ember';
import MediumEditor from 'medium-editor';

const {
  Component,
  set,
  get,
  isPresent
} = Ember;

// Options: https://github.com/yabwe/medium-editor/blob/master/OPTIONS.md
const defaultOptions = {};

// Events: https://github.com/yabwe/medium-editor/blob/master/CUSTOM-EVENTS.md
const mediumEditorEvents = [
  // custom events
  'addElement', 'blur', 'editableInput', 'externalInteraction',
  'focus', 'removeElement',
  // toolbar custom events
  'hideToolbar', 'positionToolbar', 'positionedToolbar', 'showToolbar',
  // proxied custom events
  'editableClick', 'editableBlur', 'editableKeypress', 'editableKeyup',
  'editableKeydown', 'editableKeydownEnter', 'editableKeydownTab',
  'editableKeydownDelete', 'editableKeydownSpace', 'editableMouseover',
  'editableDrag', 'editableDrop', 'editablePaste'
];

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

    this.options = defaultOptions;
  },

  didInsertElement() {
    this._super(...arguments);

    let _editor = new MediumEditor(this.element, get(this, 'options'));
    this._subscribeToEvents(_editor);
    this._setContent(_editor);

    set(this, '_editor', _editor);
  },

  willDestroyElement() {
    let _editor = get(this, '_editor');
    if (isPresent(_editor)) {
      _editor.destroy();
    }

    this._super(...arguments);
  },

  didReceiveAtrs() {
    this._super(...arguments);

    this._setContent();
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
        let content = get(this, '_editor').getContent();
        onChangeHandler(content);
      });
    }
  },

  _setContent(_editor = null) {
    let editor = _editor || get(this, '_editor');
    if (isPresent(editor)) {
      editor.setContent(get(this, 'value'));
    }
  }
});

MediumEditorComponent.reopenClass({
  positionalParams: ['value']
});

export default MediumEditorComponent;
