import Component from '@ember/component';
import MeExtensionMixin from 'ember-medium-editor/mixins/me-extension';

const ANCHOR_FORM_OPTIONS = [
  'customClassOption',
  'customClassOptionText',
  'linkValidation',
  'placeholderText',
  'targetCheckbox',
  'targetCheckboxText',
];

export default Component.extend(MeExtensionMixin, {
  defaultOptions: ANCHOR_FORM_OPTIONS
});
