import puppeteer from 'puppeteer';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function screenshot(url, label = '') {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(url, { waitUntil: 'networkidle2' });

  // Find the next available screenshot number
  const tmpDir = path.join(__dirname, 'temporary screenshots');
  try {
    await fs.mkdir(tmpDir, { recursive: true });
  } catch (err) {
    // Directory might already exist
  }

  let num = 1;
  let filename;
  const suffix = label ? `-${label}` : '';
  do {
    filename = path.join(tmpDir, `screenshot-${num}${suffix}.png`);
    try {
      await fs.access(filename);
      num++;
    } catch {
      break;
    }
  } while (true);

  await page.screenshot({ path: filename, fullPage: false });
  console.log(`Screenshot saved: ${filename}`);

  await browser.close();
  return filename;
}

const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';
screenshot(url, label).catch(console.error);
