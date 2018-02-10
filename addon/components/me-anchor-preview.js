import Component from '@ember/component';
import MeExtensionMixin from 'ember-medium-editor/mixins/me-extension';

const ANCHOR_PREVIEW_OPTIONS = [
  'hideDelay',            // 500,
  'previewValueSelector', // 'a'
];

export default Component.extend(MeExtensionMixin, {
  defaultOptions: ANCHOR_PREVIEW_OPTIONS
});
