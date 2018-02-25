import Component from '@ember/component';
import layout from 'ember-medium-editor/templates/components/me-image-dragging';
import { not } from '@ember/object/computed';

export default Component.extend({
  layout,
  tagName: '',

  enabled: true,
  disabled: not('enabled')
}).reopenClass({
  positionalParams: ['enabled']
});
