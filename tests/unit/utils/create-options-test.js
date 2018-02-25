import createOptions from 'ember-medium-editor/utils/create-options';
import { module, test } from 'qunit';

module('Unit | Utility | create-options', function() {
  test('it returns nothing if result is empty', function(assert) {
    let result = createOptions({});
    assert.equal(result, undefined);
  });

  test('it removes empty keys from passed object', function(assert) {
    let result = createOptions({ empty: undefined, notEmpty: true });
    assert.deepEqual(result, { notEmpty: true });
  });

  test('it merges two objects if passed', function(assert) {
    let result = createOptions({ a: true, b: false, c: undefined }, { a: false });
    assert.deepEqual(result, { a: false, b: false });
  });

  test('it do not mutate passed objects', function(assert) {
    let defaults = { a: true, b: false };
    let overrides = { a: false, c: undefined };
    let result = createOptions(defaults, overrides);

    assert.deepEqual(result, { a: false, b: false });
    assert.deepEqual(defaults, { a: true, b: false });
    assert.deepEqual(overrides, { a: false, c: undefined });
  });
});
