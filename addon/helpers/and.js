import { helper } from '@ember/component/helper';

export function and([a, b]/*, hash*/) {
  return Boolean(a) && Boolean(b);
}

export default helper(and);
