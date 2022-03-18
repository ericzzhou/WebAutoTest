/**
 * 示例- 屏幕截图保存为 yamibuy.png。
 * 屏幕截图
 */
const puppeteer = require('puppeteer');
(async()=>{
    const browser= await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.yamibuy.com/en');
    await page.screenshot({path:'yamibuy1.png'});
    await page.click('body > div.header-container > div > div.header-section.container.clearfix > div.header-section__right > div.header-user.clearfix > div.header-user__card.clearfix > a');
    await page.screenshot({path:'yamibuy2.png'});
    await page.click('body > div.light-alert > div > div > div.alert__box__body > div > div > button')
    await page.screenshot({path:'yamibuy3.png'});
    await browser.close();
})();