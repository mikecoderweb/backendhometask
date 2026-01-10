// fs → Node.js modul
// u orqali fayl yaratish, o‘qish, yozish, o‘chirish mumkin

import { log } from 'console'
import fs from 'fs'
fs.writeFileSync('tst.txt' , 'salom dunyo!')

// fs.writeFileSync(...)
// faylga yozadi
// agar fayl yo‘q bo‘lsa → yaratadi
// agar bor bo‘lsa → ustiga yozadi
// 👉 Sync degani:
// sinxron (kod shu joyda to‘xtab turadi)
// ish tugamaguncha keyingi qator ishlamaydi

const data = fs.readFileSync('tst.txt')
console.log(data);
//<Buffer 73 61 6c 6f 6d 20 64 75 6e 79 6f 21>
const data1 = fs.readFileSync('tst.txt', 'utf8')
console.log(data1);
// salom dunyo!


import { log, readLogs } from './logger.js';

// Dastur ishga tushganda darhol log
log('APP STARTED');

// 2 soniyadan keyin bitta log
setTimeout(() => {
  log('FIRST TIMEOUT EVENT');
}, 2000);

// Har 1 soniyada interval log, 3 marta
let count = 0;
const intervalId = setInterval(() => {
  count++;
  log('INTERVAL TICK');

  if (count === 3) {
    clearInterval(intervalId);
  }
}, 1000);

// 5 soniyadan keyin barcha loglarni o'qib console.log
setTimeout(() => {
  const allLogs = readLogs();
  console.log('--- ALL LOGS ---\n' + allLogs);
}, 5500);
