import Component from '@ember/component';
import MeExtensionMixin from 'ember-medium-editor/mixins/me-extension';

const PASTE_OPTIONS = [
  'forcePlainText',
  'cleanPastedHTML',
  'cleanReplacements',
  'cleanAttrs',
  'cleanTags',
  'unwrapTags'
];

export default Component.extend(MeExtensionMixin, {
  defaultOptions: PASTE_OPTIONS
});
