import Component from '@ember/component';
import layout from 'ember-medium-editor/templates/components/me-keyboard-commands';
import { computed } from '@ember/object';

export default Component.extend({
  layout,
  tagName: '',

  includeOptions: computed(() => ['commands'])
});
