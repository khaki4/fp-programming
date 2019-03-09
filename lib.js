const log = (...arg) => console.log(...arg);

const L = {};

// curry
const curry = (f) => (a, ..._) =>
  _.length
    ? f(a, ..._)
    : (..._) => f(a, ..._);

// map
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
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
});

// 즉시 실행 range
const range = (l) => {
  let i = -1;
  const res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};

// const t = range(4);
// log(range(4));


// lazy 실행 range
L.range = function* (l) {
  let i = -1;
  while (++i < l) {
    yield i;
  }
};

// 배열과 이터레이터의 성능 차이
const test = (name, times, f) => {
  console.time(name);
  while (times--) f();
  console.timeEnd(name);
};

// test('range', 1000000, () => range(10));
// test('L.range', 1000000, () => L.range(10));


// take
const take = curry((l, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length === l) break;
  }
  return res;
});

// find
const find = curry((f, iter) => go(
  iter,
  filter(f),
  take(1),
  ([a]) => a
));

// L.range(4)
// log(take(5, range(1000)))
// log(take(5, L.range(8)))

// test('C.range', 100, () => take(5, L.range(10)));
// test('D.range', 100, () => take(5, range(10)));
// test('C.range', 100, () => take(5, L.range(10)));
// test('D.range', 100, () => take(5, range(10)));
// test('C.range', 100, () => take(5, L.range(10)));
// test('D.range', 100, () => take(5, range(10)));


// L.map
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


// go
const go = (...args) => reduce((a, f) => f(a), args);

// pipe
const pipe = (f, ...fns) => (...a) => go(f(...a), ...fns);

