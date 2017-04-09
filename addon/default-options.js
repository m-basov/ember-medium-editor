import Ember from 'ember';

const { A } = Ember;

// Options: https://github.com/yabwe/medium-editor/blob/master/OPTIONS.md
export default {};

// List of "first class" options that can be passed directly to component
export const optionsList = new A([
  'delay', 'disableReturn', 'disableEditing', 'extensions', 'spellcheck',
  'targetBlank', 'toolbar', 'anchorPreview', 'placeholder', 'imageDragging'
]);
