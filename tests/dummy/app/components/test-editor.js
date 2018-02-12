import Component from '@ember/component';
import { computed } from '@ember/object';

const CORE_OPTIONS = {
  activeButtonClass: 'medium-editor-button-active',
  buttonLabels: false,
  contentWindow: window,
  delay: 0,
  disableReturn: false,
  disableDoubleReturn: false,
  disableExtraSpaces: false,
  disableEditing: false,
  elementsContainer: false,
  extensions: {},
  ownerDocument: document,
  spellcheck: true,
  targetBlank: false
};

const TOOLBAR_OPTIONS = {
  allowMultiParagraphSelection: true,
  buttons: ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3', 'quote'],
  diffLeft: 0,
  diffTop: -10,
  firstButtonClass: 'medium-editor-button-first',
  lastButtonClass: 'medium-editor-button-last',
  relativeContainer: null,
  standardizeSelectionStart: false,
  static: false,
  /* options which only apply when static is true */
  align: 'center',
  sticky: false,
  updateOnEmptySelection: false
};

const ANCHOR_PREVIEW_OPTIONS = {
  hideDelay: 500,
  previewValueSelector: 'a',
  disabled: false
};

const PLACEHOLDER_OPTIONS = {
  text: 'Type your text',
  hideOnClick: true,
  disabled: false
};

const ANCHOR_FORM_OPTIONS = {
  customClassOption: null,
  customClassOptionText: 'Button',
  linkValidation: false,
  placeholderText: 'Paste or type a link',
  targetCheckbox: false,
  targetCheckboxText: 'Open in new window',
  disabled: false
};

const PASTE_OPTIONS = {
  forcePlainText: true,
  cleanPastedHTML: false,
  cleanReplacements: [],
  cleanAttrs: ['class', 'style', 'dir'],
  cleanTags: ['meta'],
  disabled: false
};

const KEYBOARD_COMMANDS_OPTIONS = {
  commands: [
    {
        command: 'bold',
        key: 'b',
        meta: true,
        shift: false
    },
    {
        command: 'italic',
        key: 'i',
        meta: true,
        shift: false
    },
    {
        command: 'underline',
        key: 'u',
        meta: true,
        shift: false
    }
  ],
  disabled: false
};

const AUTO_LINK_OPTIONS = false;
const IMAGE_DRAGGING_OPTIONS = false;

export default Component.extend({
  coreOptions: computed(() => CORE_OPTIONS),
  toolbarOptions: computed(() => TOOLBAR_OPTIONS),
  anchorPreviewOptions: computed(() => ANCHOR_PREVIEW_OPTIONS),
  placeholderOptions: computed(() => PLACEHOLDER_OPTIONS),
  anchorFormOptions: computed(() => ANCHOR_FORM_OPTIONS),
  pasteOptions: computed(() => PASTE_OPTIONS),
  keyboardCommandsOptions: computed(() => KEYBOARD_COMMANDS_OPTIONS),
  autoLinkOptions: AUTO_LINK_OPTIONS,
  imageDraggingOptions: IMAGE_DRAGGING_OPTIONS,

  actions: {
    preventDefault(e) {
      e.preventDefault();
      return false;
    }
  }
});
