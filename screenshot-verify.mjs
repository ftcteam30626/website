import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'screenshot-verify.png', fullPage: true });
  await browser.close();
  console.log('Screenshot saved to screenshot-verify.png');
})();
