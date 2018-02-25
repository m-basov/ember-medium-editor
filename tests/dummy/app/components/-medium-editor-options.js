// Make FastBoot happy
let w = window ? window : {};

/**
 * Create option for configurator
 */
function createOption(name, value, hint, others = {}) {
  return {
    [name]: {
      value,
      hint,
      disabled: typeof others.disabled === 'boolean' ? others.disabled : false,
      default: typeof others.default !== 'undefined' ? others.default : value,
      component: others.component,
      availableValues: others.availableValues
    }
  };
}

/**
 * Original document:
 * https://github.com/yabwe/medium-editor/blob/master/OPTIONS.md#anchor-preview-options
 */
export default {
  core: {
    description: 'These are global options that apply to the entire editor.',
    options: {
      ...createOption(
        'activeButtonClass',
        'medium-editor-button-active',
        'CSS class added to active buttons in the toolbar.'
      ),
      ...createOption(
        'buttonLabels',
        'false',
        `Custom content for the toolbar buttons. Valid Values: false Use default button labels 'fontawesome'Uses fontawesome icon set for all toolbar icons NOTE: Using 'fontawesome' as the buttonLabels requires version 4.1.0 of the fontawesome css to be on the page to ensure all icons will be displayed correctly.`,
        { component: 'oe-select', availableValues: ['false', 'fontawesome'] }
      ),
      ...createOption(
        'contentWindow',
        w,
        'The contentWindow object that contains the contenteditable element. MediumEditor will use this for attaching events, getting selection, etc.',
        { disabled: true }
      ),
      ...createOption(
        'delay',
        0,
        'Time in milliseconds to show the toolbar or anchor tag preview.'
      ),
      ...createOption(
        'disableReturn',
        false,
        'Enables/disables the use of the return-key. You can also set specific element behavior by using setting a data-disable-return attribute.'
      ),
      ...createOption(
        'disableDoubleReturn',
        false,
        'Allows/disallows two (or more) empty new lines. You can also set specific element behavior by using setting a data-disable-double-return attribute.'
      ),
      ...createOption(
        'disableExtraSpaces',
        false,
        'When set to true, it disallows spaces at the beginning and end of the element. Also it disallows entering 2 consecutive spaces between 2 words.'
      ),
      ...createOption(
        'disableEditing',
        false,
        'Enables/disables adding the contenteditable behavior. Useful for using the toolbar with customized buttons/actions. You can also set specific element behavior by using setting a data-disable-editing attribute.'
      ),
      ...createOption(
        'elementsContainer',
        false,
        `Specifies a DOM node to contain MediumEditor's toolbar and anchor preview elements.`,
        { disabled: true, default: 'ownerDocument.body', component: 'oe-input' }
      ),
      ...createOption(
        'ownerDocument',
        w.document,
        'The ownerDocument object for the contenteditable element. MediumEditor will use this for creating elements, getting selection, attaching events, etc.',
        { disabled: true }
      ),
      ...createOption(
        'spellcheck',
        true,
        'Enable/disable native contentEditable automatic spellcheck.'
      ),
      ...createOption(
        'targetBlank',
        false,
        'Enables/disables automatically adding the target="_blank" attribute to anchor tags.'
      )
    }
  },
  toolbar: {
    description: 'The toolbar for MediumEditor is implemented as a built-in extension which automatically displays whenever the user selects some text. The toolbar can hold any set of defined built-in buttons, but can also hold any custom buttons passed in as extensions.',
    options: {
      ...createOption(
        'allowMultiParagraphSelection',
        true,
        'enables/disables whether the toolbar should be displayed when selecting multiple paragraphs/block elements.'
      ),
      ...createOption(
        'buttons',
        ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3', 'quote'],
        'The set of buttons to display on the toolbar.'
      ),
      ...createOption(
        'diffLeft',
        0,
        'Value in pixels to be added to the X axis positioning of the toolbar.'
      ),
      ...createOption(
        'diffTop',
        -10,
        'Value in pixels to be added to the Y axis positioning of the toolbar.'
      ),
      ...createOption(
        'firstButtonClass',
        'medium-editor-button-first',
        'CSS class added to the first button in the toolbar.'
      ),
      ...createOption(
        'lastButtonClass',
        'medium-editor-button-last',
        'CSS class added to the last button in the toolbar.'
      ),
      ...createOption(
        'relativeContainer',
        null,
        'DOMElement to append the toolbar to instead of the body. When an element is passed the toolbar will also be positioned relative instead of absolute, which means the editor will not attempt to manually position the toolbar automatically. NOTE: Using this in combination with the static option for toolbar is not explicitly supported and the behavior in this case is not defined.',
        { disabled: true }
      ),
      ...createOption(
        'standardizeSelectionStart',
        false,
        'Enables/disables standardizing how the beginning of a range is decided between browsers whenever the selected text is analyzed for updating toolbar buttons status.'
      ),
      ...createOption(
        'static',
        false,
        'Enable/disable the toolbar always displaying in the same location relative to the medium-editor element.'
      ),
      /* options which only apply when static is true */
      ...createOption(
        'align',
        'center',
        'When the static option is true, this aligns the static toolbar relative to the medium-editor element.',
        { availableValues: ['left', 'center', 'right'], component: 'oe-select' }
      ),
      ...createOption(
        'sticky',
        false,
        'When the static option is true, this enables/disables the toolbar "sticking" to the viewport and staying visible on the screen while the page scrolls.'
      ),
      ...createOption(
        'stickyTopOffset',
        0,
        'When the sticky option is true, this set in pixel a top offset above the toolbar.'
      ),
      ...createOption(
        'updateOnEmptySelection',
        false,
        'When the static option is true, this enables/disables updating the state of the toolbar buttons even when the selection is collapsed (there is no selection, just a cursor).'
      ),
      ...createOption(
        'disabled',
        false,
        'Disable toolbar completely.'
      )
    }
  },
  anchorPreview: {
    description: `The anchor preview is a built-in extension which automatically displays a 'tooltip' when the user is hovering over a link in the editor. The tooltip will display the href of the link, and when click, will open the anchor editing form in the toolbar.`,
    options: {
      ...createOption(
        'hideDelay',
        500,
        'Time in milliseconds to show the anchor tag preview after the mouse has left the anchor tag.'
      ),
      ...createOption(
        'previewValueSelector',
        'a',
        `The default selector to locate where to put the activeAnchor value in the preview. You should only need to override this if you've modified the way in which the anchor-preview extension renders.`
      ),
      ...createOption(
        'showOnEmptyLinks',
        true,
        'Determines whether the anchor tag preview shows up on link with href as "" or "#something". You should set this value to false if you do not want the preview to show up in such use cases.'
      ),
      ...createOption(
        'showWhenToolbarIsVisible',
        false,
        'Determines whether the anchor tag preview shows up when the toolbar is visible. You should set this value to true if the static option for the toolbar is true and you want the preview to show at the same time.'
      ),
      ...createOption(
        'disabled',
        false,
        'Disable Anchor Preview extension.'
      )
    }
  },
  placeholder: {
    description: 'The placeholder handler is a built-in extension which displays placeholder text when the editor is empty.',
    options: {
      ...createOption(
        'text',
        'Type your text',
        'Defines the default placeholder for empty contenteditables when placeholder is not set to false. You can overwrite it by setting a data-placeholder attribute on the editor elements.'
      ),
      ...createOption(
        'hideOnClick',
        true,
        'Causes the placeholder to disappear as soon as the field gains focus. To hide the placeholder only after starting to type, and to show it again as soon as field is empty, set this option to false.'
      ),
      ...createOption(
        'disabled',
        false,
        'Disable Placeholder extension.'
      )
    }
  },
  anchorForm: {
    description: `The anchor form is a built-in button extension which allows the user to add/edit/remove links from within the editor. When 'anchor' is passed in as a button in the list of buttons, this extension will be enabled and can be triggered by clicking the corresponding button in the toolbar.`,
    options: {
      ...createOption(
        'customClassOption',
        null,
        `Custom class name the user can optionally have added to their created links (ie 'button'). If passed as a non-empty string, a checkbox will be displayed allowing the user to choose whether to have the class added to the created link or not.`
      ),
      ...createOption(
        'customClassOptionText',
        'Button',
        'Text to be shown in the checkbox when the customClassOption is being used.'
      ),
      ...createOption(
        'linkValidation',
        false,
        'Enables/disables check for common URL protocols on anchor links. Converts invalid url characters (ie spaces) to valid characters using encodeURI'
      ),
      ...createOption(
        'placeholderText',
        'Paste or type a link',
        'Text to be shown as placeholder of the anchor input.'
      ),
      ...createOption(
        'targetCheckbox',
        false,
        'Enables/disables displaying a "Open in new window" checkbox, which when checked changes the target attribute of the created link.'
      ),
      ...createOption(
        'targetCheckboxText',
        'Open in new window',
        'Text to be shown in the checkbox enabled via the targetCheckbox option.'
      ),
      ...createOption(
        'disabled',
        false,
        'Disable Anchor Form extension.'
      )
    }
  },
  paste: {
    description: 'The paste handler is a built-in extension which attempts to filter the content when the user pastes. How the paste handler filters is configurable via specific options.',
    options: {
      ...createOption(
        'forcePlainText',
        true,
        'Forces pasting as plain text.'
      ),
      ...createOption(
        'cleanPastedHTML',
        false,
        'Cleans pasted content from different sources, like google docs etc.'
      ),
      ...createOption(
        'cleanReplacements',
        [],
        'Custom pairs (2 element arrays) of RegExp and replacement text to use during paste when forcePlainText or cleanPastedHTML are true OR when calling cleanPaste(text) helper method.'
      ),
      ...createOption(
        'cleanAttrs',
        ['class', 'style', 'dir'],
        'List of element attributes to remove during paste when cleanPastedHTML is true or when calling cleanPaste(text) or pasteHTML(html,options) helper methods.'
      ),
      ...createOption(
        'cleanTags',
        ['meta'],
        'List of element tag names to remove during paste when cleanPastedHTML is true or when calling cleanPaste(text) or pasteHTML(html,options) helper methods.'
      ),
      ...createOption(
        'unwrapTags',
        [],
        'List of element tag names to unwrap (remove the element tag but retain its child elements) during paste when cleanPastedHTML is true or when calling cleanPaste(text) or pasteHTML(html,options) helper methods.'
      ),
      ...createOption(
        'disabled',
        false,
        'Disable Paste Extension'
      )
    }
  },
  keyboardCommands: {
    description: 'The keyboard commands handler is a built-in extension for mapping key-combinations to actions to execute in the editor.',
    options: {
      ...createOption(
        'commands',
        [
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
        'Array of objects describing each command and the combination of keys that will trigger it. Required for each object: command: argument passed to editor.execAction() when key-combination is used key: keyboard character that triggers this command meta: whether the ctrl/meta key has to be active or inactive shift: whether the shift key has to be active or inactive',
        { disabled: true, 'component': 'oe-input', default: 'shortcuts for bold, italic, and underline' }
      ),
      ...createOption(
        'disabled',
        false,
        'Disable Keyboard Commands Extension.'
      )
    }
  },
  autoLink: {
    description: 'The auto-link handler is a built-in extension which automatically turns URLs entered into the text field into HTML anchor tags (similar to the functionality of Markdown). This feature is OFF by default.',
    options: {
      ...createOption(
        'disabled',
        true,
        'Disable Auto Link Extension.'
      )
    }
  },
  imageDragging: {
    description: 'The image dragging handler is a built-in extension for handling dragging & dropping images into the contenteditable. This feature is ON by default.',
    options: {
      ...createOption(
        'disabled',
        false,
        'Disable Image Dragging Extension.'
      )
    }
  }
};
