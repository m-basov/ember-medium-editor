import Component from '@ember/component';
import layout from 'ember-medium-editor/templates/components/me-toolbar';
import { getProperties } from '@ember/object';
import createOptions from 'ember-medium-editor/utils/create-options';
import MeExtensionMixin from 'ember-medium-editor/mixins/me-extension';

const TOOLBAR_OPTIONS = [
  'allowMultiParagraphSelection',
  'buttons',
  'diffLeft',
  'diffTop',
  'firstButtonClass',
  'lastButtonClass',
  'relativeContainer',
  'standardizeSelectionStart',
  'static',
   /* options which only apply when static is true */
  'align',
  'sticky',
  'stickyTopOffset',
  'updateOnEmptySelection'
];


export default Component.extend(MeExtensionMixin, {
  layout,

  buttons: undefined,

  createOptions() {
    return createOptions(
      getProperties(this, TOOLBAR_OPTIONS)
    );
  }
});
