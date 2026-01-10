import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES Module da __dirname olish
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// logs.txt to'liq yo'li
const logFilePath = path.join(__dirname, 'logs.txt');

// log funksiyasi
export function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp} - ${message}\n`;

  try {
    fs.appendFileSync(logFilePath, logMessage, 'utf8');
  } catch (err) {
    console.error('Log yozishda xatolik:', err.message);
  }
}

// readLogs funksiyasi
export function readLogs() {
  try {
    if (!fs.existsSync(logFilePath)) {
      console.warn('logs.txt fayli mavjud emas.');
      return '';
    }
    const data = fs.readFileSync(logFilePath, 'utf8');
    return data;
  } catch (err) {
    console.error('Faylni o\'qishda xatolik:', err.message);
    return '';
  }
}
