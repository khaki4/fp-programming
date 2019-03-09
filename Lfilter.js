L.filter = function* (f, iter) {
  for (const a of iter) {
    if (f(a)) yield a;
  }
};

// for (const a of L.filter(a => a % 2, [1,2,3,4])) log(a);