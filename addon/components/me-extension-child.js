import Component from '@ember/component';
import { invokeAction } from 'ember-invoke-action';
import { get, set, computed, getProperties } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import createOptions from 'ember-medium-editor/utils/create-options';
import layout from 'ember-medium-editor/templates/components/me-extension-child';

export default Component.extend({
  layout,
  tagName: '',

  options: computed(() => ({})),
  register() {},

  _extraOptions: computed(() => []),

  childId: computed({
    get() {
      return guidFor(this);
    }
  }),

  didReceiveAttrs() {
    this._super(...arguments);
    this._register();
  },

  willDestroyElement() {
    this._super(...arguments);
    invokeAction(this, 'register', { id: get(this, 'childId') }, { remove: true });
  },

  addOption(key, val) {
    this._includeOption(key);
    set(this, key, val);
    this._register();
  },

  _createOptions() {
    return createOptions(
      get(this, 'options'),
      {
        id: get(this, 'childId'),
        ...getProperties(this, get(this, '_extraOptions'))
      }
    );
  },

  _register() {
    invokeAction(this, 'register', this._createOptions());
  },

  _includeOption(key) {
    let extraOptions = get(this, '_extraOptions');
    if (!extraOptions.includes(key)) {
      extraOptions.push(key);
    }
  }
});
