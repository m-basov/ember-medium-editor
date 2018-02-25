import { helper } from '@ember/component/helper';
import { capitalize } from '@ember/string';

const UPPERCASE_CHAR_REGEX = /(?!^)[A-Z]/g;

export default helper(function ([key]) {
  return capitalize(key).replace(UPPERCASE_CHAR_REGEX, (str) => ' ' + str);
});
