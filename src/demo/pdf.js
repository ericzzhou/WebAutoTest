/**
 * 示例- 创建 PDF。
 * 将页面保存为PDF
 */
const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.yamibuy.com");

  await page.pdf({ path: "yamibuy.pdf", format: "a4" });
  await browser.close();
})();
