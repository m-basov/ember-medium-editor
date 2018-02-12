import Component from '@ember/component';
import { get, computed } from '@ember/object';

const OEToggle = Component.extend({
  value: false,
  label: 'Option toggle',
  'on-toggle'() {},

  toggleId: computed('elementId', {
    get() {
      let id = get(this, 'elementId');
      return `oe-toggle-${id}`;
    }
  })
});

OEToggle.reopenClass({
  positionalParams: ['value']
});

export default OEToggle;
