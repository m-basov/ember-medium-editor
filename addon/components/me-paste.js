import Component from '@ember/component';
import MeExtensionMixin from 'ember-medium-editor/mixins/me-extension';

const PASTE_OPTIONS = [
  'forcePlainText',    // true,
  'cleanPastedHTML',   // false,
  'cleanReplacements', // [],
  'cleanAttrs',        // ['class', 'style', 'dir'],
  'cleanTags',         // ['meta']
];

export default Component.extend(MeExtensionMixin, {
  defaultOptions: PASTE_OPTIONS
});
