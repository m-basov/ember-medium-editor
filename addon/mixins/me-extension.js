import Mixin from '@ember/object/mixin';
import { schedule } from '@ember/runloop';
import { invokeAction } from 'ember-invoke-action';
import createLogger from 'ember-medium-editor/utils/logger';
import createOptions from 'ember-medium-editor/utils/create-options';
import { set, get, getProperties, computed } from '@ember/object';
import { assert } from '@ember/debug';
import shallowEqual from 'ember-medium-editor/utils/shallow-equal';

const log = createLogger('mixin', 'me-extension');

export default Mixin.create({
  tagName: '',

  defaultOptions: computed(() => assert('You must override defaultOptions property')),
  registerExtension() {},

  init() {
    this._super(...arguments);
    this.scheduleRegisterExtension();
  },

  willDestroyElement() {
    this._super(...arguments);
    this.unregisterExtension();
  },

  scheduleRegisterExtension() {
    schedule('afterRender', () => {
      let options = this.createOptions();
      if (this._shouldRerender(options)) {
        log`scheduleRegisterExtension: ${options}`;
        invokeAction(this, 'registerExtension', options, { forceRerender: true });
      }
    });
  },

  unregisterExtension() {
    log`unregisterExtension`;
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
    let isNotEqual = !shallowEqual(options, instanceOptions);
    log`_shouldRerender: ${isNotEqual}`;
    return isNotEqual;
  }
});
