import Mixin from '@ember/object/mixin';
import { schedule } from '@ember/runloop';
import { invokeAction } from 'ember-invoke-action';
import createLogger from 'ember-medium-editor/utils/logger';
import createOptions from 'ember-medium-editor/utils/create-options';
import { get, getProperties, computed } from '@ember/object';
import { assert } from '@ember/debug';

const log = createLogger('mixin', 'me-extension');

export default Mixin.create({
  tagName: '',

  defaultOptions: computed(() => assert('You must override defaultOptions property')),
  registerExtension() {},

  init() {
    this._super(...arguments);
    this.scheduleRegisterExtension();
  },

  scheduleRegisterExtension() {
    schedule('afterRender', () => {
      let options = this.createOptions();
      log`scheduleRegisterExtension: ${options}`;
      invokeAction(this, 'registerExtension', options);
    });
  },

  createOptions() {
    let defaultOptions = get(this, 'defaultOptions');
    let options = getProperties(this, defaultOptions);
    return createOptions(options);
  }
});
