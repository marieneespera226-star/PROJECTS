let name = "Mike";
let score = 85;
let passScore = 75;

let math = [80, 65, 90];
let english = [70, 85, 95];
let science = [88, 72, 60];

if (score >= passScore) console.log("Passed");
if (score >= 90) console.log("A"); else console.log("B");
if (name === "Mike") console.log("Hello Mike");

for (let i = 0; i < 3; i++); console.log("Math:", math[i]);
for (let s of science) console.log("Science:", s);
let j = 0; while (j < 3) { console.log ("English:", english[j]); j++;}
