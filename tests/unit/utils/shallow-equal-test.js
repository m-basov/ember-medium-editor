import shallowEqual from 'ember-medium-editor/utils/shallow-equal';
import { module, test } from 'qunit';

module('Unit | Utility | shallow-equal', function() {

  test('it works', function(assert) {
    assert.equal(shallowEqual({}, {}), true, 'empty objects');
    assert.equal(shallowEqual({}, undefined), false, 'object and literal');
    assert.equal(shallowEqual({ a: true }, { b: false }), false, 'object with different keys');
    assert.equal(shallowEqual({ a: true }, { a: false }), false, 'object with the same keys and different values');
    assert.equal(shallowEqual({ a: true }, { a: true }), true, 'object with the same keys and values');
    assert.equal(shallowEqual({ a: true, b: false }, { a: true, b: false }), true, 'object with multiple same keys and values');
    assert.equal(shallowEqual({ a: true, b: false }, { a: true, b: true}), false, 'object with multiple sam keys but different values');
  });
});
