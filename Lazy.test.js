const { map, filter, take, find, go, reduce, L } = require('./Lazy');


const list = [1, 2, 3, 4, 5];
const add1 = v => v + 1;

const predicateFilter =  v => v < 3;
const length = 3;
const predicateFind =  v => v === 2;

describe('map', () => {
  test('map의 결과가 처음 list와 다른 참조값을 가져야 한다', () => {
    expect(map(add1, list)).not.toBe(list);
  });
  test('보조함수로 리스트 변형을 해야한다.', () => {
    expect(map(add1, list)).toEqual([2, 3, 4, 5, 6]);
  });
});

describe('filter', () => {
  test('보조함수로 원하는 필터링을 해야한다.', () => {
    expect(filter(predicateFilter, list)).toEqual([1, 2]);
  });
});

describe('take', () => {
  test('보조함수로 원하는 길이의 리스트를 가져와야 한다', () => {
    expect(take(length, list)).toEqual(list.slice(0, length));
  });
});

describe('find', () => {
  test('보조함수로 원하는 값을 찾아야 한다.', () => {
    expect(find(predicateFind, list)).toEqual(2);
  });
});

describe('reduce', () => {
  test('보조함수로 원하는 값을 만들어야 한다.', () => {
    expect(reduce((acc, curr) => acc + curr, list)).toEqual(15);
  });
});

describe('go', () => {
  test('여러개의 함수를 인지로 받아 차례로 실행해야 한다', () => {
    expect(go(
      list,
      map(add1),
      filter(predicateFilter),
      find(predicateFind)
    )).toEqual(2);
  });
});

describe('L.map', () => {
  test('값을 변형해야 한다', () => {
    expect(
      go(
        list,
        L.map(add1),
        take(list.length)
      )
    ).toEqual([2, 3, 4, 5, 6]);
  });
});

describe('L.filter', () => {
  test('리스트를 필터해야 한다.', () => {
    expect(
      go(
        list,
        L.filter(predicateFilter),
        take(list.length)
      )
    ).toEqual([1, 2]);
  });
});
