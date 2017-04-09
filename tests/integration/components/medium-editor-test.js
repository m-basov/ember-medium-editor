import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find, fillIn } from 'ember-native-dom-helpers';
import { skip } from 'qunit';

moduleForComponent('medium-editor', 'Integration | Component | medium editor', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{medium-editor}}`);
  assert.equal(find('.medium-editor-element').innerHTML, '');
});

test('it sets initial value and updates it', function(assert) {
  assert.expect(1);

  this.render(hbs`{{medium-editor "<h1>Value</h1>"}}`);

  assert.equal(find('h1').innerHTML, 'Value');

  skip('value didUpdateAttrs test', function() {
    this.set('value', '<h2>New value</h2>');
    assert.equal(this.$('h2').text(), 'New value');
  });
});

skip('onChange action', function() {
  test('it should trigger onChange action when content changed', async function(assert) {
    assert.expect(1);

    this.set('onChange', (actual) => {
      assert.equal(actual, '<p>typed value</p>');
    });
    this.render(hbs`{{medium-editor onChange=(action onChange)}}`);

    await fillIn('.medium-editor-element', '<p>typed value</p>');
  });
});
