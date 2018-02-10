import Component from '@ember/component';
import MeExtensionMixin from 'ember-medium-editor/mixins/me-extension';

const AUTO_LINK_OPTIONS = [
  'autoLink' // true
];

export default Component.extend(MeExtensionMixin, {
  defaultOptions: AUTO_LINK_OPTIONS
});
