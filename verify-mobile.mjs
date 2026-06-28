import puppeteer from 'puppeteer';

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set mobile viewport (iPhone 12 dimensions)
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });

    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    await page.screenshot({ path: 'mobile-screenshot.png', fullPage: true });

    await browser.close();
    console.log('Mobile screenshot saved to mobile-screenshot.png');
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
})();
