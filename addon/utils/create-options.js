import { assign } from '@ember/polyfills';
import createLogger from 'ember-medium-editor/utils/logger';

const log = createLogger('util', 'create-options');

export default function createOptions(defaults, overrides = {}) {
  let result = assign({}, defaults);

  // merge defaults with new options
  for (let key in overrides) {
    if (overrides[key] !== undefined) result[key] = overrides[key];
  }

  // clean up result from undefined keys
  for (let key in result) {
    if (result[key] === undefined) delete result[key];
  }

  log`defaults:${defaults}overrides:${overrides}result:${result}`;
  return Object.keys(result).length > 0 ? result : undefined;
}
