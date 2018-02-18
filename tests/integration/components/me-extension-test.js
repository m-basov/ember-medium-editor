import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | me-extension', function(hooks) {
  setupRenderingTest(hooks);

  test('it registers extension after attrs received', async function(assert) {
    assert.expect(6);

    let iteration = 0;
    let expected = [
      // initial set of options
      { options: { static: true, sticky: false }, props: { forceRerender: true }},
      // changed set
      { options: { static: false, sticky: false }, props: { forceRerender: true }},
      // teardown set
      {}
    ];

    this.setProperties({
      static: true,
      sticky: false,
      registerExtension(options, props) {
        assert.deepEqual(options, expected[iteration].options);
        assert.deepEqual(props, expected[iteration].props);
        iteration++;
      }
    });

    await render(hbs`
      {{me-extension
        registerExtension=(action registerExtension)
        options=(hash
          static=static
          sticky=sticky
        )}}
    `);

    this.set('static', false);
  });

  test('it should return false if disabled', async function(assert) {
    let iteration = 0;
    let expected = [
      // initial set is disabled
      false,
      // next set is not disabled
      { static: true }
      // terdown set is undefined
    ];

    this.setProperties({
      disabled: true,
      static: true,
      registerExtension(options) {
        assert.deepEqual(options, expected[iteration]);
        iteration++;
      }
    });

    await render(hbs`
      {{me-extension
        registerExtension=(action registerExtension)
        disabled=disabled
        options=(hash
          static=static
        )}}
    `);

    this.set('disabled', false);
  });

  test('it should expose pushChild method', async function(assert) {
    assert.expect(4);

    let iteration = 0;
    let children = [
      [{ id: 1, name: 'bold' }],
      [{ id: 2, name: 'italic' }],
      [{ id: 1, name: 'underline' }],
      [{ id: 2 }, { remove: true }]
    ];
    let expected = [
      [{ id: 1, name: 'bold' }],
      [{ id: 1, name: 'bold'}, { id: 2, name: 'italic' }],
      [{ id: 1, name: 'underline' }, { id: 2, name: 'italic' }],
      [{ id: 1, name: 'underline' }]
    ];

    this.setProperties({
      registerExtension(options) {
        // test only pushChild cases and skip initial register and teradown
        if (options && options.buttons) {
          assert.deepEqual(options, {
            test: true,
            buttons: expected[iteration]
          });
        }
      },
      pushChildWrapper(action) {
        action('buttons', ...children[iteration]);
      }
    });

    await render(hbs`
      {{#me-extension
        registerExtension=registerExtension
        options=(hash
          test=true
        )
        as |ext|}}
        <button id="test-btn" onclick={{action pushChildWrapper ext.pushChild}}>
          Test
        </button>
      {{/me-extension}}
    `);
    // 1. On this click button `bold` will be added to buttons
    await click('#test-btn');
    iteration++;
    // 2. Next we are adding one more button `italic`. Now there are 2 buttons
    await click('#test-btn');
    iteration++;
    // 3. Now we are changing `bold` button to `underline` and we still having 2 buttons
    await click('#test-btn');
    iteration++;
    // 4. Finally we are removing `italic` button and there are only `underline`
    await click('#test-btn');
  });
});
