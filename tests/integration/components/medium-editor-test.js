import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';
import MediumEditor from 'medium-editor';

const meClass = '.medium-editor-element';

moduleForComponent('medium-editor', 'Integration | Component | medium editor', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{medium-editor}}`);

  assert.equal(find(meClass).innerHTML, '');
});

test('it sets initial value and updates it', function(assert) {
  assert.expect(2);

  this.set('tempValue', '<h1>Value</h1>');
  this.render(hbs`{{medium-editor tempValue}}`);

  assert.equal(find('h1').innerHTML, 'Value');

  this.set('tempValue', '<h2>New value</h2>');
  assert.equal(find('h2').innerHTML, 'New value');
});

test('it should trigger onChange action when content changed', function(assert) {
  assert.expect(1);

  this.on('onChange', (actual) => assert.equal(actual, '<p>typed</p>'));
  this.render(hbs`{{medium-editor onChange=(action "onChange")}}`);

  MediumEditor.getEditorFromElement(find(meClass)).setContent('<p>typed</p>');
});

test('it should pass options', function(assert) {
  assert.expect(1);

  this.set('meOptions', { placeholder: { text: 'placeholder' } });
  this.render(hbs`{{medium-editor options=meOptions}}`);

  assert.equal(find(meClass).getAttribute('data-placeholder'), 'placeholder');
});

test('it should accept "first class" options', function(assert) {
  assert.expect(1);

  this.set('placeholderOption', { text: 'test' });
  this.render(hbs`{{medium-editor placeholder=placeholderOption}}`);

  assert.equal(find(meClass).getAttribute('data-placeholder'), 'test');
});

test('it should accept options with correct priority', function(assert) {
  assert.expect(1);

  this.set('optionsHash', { placeholder: { text: 'hash' } });
  this.set('placeholderOption', { text: 'option' });
  this.render(hbs`{{medium-editor options=optionsHash placeholder=placeholderOption}}`);

  assert.equal(find(meClass).getAttribute('data-placeholder'), 'option');
});

test('it should not fire onChange callback if content did not change', function(assert) {
  assert.expect(0);

  this.on('onChange', () => assert.ok(true));
  this.set('value', 'old');
  this.render(hbs`{{medium-editor value onChange=(action "onChange")}}`);

  MediumEditor.getEditorFromElement(find(meClass)).setContent('old');
});

test('it should fire medium-editor events if passed', function(assert) {
  assert.expect(1);

  this.on('callback', () => assert.ok(true));
  this.render(hbs`{{medium-editor value editableInput=(action "callback")}}`);
  this.set('value', 'test');
});

test('it should fire onUserFinishedTyping event after 1 second', function(assert) {
  assert.expect(1);

  let done = assert.async();
  let start = new Date();

  this.on('callback', () => {
    let end = new Date();
    assert.ok(end.getTime() - start.getTime() >= 1000);
    done();
  });
  this.render(hbs`{{medium-editor value onUserFinishedTyping=(action "callback")}}`);
  this.set('value', 'new');
});

test('it should respect onUserFinishedTypingDelay option', function(assert) {
  assert.expect(1);

  let done = assert.async();
  let start = new Date();

  this.on('callback', () => {
    let end = new Date();
    assert.ok(end.getTime() - start.getTime() >= 2000);
    done();
  });
  this.render(hbs`
    {{medium-editor
        value
        onUserFinishedTyping=(action "callback")
        onUserFinishedTypingDelay=2000}}
  `);
  this.set('value', 'test');
});

test('it should destroy medium-editor instance when component destroyed', function(assert) {
  assert.expect(1);

  this.render(hbs`{{medium-editor}}`);
  this.clearRender();

  assert.equal(find(meClass), null);
});

test('it should not fire onUserFinishedTyping if component is destroyed', function(assert) {
  assert.expect(0);

  let done = assert.async();

  this.on('callback', () => assert.ok(true));
  this.render(hbs`{{medium-editor value onUserFinishedTyping=(action "callback")}}`);
  this.set('value', 'new');
  this.clearRender();

  setTimeout(done, 1100);
});
