import { helper } from '@ember/component/helper';

export default helper(function ([value]) {
  return value && value.toString ? value.toString() : JSON.stringify(value);
});
