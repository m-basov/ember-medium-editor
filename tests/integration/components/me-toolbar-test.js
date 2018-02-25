import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | me-toolbar', function(hooks) {
  setupRenderingTest(hooks);

  test('it should register toolbar', async function(assert) {
    assert.expect(4);

    let iteration = 0;
    let expected = [
      ['bold', 'italic'],
      false
    ];

    this.setProperties({
      disabled: false,
      buttons: ['bold', 'italic'],
      registerExtension(toolbar) {
        let expectedToolbar = expected[iteration];
        if (toolbar === undefined || typeof toolbar === 'boolean') {
          assert.equal(expectedToolbar, toolbar);
        } else {
          toolbar.buttons.forEach((btn, idx) => {
            assert.equal(btn.name, expectedToolbar[idx]);
          });
        }
        iteration++;
      }
    });

    await render(hbs`
      {{#me-toolbar
        disabled=disabled
        registerExtension=(action registerExtension)
        allowMultiParagraphSelection=allowMultiParagraphSelection
        diffLeft=diffLeft
        diffTop=diffTop
        firstButtonClass=firstButtonClass
        lastButtonClass=lastButtonClass
        relativeContainer=relativeContainer
        standardizeSelectionStart=standardizeSelectionStart
        static=static
        align=align
        sticky=sticky
        stickyTopOffset=stickyTopOffset
        updateOnEmptySelection=updateOnEmptySelection
        as |toolbar|}}
        {{#each buttons as |btn|}}
          {{component (get toolbar btn)}}
        {{/each}}
      {{/me-toolbar}}
    `);

    this.set('disabled', true);
  });
});
