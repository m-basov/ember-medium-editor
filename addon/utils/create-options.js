import { assign } from '@ember/polyfills';

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

  return Object.keys(result).length > 0 ? result : undefined;
}
