import Component from '@ember/component';
import MeExtensionMixin from 'ember-medium-editor/mixins/me-extension';
import layout from 'ember-medium-editor/templates/components/me-keyboard-commands';

const KEYBOARD_COMMANDS_OPTIONS = [
  'commands'
];

export default Component.extend(MeExtensionMixin, {
  layout,
  defaultOptions: KEYBOARD_COMMANDS_OPTIONS
});
