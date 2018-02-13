import Component from '@ember/component';
import { get, computed } from '@ember/object';

export default Component.extend({
  name: '',
  option: computed(() => ({})),
  'on-change'() {},

  controlId: computed('elemendId', {
    get() {
      let id = get(this, 'elementId');
      return `oe-control-${id}`;
    }
  }),

  component: computed('option.component', 'value', {
    get() {
      let defaultComponent = get(this, 'option.component');
      if (defaultComponent) return defaultComponent;

      let value = get(this, 'value');
      if (Array.isArray(value)) return 'oe-tag-input';
      if (typeof value === 'boolean') return 'oe-toggle';
      return 'oe-input';
    }
  })
});
