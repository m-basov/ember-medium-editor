import Component from '@ember/component';
import layout from 'ember-medium-editor/templates/components/render-to-string';
import { get, computed } from '@ember/object';
import { invokeAction } from 'ember-invoke-action';
import createLogger from 'ember-medium-editor/utils/logger';

const log = createLogger('component', 'render-to-string');

export default Component.extend({
  tagName: '',
  layout,

  shouldRender: true,
  destElTag: 'div',
  afterRender() {},

  destEl: computed('div', {
    get() {
      let tag = get(this, 'destElTag');
      return document.createElement(tag);
    }
  }),

  didRender() {
    this._super(...arguments);
    log`didRender`;
    this._extractHTML();
  },

  _extractHTML() {
    let destEl = get(this, 'destEl');
    log`_extractHTML: ${destEl.innerHTML}`;
    invokeAction(this, 'afterRender', destEl.innerHTML);
  }
});
