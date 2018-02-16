import Component from '@ember/component';
import layout from 'ember-medium-editor/templates/components/me-toolbar';
import { computed } from '@ember/object';

export default Component.extend({
  layout,
  tagName: '',

  includeOptions: computed(() => ['buttons'])
});
