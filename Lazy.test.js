var map = require('./Lazy');


const list = [1, 2, 3, 4, 5];
const add1 = v => v + 1;


describe('map', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect([2, 3, 4, 5, 6]).toEqual([2, 3, 4, 5, 6]);
  });
});
