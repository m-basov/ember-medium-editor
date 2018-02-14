import Component from '@ember/component';
import MeExtensionMixin from 'ember-medium-editor/mixins/me-extension';

const PLACEHOLDER_OPTIONS = [
  'text',
  'hideOnClick'
];

export default Component.extend(MeExtensionMixin, {
  defaultOptions: PLACEHOLDER_OPTIONS
});
