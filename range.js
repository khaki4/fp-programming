// const log = (...arg) => console.log(...arg);
//
// const L = {};
//
// // 즉시 실행 range
// const range = (l) => {
//   let i = -1;
//   const res = [];
//   while (++i < l) {
//     res.push(i);
//   }
//   return res;
// };
//
// const t = range(4);
// log(range(4));
//
//
// // lazy 실행 range
// L.range = function* (l) {
//   let i = -1;
//   while (++i < i) {
//     yield i;
//   }
// };
//
// // 배열과 이터레이터의 성능 차이
// const test = (name, times, f) => {
//   console.time(name);
//   while (times--) f();
//   console.timeEnd(name);
// };
//
// test('range', 1000000, () => range(10));
// test('L.range', 1000000, () => L.range(10));
