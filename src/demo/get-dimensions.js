/**
 * 示例- 在页面上下文中评估脚本
 */
 const puppeteer = require("puppeteer");
 (async () => {
   const browser = await puppeteer.launch();
   const page = await browser.newPage();
   await page.goto("https://www.yamibuy.com/en");
   
  
   // Get the "viewport" of the page, as reported by the page.
  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      title: document.title,
      deviceScaleFactor: window.devicePixelRatio,
    };
  });

  console.log('Dimensions:', dimensions);

   await browser.close();
 })();
 