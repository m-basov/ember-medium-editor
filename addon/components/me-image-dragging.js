import Component from '@ember/component';
import MeExtensionMixin from 'ember-medium-editor/mixins/me-extension';

const IMAGE_DRAGGING_OPTIONS = [
  'imageDragging' // false
];

export default Component.extend(MeExtensionMixin, {
  defaultOptions: IMAGE_DRAGGING_OPTIONS
});
