import Mixin from '@ember/object/mixin';
import { invokeAction } from 'ember-invoke-action';
import createOptions from 'ember-medium-editor/utils/create-options';
import { set, get, getProperties, computed } from '@ember/object';
import shallowEqual from 'ember-medium-editor/utils/shallow-equal';
import { reads } from '@ember/object/computed';
import { getOwner } from '@ember/application';

function addOrUpdate(arr, item) {
  let items = arr;
  let replaced = false;
  items = items.map((i) => {
    if (i.id === item.id) {
      replaced = true;
      return item;
    }
    return i;
  });
  if (!replaced) {
    items = [...items, item];
  }
  return items;
}

export default Mixin.create({
  tagName: '',

  enabled: true,
  registerExtension() {},

  defaultOptions: computed(() => []),

  disabled: computed('enabled', {
    get() {
      return !get(this, 'enabled');
    },
    set(key, value) {
      return set(this, 'enabled', !value);
    }
  }),

  fastboot: computed({
    get() {
      let owner = getOwner(this);
      return owner.lookup('service:fastboot');
    }
  }),

  isFastboot: reads('fastboot.isFastBoot'),

  didReceiveAttrs() {
    this._super(...arguments);
    this.register();
  },

  willDestroyElement() {
    this._super(...arguments);
    this.unregister();
  },

  register() {
    if (get(this, 'isFastboot')) return;

    let options = get(this, 'enabled');
    if (options) options = this.createOptions();
    if (this._shouldRerender(options)) {
      invokeAction(this, 'registerExtension', options, { forceRerender: true });
    }
  },

  unregister() {
    invokeAction(this, 'registerExtension', undefined);
  },

  createOptions() {
    let defaultOptions = get(this, 'defaultOptions');
    let options = getProperties(this, defaultOptions);
    return createOptions(options);
  },

  _shouldRerender(options) {
    let instanceOptions = get(this, '_instanceOptions');
    set(this, '_instanceOptions', options);
    return !shallowEqual(options, instanceOptions);
  },

  pushChild(key, child, options = {}) {
    let children = get(this, key) || [];
    if (options.remove) {
      children = children.filter((c) => c.id !== child.id);
    } else {
      children = addOrUpdate(children, child);
    }
    set(this, key, children);
    this.register();
  }
});
