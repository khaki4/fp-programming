const log = (...arg) => console.log(...arg);

// Gernerator: README 참조
// 순회할 값을 문장으로 표현한다는 의미
// 문장을 순회할 수 있는 리턴값으로 만들 수 있다.
// 즉, 자바스크립트에서는 제너레이터를 통해 어떠한 상태나 어떠한 값이라도 순회 하도록 만들 수 있다.
// Gernerator 를 통해 쉽게 제어가능한 이터러블을 만들 수 있다.
function* gen() {
  yield 1;
  if (false) yield 2; // <--- 순회할 값을 문장으로 표현한다는 의미
  yield 3;
  return 100;
}

const iter = gen();

// Generator 는 wel-formed iterator 를 리턴하는 함수
// log(iter[Symbol.iterator]() === iter); // wel-formed iterator

// log(iter.next());
// log(iter.next());
// log(iter.next());
// log(iter.next());

// for (const a of gen()) log(a)

// 홀수만 생성하는 generator function
function* odd() {
  yield 1;
  yield 3;
  yield 5;
}
// for (const a of odd()) log(a);

// 자동화 된 홀수 생성
function* odd2(limit) {
  for (let i = 0; i < limit; i++) {
    if (i % 2) yield i;
  }
}

// for (const a of odd2(15)) log(a)

// infinity
function* infinity(i = 0) {
  while (true) yield i++;
}

// limit
function* limit(limit, iter) {
  for (const a of iter) {
    yield a;
    if (a === limit) return;
  }
}

const iter3 = infinity();
// log(iter3.next())
// log(iter3.next())
// log(iter3.next())
// log(iter3.next())
// log(iter3.next())
// log(iter3.next())

// edit odd function

function* odd3(limit) {
  for (const a of infinity(1)) {
    if (a % 2) yield a;
    if (a === limit) return;
  }
}

const _odd3 = odd3(5);
// log(_odd3.next());
// log(_odd3.next());
// log(_odd3.next());
// log(_odd3.next());

// edit odd function with limit*
function* odd4(l) {
  for (const a of limit(l, infinity(1))) {
    if (a % 2) yield a;
  }
}

for (const a of odd4(7)) log(a)