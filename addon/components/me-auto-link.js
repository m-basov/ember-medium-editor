import Component from '@ember/component';
import layout from 'ember-medium-editor/templates/components/me-auto-link';
import { not } from '@ember/object/computed';

export default Component.extend({
  layout,
  tagName: '',

  enabled: false,
  disabled: not('enabled')
}).reopenClass({
  positionalParams: ['enabled']
});
