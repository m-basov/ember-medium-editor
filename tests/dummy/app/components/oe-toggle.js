import Component from '@ember/component';

const OEToggle = Component.extend({
  tagName: '',

  value: false,
  disabled: false,
  controlId: null,
  'on-change'() {}
});

OEToggle.reopenClass({
  positionalParams: ['value']
});

export default OEToggle;
