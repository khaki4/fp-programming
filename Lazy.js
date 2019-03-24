/**
 * Collection 중심의 프로그래밍을 위한 함수 모음
 *
 *
 */

const log = (...args) => console.log(...args);
const test = (name, times, f) => {
  console.time(name);
  while (times--) f();
  console.timeEnd(name);
};
const curry = f => (a, ..._) => (_.length ? f(a, ..._) : (..._) => f(a, ..._));

const identify = a => a;

/**
 * Lazy
 *
 *
 */
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

L.filter = curry(function* (f, iter) {
  for (const a of iter) {
    if (f(a)) yield a;
  }
});

/**
 * 마무리
 *
 *
 */
// take
const take = curry((limit, iter) => {
  const res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length === limit) break;
  }
  return res;
});

const takeAll = take(Infinity);

const range = l => {
  let i = -1;
  const res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};

// 수집하기 map
const map = curry((f, iter) => {
  const res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
});

// 거르기 filter
const filter = curry((f, iter) => {
  const res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
});

// 찾기 find
const find = curry((f, iter) => go(iter, L.filter(f), take(1), ([a]) => a));

// 접기 reduce
const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  } else {
    iter = iter[Symbol.iterator]();
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
});

/**
 * 함수 합성
 *
 *
 */
const go = (...args) => reduce((a, f) => f(a), args);
const pipe = (f, ...fs) => (...a) => go(f(...a), ...fs);

// test를 위해서는 주석 해제
// module.exports = {
//   map,
//   filter,
//   reduce,
//   take,
//   find,
//   go,
//   L,
// };

const isIterable = (iter) => iter && iter[Symbol.iterator];

L.flatten = function* (iter) {
  for (const a of iter) {
    if (isIterable(a)) yield* a;
    else yield a;
  }
};

const arr = [[3], [4, 8], [1, 2], [6, 7, 8]];


L.deepFlat = function* f(iter) {
  for (const a of iter) {
    if (isIterable(a)) yield* f(a);
    else yield a;
  }
};

const flatten = pipe(L.flatten, takeAll);

// log(arr.flatMap(a => a.map(a => a * a)))

// const it = L.deepFlat(arr);
//
// log(it.next());
// log(it.next());
// log(it.next());

// log(flatten(arr));

L.flatMap = curry(pipe(L.map, L.flatten));

const _curry = f => {

  return (a, ..._) => (_.length ? f(a, ..._) : (..._) => f(a, ..._));
}

const flatMap = curry(pipe(L.map, flatten));

// log(takeAll(L.flatMap(L.range, map(a => a + 1, [1, 2]))))

const delay100 = a => new Promise(resolve =>
  setTimeout(() => resolve(a), 100));

const go1 = (a, f) => a instanceof Promise ? a.then(f) : f(a);
const add5 = a => a + 5;

// go1(go1(10, add5), log);
// go1(go1(delay100(10), add5), log)


/**
 *
 * Kleisli Composition
 *
 * f . g
 * f(g(x)) = f(g(x))
 * f(g(x)) = g(x)
 *
 */

const users = [
  { id: 1, name: 'aa' },
  { id: 2, name: 'bb' },
  { id: 3, name: 'cc' }
];

const getUserById = id =>
  find(u => u.id === id, users) || Promise.reject('없어요!');

const f = ({ name }) => name;
const g = getUserById;

const fg = id => Promise.resolve(id).then(g).then(f).catch(a => a);
users.pop();
users.pop();

fg(2).then(log);