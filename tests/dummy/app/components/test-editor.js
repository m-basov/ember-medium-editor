import Component from '@ember/component';
import { get, set } from '@ember/object';
import mediumEditorOptions from './-medium-editor-options';
import { reads } from '@ember/object/computed';

let text = ``;

export default Component.extend({
  classNames: ['test-editor'],

  mediumEditorOptions,

  coreOptions: reads('mediumEditorOptions.core.options'),
  toolbarOptions: reads('mediumEditorOptions.toolbar.options'),
  anchorPreviewOptions: reads('mediumEditorOptions.anchorPreview.options'),
  anchorFormOptions: reads('mediumEditorOptions.anchorForm.options'),
  pasteOptions: reads('mediumEditorOptions.paste.options'),
  placeholderOptions: reads('mediumEditorOptions.placeholder.options'),
  autoLinkOptions: reads('mediumEditorOptions.autoLink.options'),
  imageDraggingOptions: reads('mediumEditorOptions.imageDragging.options'),
  keyboardCommandsOptions: reads('mediumEditorOptions.keyboardCommands.options'),

  text,

  actions: {
    preventDefault(e) {
      e.preventDefault();
      return false;
    },

    updateOption(section, option, value) {
      let mediumEditorOptions = get(this, 'mediumEditorOptions');
      let path = `${section}.options.${option}.value`;
      return set(mediumEditorOptions, path, value);
    }
  }
});
