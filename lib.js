// common
const log = (...arg) => console.log(...arg);

const curry = (f) => (a, ..._) =>
  _.length
    ? f(a, ..._)
    : (..._) => f(a, ..._);


// 즉시실행
const range = (l) => {
  let i = -1;
  const res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};

const map = curry((f, iter) => {
  const res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
});

// filter
const filter = curry((f, iter) => {
  const res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
});

const reduce = curry((f, acc, iter) => {
  // (f, iter) 만 있을 경우 3번째 값이 없는 경우 이므로

  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  } else {
    iter = acc[Symbol.iterator]();
  }

  for (const a of iter) {
    acc = f(acc, a);
  }

  return acc;
});




// lazy 실행

const L = {};

L.range = function* (l) {
  let i = -1;
  while (++i < l) {
    yield i;
  }
};

L.map = curry(function* (f, iter) {
  for (const a of iter) {
    yield f(a);
  }
});

// L.filter
L.filter = curry(function* (f, iter) {
  for (const a of iter) {
    if (f(a)) yield a;
  }
});


// 지연연산 마무리
const take = curry((l, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length === l) break;
  }

  return res;
});

const find = curry((f, iter) => go(
  iter,
  filter(f),
  take(1),
  ([a]) => a
));

// 함수 합성

// go
const go = (...args) => reduce((a, f) => f(a), args);

// pipe
const pipe = (f, ...fns) => (...a) => go(f(...a), ...fns);

