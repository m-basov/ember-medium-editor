import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | me-extension-child', function(hooks) {
  setupRenderingTest(hooks);

  test('it generates id for each option', async function(assert) {
    let iteration = 0;
    let expected = [
      // initial set
      [{ name: 'bold' }],
      // set after change
      [{ name: 'italic' }],
      // teardown set
      [{}, { remove: true }]
    ];

    this.setProperties({
      name: 'bold',
      register(child, options) {
        let [expectedChild, expectedOptions] = expected[iteration];
        // assign id to expected id
        expectedChild.id = child.id;
        // and check if ID is non-falsy
        assert.ok(child.id);
        // compare expected options with actual
        assert.deepEqual(child, expectedChild);
        assert.deepEqual(options, expectedOptions);
        // move to the next step
        iteration++;
      }
    });

    await render(hbs`
      {{me-extension-child
        register=(action register)
        options=(hash
          name=name
        )}}
    `);

    this.set('name', 'italic');
  });

  test('it should add extra options', async function(assert) {
    let iteration = 0;
    let expected = [
      // initial set
      { name: 'bold' },
      // set with extra options
      { name: 'bold', command: 'cut' }
    ];

    this.set('register', function(child, options) {
      // skip teardown set
      if (!options) {
        let expectedChild = expected[iteration];
        expectedChild.id = child.id;
        assert.deepEqual(child, expectedChild);
        iteration++;
      }
    });

    await render(hbs`
      {{#me-extension-child
        register=(action register)
        options=(hash
          name="bold"
        ) as |child|}}
        <button id="test-btn" onclick={{action child.addOption "command" "cut"}}>
          Test
        </button>
      {{/me-extension-child}}
    `);
    await click('#test-btn');
  });
});
