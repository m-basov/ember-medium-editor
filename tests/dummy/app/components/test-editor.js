import Component from '@ember/component';
import { later } from '@ember/runloop';

export default Component.extend({
  show: true,

  init() {
    this._super(...arguments);

    later(() => this.set('show', false), 3000);
  }
});
