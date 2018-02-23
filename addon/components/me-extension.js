import Component from '@ember/component';
import layout from '../templates/components/me-extension';
import { invokeAction } from 'ember-invoke-action';
import createOptions from 'ember-medium-editor/utils/create-options';
import { set, get, getProperties, computed } from '@ember/object';
import shallowEqual from 'ember-medium-editor/utils/shallow-equal';
import { not } from '@ember/object/computed';
import { scheduleOnce } from '@ember/runloop';

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

export default Component.extend({
  layout,
  tagName: '',

  registerExtension() {},

  options: computed(() => ({})),

  hasBlock: false,
  disabled: false,

  enabled:  not('disabled'),

  _includeOptions: computed(() => []),

  didReceiveAttrs() {
    this._super(...arguments);
    this._scheduleRegister();
  },

  willDestroyElement() {
    this._super(...arguments);
    this._unregister();
  },

  pushChild(key, child, options = {}) {
    let children = get(this, key) || [];
    this._addIncludeOptions(key);
    if (options.remove) {
      children = children.filter((c) => c.id !== child.id);
    } else {
      children = addOrUpdate(children, child);
    }
    set(this, key, children);
    this._scheduleRegister();
  },

  _addIncludeOptions(key) {
    let includeOptions = get(this, '_includeOptions');
    if (!includeOptions.includes(key)) includeOptions.push(key);
  },

  _scheduleRegister() {
    if (!get(this, 'hasBlock')) return this._register();
    scheduleOnce('afterRender', this, '_register');
  },

  _register() {
    let options = get(this, 'enabled');
    if (options) options = this._createOptions();
    if (this._shouldRerender(options)) {
      invokeAction(this, 'registerExtension', options, { forceRerender: true });
    }
  },

  _unregister() {
    // replace `pushChild` method with NoOp as it should not be called
    // after unregistering extension
    set(this, 'pushChild', () => {});
    invokeAction(this, 'registerExtension', undefined);
  },

  _createOptions() {
    let options = get(this, 'options');
    let includeOptions = getProperties(this, get(this, '_includeOptions'));
    return createOptions(options, includeOptions);
  },

  _shouldRerender(options) {
    let instanceOptions = get(this, '_instanceOptions');
    set(this, '_instanceOptions', options);
    return !shallowEqual(options, instanceOptions);
  }
});
