import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | keyboard-command', function(hooks) {
  setupRenderingTest(hooks);

  test('it should register command', async function(assert) {
    assert.expect(6);

    let bold = {
      command: 'bold',
      key: 'B',
      meta: true,
      shift: false,
      alt: false
    };
    let italic = {
      command: 'italic',
      key: 'I',
      meta: false,
      shift: true,
      alt: true
    };
    let iteration = 0;
    let expected = [bold, italic, {}];

    this.setProperties({
      ...bold,
      registerCommand(cmd) {
        let expectedCmd = expected[iteration];

        expectedCmd.id = cmd.id;

        assert.ok(expectedCmd.id);
        assert.deepEqual(cmd, expectedCmd);

        iteration++;
      }
    });

    await render(hbs`
      {{keyboard-command
        registerCommand=(action registerCommand)
        command=command
        key=key
        meta=meta
        shift=shift
        alt=alt}}
    `);

    this.setProperties(italic);
  });
});
