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
      // EXtension is enabled
      ['bold', 'italic'],
      // Extension is disabled
      false
      // Extension unregistered
    ];

    this.setProperties({
      commands: ['bold', 'italic'],
      disabled: false,
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

    this.set('disabled', true);
  });
});
