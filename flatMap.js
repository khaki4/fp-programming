const log = console.log;

log([[1, 2], [3, 4], [5, 6, 7]].flatMap(a => a.map(a => a * a)));

const L = {};