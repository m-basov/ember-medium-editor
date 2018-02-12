import Component from '@ember/component';
import { get, computed } from '@ember/object';

const OEInput = Component.extend({
  label: 'Option',
  type: 'text',
  value: undefined,
  'on-change'() {},

  inputId: computed('elementId', {
    get() {
      let id = get(this, 'elementId');
      return `oe-input-${id}`;
    }
  })
});

OEInput.reopenClass({
  positionalParams: ['value']
});

export default OEInput;
