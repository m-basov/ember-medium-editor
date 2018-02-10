import Component from '@ember/component';
import MeExtensionMixin from 'ember-medium-editor/mixins/me-extension';

const ANCHOR_FORM_OPTIONS = [
  'customClassOption',     // null,
  'customClassOptionText', // 'Button',
  'linkValidation',        // false,
  'placeholderText',       // 'Paste or type a link',
  'targetCheckbox',        // false,
  'targetCheckboxText',    // 'Open in new window'
];

export default Component.extend(MeExtensionMixin, {
  defaultOptions: ANCHOR_FORM_OPTIONS
});
