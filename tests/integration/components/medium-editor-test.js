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

  this.set('onChange', (actual) => {
    assert.equal(actual, '<p>typed value</p>');
  });
  this.render(hbs`{{medium-editor onChange=(action onChange)}}`);

  let editor = MediumEditor.getEditorFromElement(find(meClass));
  editor.setContent('<p>typed value</p>');
});
