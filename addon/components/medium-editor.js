import Ember from 'ember';
import MediumEditor from 'medium-editor';

const {
  Component,
  set,
  get
} = Ember;

export default Component.extend({
  didInsertElement() {
    this._super(...arguments);

    let _editor = new MediumEditor(this.element, {
    });

    set(this, '_editor', _editor);
  },

  willDestroyElement() {
    let _editor = get(this, '_editor');
    if (_editor && typeof _editor.destroy === 'function') {
      _editor.destroy();
    }

    this._super(...arguments);
  }
});
