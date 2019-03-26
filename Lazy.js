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
 * 함수 합성
 *
 *
 */
const go = (...args) => reduce((a, f) => f(a), args);
const pipe = (f, ...fs) => (...a) => go(f(...a), ...fs);

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
    yield go1(a, f);
  }
});

const nop = Symbol('nop');

L.filter = curry(function* (f, iter) {
  for (const a of iter) {
    const b = go1(a, f);
    if (b instanceof Promise) yield b.then(b => b ? a : Promise.reject(nop));
    else if (b) yield b;
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
  iter = iter[Symbol.iterator]();
  return function recur() {
    let cur;
    while (!(cur = iter.next()).done) {
      const a = cur.value;
      if (a instanceof Promise) return a.then(a =>
        (res.push(a), res).length === limit ? res : recur()
      ).catch(e => e === nop ? recur() : Promise.reject(e));
      res.push(a);
      if (res.length === limit) return res;
    }
    return res;
  }();
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
const map = curry(pipe(L.map, takeAll));

// 거르기 filter
const filter =  curry(pipe(L.filter, takeAll));

// 찾기 find
const find = curry((f, iter) => go(iter, L.filter(f), take(1), ([a]) => a));

// 접기 reduce
const reduceF = (acc, a, f) =>
  a instanceof Promise ?
    a.then(a => f(acc, a), e => e === nop ? acc : Promise.reject(e)) :
    f(acc, a);

const head = iter => go1(take(1, iter), ([h]) => h);

const reduce = curry((f, acc, iter) => {
  if (!iter) return reduce(f, head(iter = acc[Symbol.iterator]()), iter);

  iter = iter[Symbol.iterator]();

  return go1(acc, function recur(acc) {
    let cur;
    while (!(cur = iter.next()).done) {
      acc = reduceF(acc, cur.value, f);
      if (acc instanceof Promise) return acc.then(recur)
    }
    return acc;
  });
});



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
// users.pop();
// users.pop();
// fg(2).then(log);

// go(Promise.resolve(1),
//   a => a + 10,
//   a => Promise.reject('error~~'),
//   a => console.log('----'),
//   a => a + 1000,
//   a => a + 10000,
//   log).catch(a => console.log(a));

// go(
//   range(3),
//   L.map(a => Promise.resolve(a + 10)),
//   takeAll,
//   log);

// go([1,2,3,4,5,6],
//   L.map(a => Promise.resolve(a * a)),
//   L.filter(a => {
//     return a % 2;
//   }),
//   take(2),
//   log);

const add = (a, b) => a + b;

go([1, 2, 3, 4, 5],
  L.map(a => Promise.resolve(a * a)),
  L.filter(a => Promise.resolve(a * 2)),
  reduce(add),
  log);
