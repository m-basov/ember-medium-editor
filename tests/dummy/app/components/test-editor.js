import Component from '@ember/component';

export default Component.extend({
  show: true,

  init() {
    this._super(...arguments);

    // console.log('test-editor', this); // eslint-disable-line
  }
});
