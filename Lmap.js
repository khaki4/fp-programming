L.map = function* (f, iter) {
  for (const a of iter) {
    log(a);
    yield f(a);
  }
};