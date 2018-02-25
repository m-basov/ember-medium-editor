import Component from '@ember/component';
import { computed } from '@ember/object';

const OESelect = Component.extend({
  tagName: '',

  value: null,
  controlId: '',
  disabled: false,
  options: computed(() => []),
  'on-change'() {}
});

OESelect.reopenClass({
  positionalParams: ['value']
});

export default OESelect;
