import puppeteer from 'puppeteer';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function shot(url, label = '', full = false) {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.goto(url, { waitUntil: 'networkidle2' });

  const tmpDir = path.join(__dirname, 'temporary screenshots');
  await fs.mkdir(tmpDir, { recursive: true });

  let num = 1, filename;
  const suffix = label ? `-${label}` : '';
  do {
    filename = path.join(tmpDir, `mobile-${num}${suffix}.png`);
    try { await fs.access(filename); num++; } catch { break; }
  } while (true);

  await page.screenshot({ path: filename, fullPage: full });
  console.log(`Saved: ${filename}`);
  await browser.close();
}

const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';
const full = process.argv[4] === 'full';
shot(url, label, full).catch(e => { console.error(e.message); process.exit(1); });
