import Component from '@ember/component';
import { get, computed } from '@ember/object';
import { isBlank } from '@ember/utils';
import { A } from '@ember/array';

const OETagInput = Component.extend({
  tagName: '',

  internalOptions: computed(() => new A()),

  value: computed(() => []),
  controlId: null,
  disabled: false,
  'on-change'() {},

  actions: {
    createOnEnter(select, e) {
      if (e.keyCode === 13 && select.isOpen &&
        !select.highlighted && !isBlank(select.searchText)) {

        let selected = get(this, 'value');
        if (!selected.includes(select.searchText)) {
          get(this, 'internalOptions').pushObject(select.searchText);
          select.actions.choose(select.searchText);
        }
      }
    }
  }
});

OETagInput.reopenClass({
  positionalParams: ['value']
});

export default OETagInput;
