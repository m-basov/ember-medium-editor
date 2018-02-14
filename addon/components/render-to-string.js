import Component from '@ember/component';
import layout from 'ember-medium-editor/templates/components/render-to-string';
import { get, computed } from '@ember/object';
import { invokeAction } from 'ember-invoke-action';

export default Component.extend({
  tagName: '',
  layout,

  afterRender() {},

  destEl: computed({
    get() {
      return document.createElement('div');
    }
  }),

  didRender() {
    this._super(...arguments);
    this._extractHTML();
  },

  _extractHTML() {
    let destEl = get(this, 'destEl');
    invokeAction(this, 'afterRender', destEl.innerHTML);
  }
});
