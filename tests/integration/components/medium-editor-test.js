import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, clearRender } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import Service from '@ember/service';
import {
  fillInMediumEditor,
  triggerMediumEditorEvent,
  getMediumEditor,
  getMediumEditorExtension
} from 'ember-medium-editor/test-support';

module('Integration | Component | medium-editor', function(hooks) {
  setupRenderingTest(hooks);

  // 1. It updates options and rerenders
  test('it should rerender if options updated', async function(assert) {
    assert.expect(4);

    this.setProperties({
      buttonLabels: 'fontawesome',
      disabledToolbar: false
    });

    await render(hbs`
      {{#medium-editor
        buttonLabels=buttonLabels
        as |editor|}}
        {{editor.toolbar
          disabled=disabledToolbar}}
      {{/medium-editor}}
    `);

    assert.ok(getMediumEditorExtension('toolbar'));
    assert.equal(getMediumEditor().options.buttonLabels, 'fontawesome');

    this.setProperties({
      buttonLabels: false,
      disabledToolbar: true
    });

    assert.notOk(getMediumEditorExtension('toolbar'));
    assert.notOk(getMediumEditor().options.buttonLabels);
  });

  // 2. It destroys instance
  test('it should destroy medium-editor if component destroyed', async function(assert) {
    assert.expect(2);

    await render(hbs`
      {{medium-editor}}
    `);

    assert.ok(getMediumEditor());

    await clearRender();

    assert.throws(() => getMediumEditor(), /not found/);
  });

  // 3. It updates content
  test('it should update medium editor content', async function(assert) {
    assert.expect(2);

    this.set('text', 'Initial');

    await render(hbs`
      {{medium-editor text}}
    `);

    assert.equal(this.element.textContent.trim(), 'Initial');

    this.set('text', 'New');

    assert.equal(this.element.textContent.trim(), 'New');
  });

  // 4. It registers extensions
  test('it should register built-in extensions', async function(assert) {
    assert.expect(8);

    this.set('test', true);

    await render(hbs`
      {{#medium-editor as |editor|}}
        {{editor.toolbar static=true}}
        {{editor.anchor placeholderText="test"}}
        {{editor.anchor-preview hideDelay=300}}
        {{editor.placeholder text="test"}}
        {{editor.paste forcePlainText=false}}
        {{editor.keyboard-commands disabled=true}}
        {{editor.image-dragging false}}
        {{editor.auto-link true}}
      {{/medium-editor}}
    `);

    assert.ok(getMediumEditorExtension('toolbar').static);
    assert.equal(getMediumEditorExtension('anchor').placeholderText, 'test');
    assert.equal(getMediumEditorExtension('anchor-preview').hideDelay, 300);
    assert.equal(getMediumEditorExtension('paste').forcePlainText, false);
    assert.equal(getMediumEditorExtension('placeholder').text, 'test');
    assert.notOk(getMediumEditorExtension('keyboard-commands'));
    assert.notOk(getMediumEditor().options.imageDragging);
    assert.ok(getMediumEditorExtension('autoLink'));
  });

  // 5. It attaches events
  test('it should attach medium editor custom events with on prefix', async function(assert) {
    assert.expect(2);

    this.setProperties({
      onEditableInput() {
        assert.ok(true);
      },
      onEditableClick() {
        assert.ok(true);
      }
    });

    await render(hbs`
      {{medium-editor
        onEditableInput=(action onEditableInput)
        onEditableClick=(action onEditableClick)}}
    `);

    await triggerMediumEditorEvent('editableClick');
    await fillInMediumEditor('Some text');
  });

  // 6. It triggers onInput
  test('it should trigger onInput event with updated content', async function(assert) {
    assert.expect(1);

    this.setProperties({
      text: 'Test',
      onInput(text) {
        this.set('text', text);
        assert.equal(text, 'It works!');
      }
    });

    await render(hbs`
      {{medium-editor
        text
        onInput=(action onInput)}}
    `);

    await fillInMediumEditor('It works!');
  });

  // 7. It do not triggers onInput on initial render
  test('it should not trigger onInput on initial render', async function(assert) {
    assert.expect(0);

    this.setProperties({
      text: 'Text',
      onInput() {
        assert.ok(false);
      }
    });

    await render(hbs`
      {{medium-editor
        text
        onInput=(action onInput)}}
    `);
  });

  // 8. It do not renders on fastboot
  test('it should not create instance in fastboot', async function(assert) {
    assert.expect(1);

    this.owner.register('service:fastboot', Service.extend({ isFastBoot: true }));

    await render(hbs`
      {{#medium-editor as |editor|}}
        {{#editor.toolbar as |toolbar|}}
          {{#toolbar.italic}}
            <i>Italic</i>
          {{/toolbar.italic}}
        {{/editor.toolbar}}
        {{editor.anchor}}
        {{editor.anchor-preview}}
        {{editor.paste}}
        {{editor.placeholder}}
        {{editor.image-dragging}}
        {{editor.auto-link}}
        {{#editor.keyboard-commands as |kbd|}}
          {{kbd.command
            command="italic"
            meta=true}}
        {{/editor.keyboard-commands}}
      {{/medium-editor}}
    `);

    assert.throws(() => getMediumEditor(), /not found/);
  });
});
