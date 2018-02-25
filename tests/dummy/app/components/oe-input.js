import Component from '@ember/component';

const OEInput = Component.extend({
  tagName: '',

  type: 'text',
  value: undefined,
  disabled: false,
  controlId: null,
  'on-change'() {}
});

OEInput.reopenClass({
  positionalParams: ['value']
});

export default OEInput;
