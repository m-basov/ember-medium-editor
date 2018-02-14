import Component from '@ember/component';
import createOptions from 'ember-medium-editor/utils/create-options';
import { get, getProperties, set, computed } from '@ember/object';
import { invokeAction } from 'ember-invoke-action';
import { guidFor } from '@ember/object/internals';

const COMMAND_OPTIONS = [
  'command',
  'key',
  'meta',
  'shift',
  'alt'
];

export default Component.extend({
  tagName: '',

  registerCommand() {},

  commandId: computed({
    get() {
      return guidFor(this);
    }
  }),

  commandOptions() {
    let command = createOptions(
      getProperties(this, COMMAND_OPTIONS),
      { id: get(this, 'commandId') }
    );
    return set(this, '_command', command);
  },

  init() {
    this._super(...arguments);
  },

  didReceiveAttrs() {
    this._super(...arguments);
    invokeAction(this, 'registerCommand', this.commandOptions());
  },

  willDestroyElement() {
    this._super(...arguments);
    let command = get(this, '_command');
    invokeAction(this, 'registerCommand', command, { remove: true });
  }
});
