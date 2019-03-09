// curry
const curry = (f) => (a, ..._) =>
  _.length
    ? f(a, ..._)
    : (..._) => f(a, ..._);


// const add = (a, b) => a + b;
// const _add = curry(add);
// console.log(_add(1, 2));
// console.log(_add(1, 2));