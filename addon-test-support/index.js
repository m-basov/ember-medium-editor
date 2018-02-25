import { getRootElement, settled } from '@ember/test-helpers';
import { assert } from '@ember/debug';
import MediumEditor from 'medium-editor';

const EMBER_MEDIUM_EDITOR_SELECTOR = '.ember-medium-editor__container';

function nextTickPromise() {
  return new Promise((resolve) => {
    setTimeout(resolve);
  });
}

export function getMediumEditor(target) {
  if (!target) {
    target = getRootElement().querySelector(EMBER_MEDIUM_EDITOR_SELECTOR);
  }

  assert('MediumEditor element not found.', target);

  let editor = MediumEditor.getEditorFromElement(target);

  assert('MediumEditor instance not found.', editor);

  return editor;
}

export function getMediumEditorExtension(name, target) {
  assert(`You should provide extension name to getMediumEditorExtension('${name}').`, name);
  let editor = getMediumEditor(target);
  return editor.getExtensionByName(name);
}

export function fillInMediumEditor(text, target) {
  return nextTickPromise().then(() => {
    let editor = getMediumEditor(target);

    editor.setContent(text);

    return settled();
  });
}

export function triggerMediumEditorEvent(event, options = { data: undefined, editable: undefined }, target) {
  return nextTickPromise().then(() => {
    let editor = getMediumEditor(target);

    editor.trigger(event, options.data, options.editable);

    return settled();
  });
}
