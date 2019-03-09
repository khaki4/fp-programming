const log = (...arg) => console.log(...arg);

// custom iterable

const iterable = {
  [Symbol.iterator]() {
    let i = 3;
    return {
      next() {
        return i === 0 
        ? { done: true }
        : { value: i--, done: false }
      }
    }
  }
};

const iterator = iterable[Symbol.iterator]();
// log(iterator.next());
// log(iterator.next());
// log(iterator.next());


// custom iterable 을 for ... of 를 통해 순회 가능
// for (const a of iterable) {
//   log(a);
// }

// 자바스크립트의 array 는 "well-formed iterable"
const arr = [1, 2, 3];
const iter2 = arr[Symbol.iterator]();

log(iter2[Symbol.iterator]() === iter2)


iter2.next();


for (const a of iter2) log(a);

// custom iterable 

const iter3 = iterable[Symbol.iterator]();

// for (const a of iter3) log(a)


// fix it
const wellIterable = {
  [Symbol.iterator]() {
    let i = 3;
    return {
      next() {
        return i === 0 
        ? { done: true }
        : { value: i--, done: false }
      },
      [Symbol.iterator]() { return this; }
    }
  }
};

// for (const a of wellIterable) log(a)

// 많은 자바스크립트의 순회 가능한 것들이 iterable/iterator protocol 을 따르고 있다

const allDom = document.querySelectorAll("*");
for (const a of allDom) log(a)
// log(allDom); // NodeList

const iter4 = allDom[Symbol.iterator]();
log(iter4.next());
log(iter4.next());
log(iter4.next());