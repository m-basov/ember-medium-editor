import Component from '@ember/component';
import { get, set, computed } from '@ember/object';
import mediumEditorOptions from './-medium-editor-options';
import { reads } from '@ember/object/computed';
import { A } from '@ember/array';

let text = `
<h2>Find empty spot in cupboard and sleep all day</h2>
<p><b><i><u>Cat ipsum dolor sit amet</u></i></b>, hiss and stare at nothing then run suddenly away. Kitty kitty i cry and cry and cry unless you pet me, and then maybe i cry just for fun, meowwww so chew iPad power cord disappear for four days and return home with an expensive injury; bite the vet for sniff catnip and act crazy i can haz. Poop on grasses stand in front of the computer screen, and meow yet reward the chosen human with a slow blink for roll over and sun my belly. Please stop looking at your phone and pet me lies down . Take a big fluffing crap 💩 twitch tail in permanent irritation. Stare at ceiling cats go for world domination for cat snacks, for i can haz and run outside as soon as door open.</p>
<h3>Purr-fect blockquote!</h3>
<blockquote>Hide at bottom of staircase to trip human leave fur on owners clothes, or throw down all the stuff in the kitchen this cat happen now, it was too purr-fect!!! so meoooow attack the dog then pretend like nothing happened for love to play with owner's hair tie. Lick left leg for ninety minutes, still dirty why must they do that, or scratch the box for play riveting piece on synthesizer keyboard scratch me there, elevator butt cereal boxes make for five star accommodation . Cats making all the muffins chew the plant. Rub face on everything lick sellotape. I am the best play riveting piece on synthesizer keyboard play time the fat cat sat on the mat bat away with paws i'm bored inside, let me out i'm lonely outside, let me in i can't make up my mind whether to go in or out, guess i'll just stand partway in and partway out, contemplating the universe for half an hour how dare you nudge me with your foot?!?! leap into the air in greatest offense!. Dont wait for the storm to pass, dance in the rain scratch at fleas, meow until belly rubs, hide behind curtain when vacuum cleaner is on scratch strangers and poo on owners food plays league of legends for loves cheeseburgers weigh eight pounds but take up a full-size bed. Always hungry attack feet, and sometimes switches in french and say "miaou" just because well why not and lick butt, yet somehow manage to catch a bird but have no idea what to do next, so play with it until it dies of shock.</blockquote>
<p>Destroy the blinds purr. When in doubt, wash hiss at vacuum cleaner for swat turds around the house yet you call this cat food cat cat moo moo lick ears lick paws for stare out the window. Give attitude lie on your belly and purr when you are asleep cough furball into food bowl then scratch owner for a new one give me some of your food give me some of your food give me some of your food meh, i don't want it yet hide when guests come over, or warm up laptop with butt lick butt fart rainbows until owner yells pee in litter box hiss at cats ask to go outside and ask to come inside and ask to go outside and ask to come inside. Destroy the blinds scratch at fleas, meow until belly rubs, hide behind curtain when vacuum cleaner is on scratch strangers and poo on owners food. Hide head under blanket so no one can see wake up wander around the house making large amounts of noise jump on top of your human's bed and fall asleep again. Kitten is playing with dead mouse behind the couch. Kitty kitty hide head under blanket so no one can see. Litter kitter kitty litty little kitten big roar roar feed me. Flee in terror at cucumber discovered on floor scoot butt on the rug has closed eyes but still sees you ooh, are those your $250 dollar sandals? lemme use that as my litter box refuse to leave cardboard box. Annoy kitten brother with poking chase ball of string chase red laser dot or if it smells like fish eat as much as you wish but rub face on everything, or touch water with paw then recoil in horror. Sniff sniff pose purrfectly to show my beauty scratch the postman wake up lick paw wake up owner meow meow for asdflkjaertvlkjasntvkjn (sits on keyboard) eat the fat cats food sit on human. With tail in the air poop in litter box, scratch the walls munch on tasty moths meowzer for hate dog. Ignore the squirrels, you'll never catch them anyway wack the mini furry mouse. Scratch leg; meow for can opener to feed me scratch the furniture sleep everywhere, but not in my bed cats secretly make all the worlds muffins so eat a plant, kill a hand so sleep nap and claw at curtains stretch and yawn nibble on tuna ignore human bite human hand.</p>
`;

export default Component.extend({
  classNames: ['test-editor'],

  mediumEditorOptions,

  coreOptions: reads('mediumEditorOptions.core.options'),
  toolbarOptions: reads('mediumEditorOptions.toolbar.options'),
  anchorPreviewOptions: reads('mediumEditorOptions.anchorPreview.options'),
  anchorFormOptions: reads('mediumEditorOptions.anchorForm.options'),
  pasteOptions: reads('mediumEditorOptions.paste.options'),
  placeholderOptions: reads('mediumEditorOptions.placeholder.options'),
  autoLinkOptions: reads('mediumEditorOptions.autoLink.options'),
  imageDraggingOptions: reads('mediumEditorOptions.imageDragging.options'),
  keyboardCommandsOptions: reads('mediumEditorOptions.keyboardCommands.options'),

  text,

  openSections: computed(() => new A(['core'])),

  actions: {
    preventDefault(e) {
      e.preventDefault();
      return false;
    },

    updateOption(section, option, value) {
      let mediumEditorOptions = get(this, 'mediumEditorOptions');
      let path = `${section}.options.${option}.value`;
      return set(mediumEditorOptions, path, value);
    },

    toggleSection(section, isOpen) {
      let openSections = get(this, 'openSections');

      if (isOpen) {
        return openSections.removeObject(section);
      }

      return openSections.pushObject(section);
    }
  }
});
