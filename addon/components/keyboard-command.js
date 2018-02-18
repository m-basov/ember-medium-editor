import Component from '@ember/component';
import { invokeAction } from 'ember-invoke-action';
import layout from 'ember-medium-editor/templates/components/keyboard-command';

export default Component.extend({
  layout,
  tagName: '',

  registerCommand() {},

  _register(cmd) {
    invokeAction(this, 'registerCommand', cmd);
  }
});
