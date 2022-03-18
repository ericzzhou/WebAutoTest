/**
 * 示例- 获取浏览器信息
 */
 const puppeteer = require('puppeteer');
 (async()=>{
     const browser= await puppeteer.launch();
    
     console.log(await browser.version());
     await browser.close();
 })();