import Component from '@ember/component';
import MeExtensionMixin from 'ember-medium-editor/mixins/me-extension';

const KEYBOARD_COMMANDS_OPTIONS = [
  'commands' /*[
      {
          command: 'bold',
          key: 'b',
          meta: true,
          shift: false
      },
      {
          command: 'italic',
          key: 'i',
          meta: true,
          shift: false
      },
      {
          command: 'underline',
          key: 'u',
          meta: true,
          shift: false
      }
  ]*/
];

export default Component.extend(MeExtensionMixin, {
  defaultOptions: KEYBOARD_COMMANDS_OPTIONS
});
