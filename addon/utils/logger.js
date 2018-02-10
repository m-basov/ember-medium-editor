import { runInDebug } from '@ember/debug';

// define create logger as NoOp in production
let createLogger = () => {};

runInDebug(() => {
  function logger(strs, ...vars) {
    let varsLength = vars.length;
    let result = strs.reduce((acc, str, idx) => {
      let newAcc = [...acc, str];
      if (idx < varsLength) {
        newAcc.push(vars[idx]);
      }
      return newAcc;
    }, []);
    console.debug(...result); // eslint-disable-line
  }

  createLogger = function(...namespaces) {
    return (strings, ...vars) => {
      let prefix = namespaces.join(':');
      let stringsCopy = [...strings];
      stringsCopy[0] = prefix + ': ' + stringsCopy[0];
      return logger(stringsCopy, ...vars);
    };
  }
});

export default createLogger;
