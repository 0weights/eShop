let x = Symbol("hh");
let y = Symbol("hh");
const o = {'ag e' : 1,  [x] :'lol', [y] :'lol'};

// for (const key in o) {
//   console.log(`${key}: ${o[key]}`);
// }
console.log(o[x]);

