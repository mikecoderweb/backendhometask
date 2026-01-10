// console.log('salom bu birinchu node.js file')
// console.log(global);
// console.log(__dirname);
// console.log(__filename);
// console.log(process);
setTimeout(() => {
    console.log('salom bu settimeout functioni va bu qancha vohtdan kn ishlashini bildiradi');
}, 3000)

setInterval(() => {
    console.log('salom bu setinterval bergan vohtimizda har doim ishledi misol 1 secundda 1 marta ');
}, 1000)

//eski usul olish
// const {sum} = require("./example")
// console.log( sum(6,7));

//yangi usul
import { sum } from "./example.js";
console.log(sum)(6,5);

