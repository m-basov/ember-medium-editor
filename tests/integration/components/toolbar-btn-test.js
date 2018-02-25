import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | toolbar-btn', function(hooks) {
  setupRenderingTest(hooks);

  test('it should register button', async function(assert) {
    assert.expect(3);

    let customBtn = {
      'builtIn': false,
      'name': 'custom',
      'btnAction': 'bold',
      'aria': 'test',
      'tagNames': ['b', 'strong'],
      'style': 'font-weight: bold;',
      'useQueryState': true,
      'contentDefault': '<b>B</b>',
      'contentFA': '<i class="fa fa-icon-bold"></i>',
    };
    let iteration = 0;
    let expected = ['italic', 'bold'];

    this.setProperties({
      builtIn: 'italic',
      registerButton(btn) {
        if (btn.action) {
          assert.equal(btn.action, expected[iteration])
        } else {
          assert.ok(btn.id);
        }
        iteration++;
      }
    });

    await render(hbs`
      {{toolbar-btn
        registerButton=(action registerButton)
        builtIn=builtIn
        name=name
        btnAction=btnAction
        aria=aria
        tagNames=tagNames
        style=style
        useQueryState=useQueryState
        contentDefault=contentFA
        contentFA=contentFA}}
    `);

    this.setProperties(customBtn);
  });

  test('it should register button with template', async function(assert) {
    assert.expect(3);

    let iteration = 0;
    let expected = [
      '<i>Italic</i>',
      '<b>Bold</b>'
    ];

    this.setProperties({
      builtIn: 'italic',
      isItalic: true,
      registerButton(btn) {
        let content = expected[iteration];
        if (btn.contentDefault) {
          assert.equal(btn.contentDefault.trim(), content);
        } else {
          assert.ok(btn.id);
        }
        iteration++;
      }
    });

    await render(hbs`
      {{#toolbar-btn
        builtIn=builtIn
        registerButton=(action registerButton)}}
        {{#if isItalic}}
          <i>Italic</i>
        {{else}}
          <b>Bold</b>
        {{/if}}
      {{/toolbar-btn}}
    `);

    this.setProperties({
      builtIn: 'bold',
      isItalic: false
    });
  });
});
