import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | me-keyboard-commands', function(hooks) {
  setupRenderingTest(hooks);

  test('it should register and unregister extension', async function(assert) {
    assert.expect(4);

    let iteration = 0;
    let expected = [
      // Extension is disabled
      false,
      // EXtension is enabled
      ['bold', 'italic']
      // Extension unregistered
    ];

    this.setProperties({
      commands: ['bold', 'italic'],
      disabled: true,
      registerExtension(kbd) {
        let expectedKbd = expected[iteration];
        if (kbd === undefined || typeof kbd === 'boolean') {
          assert.equal(kbd, expectedKbd);
        } else {
          kbd.commands.forEach((cmd, idx) => {
            assert.equal(expectedKbd[idx].name, cmd.name);
          });
        }
        iteration++;
      }
    });

    await render(hbs`
      {{#me-keyboard-commands
        disabled=disabled
        registerExtension=(action registerExtension)
        as |kbd|}}
        {{#each commands as |cmd|}}
          {{kbd.command
            command=cmd}}
        {{/each}}
      {{/me-keyboard-commands}}
    `);

    this.set('disabled', false);
  });
});
