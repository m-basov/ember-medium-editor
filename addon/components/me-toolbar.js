import Component from '@ember/component';
import layout from 'ember-medium-editor/templates/components/me-toolbar';
import { set, get, getProperties } from '@ember/object';
import createOptions from 'ember-medium-editor/utils/create-options';
import createLogger from 'ember-medium-editor/utils/logger';
import MeExtensionMixin from 'ember-medium-editor/mixins/me-extension';

const log = createLogger('component', 'me-toolbar');

/** These are the default options for the toolbar,
  * if nothing is passed this is what is used
  * https://github.com/yabwe/medium-editor/blob/master/OPTIONS.md#toolbar-options
  */
const TOOLBAR_OPTIONS = [
  'allowMultiParagraphSelection', // true,
  'buttons',                      // ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3', 'quote'],
  'diffLeft',                     // 0,
  'diffTop',                      // -10,
  'firstButtonClass',             // 'medium-editor-button-first',
  'lastButtonClass',              // 'medium-editor-button-last',
  'relativeContainer',            // null,
  'standardizeSelectionStart',    // false,
  'static',                       // false,
   /* options which only apply when static is true */
  'align',                        // 'center',
  'sticky',                       // false,
  'updateOnEmptySelection'        // false
];


export default Component.extend(MeExtensionMixin, {
  layout,

  _buttons: undefined,

  createOptions() {
    return createOptions(
      getProperties(this, TOOLBAR_OPTIONS),
      { buttons: get(this, '_buttons') }
    );
  },

  actions: {
    registerButton(btn, remove = false) {
      let buttons = get(this, '_buttons') || [];
      if (remove) {
        log`_registerButton:remove: ${btn}`;
        buttons = buttons.filter((b) => b.name !== btn.name);
      } else {
        log`_registerButton: ${btn}`;
        buttons = [...buttons, btn];
      }
      set(this, '_buttons', buttons);

      this.scheduleRegisterExtension();
    }
  }
});
