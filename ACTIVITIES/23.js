const a1 = [123];
const a2 = [456];
const a3 = [...a1, 7777777297];

const k1 = () => a1;
const k2 = () => a2;
const k3 = () => a3;

console.log(k1(), k2(), k3());


