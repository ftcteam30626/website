import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/outreach.html', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'outreach-check.png', fullPage: true });
  
  // Log any images that failed to load
  const images = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('img')).map(img => ({
      src: img.src,
      complete: img.complete,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight
    }));
  });
  
  console.log('Images on page:');
  images.forEach((img, i) => {
    const loaded = img.complete && img.naturalWidth > 0;
    console.log(`${i + 1}. ${img.src} - ${loaded ? 'LOADED' : 'FAILED'}`);
  });
  
  await browser.close();
})();
