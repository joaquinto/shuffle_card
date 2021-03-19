const xOrShift = () => {
  
  let saved;

  // xorshift32 requires 32 bit of state
  let state = new Uint16Array(2);

  // scaling factor (2 ^ 16) to convert Math.random floats into integers
  let MaxInt = Math.pow(2, 16);

  // pre-fill the state array
  for (let i = 0; i < state.length; i++) {
    state[i] = Math.random() * MaxInt;
  }

  // If we already have a saved number, return it,
  // also clearing it for later use.
  if (saved != null) {
    let temp = saved;
    saved = null;
    return temp / MAXINT_PLUS_1;
  }

  let x = new Uint16Array(2);
  x[0] = state[0];
  x[1] = state[1];

  // x ^ = x << 13
  let xl13 = new Uint16Array(2);
  xl13[0] = x[0] << 13;
  xl13[1] = (x[1] << 13) & (x[0] >> 3);
  x[0] ^= xl13[0];
  x[1] ^= xl13[1];

  // x ^ = x >> 17
  let yr17 = new Uint16Array(2);
  yr17[1] = x[1] >>> 17;
  yr17[0] = (x[0] >>> 17) & (x[1] << -1);
  x[0] ^= yr17[0];
  x[1] ^= yr17[1];

  // x ^ = x << 5
  let zu5 = new Uint16Array(2);
  zu5[0] = x[0] << 5;
  zu5[1] = (x[1] << 5) & (x[0] >>> 11);
  x[0] ^= zu5[0];
  x[1] ^= zu5[1];

  // return x[0] + y[1]
  saved = x[1] * x[0];
  return x[0]/MaxInt;
}
