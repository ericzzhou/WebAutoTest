/**
 * 示例- 模拟登录。
 * 屏幕截图
 */
const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.yamibuy.com/en");
  await page.screenshot({ path: "1英文首页.png" });
//   await page.waitForSelector("body > div.header-container > div > div.header-section.container.clearfix.float > div.header-section__center > div.center-search.clearfix > form > input.search-input");
//   await page
//     .type(
//       "body > div.header-container > div > div.header-section.container.clearfix.float > div.header-section__center > div.center-search.clearfix > form > input.search-input",
//       "搜索"
//     )
//     .catch((e) => {
//       console.log(e);
//     });

  await page.screenshot({ path: "7email input 输入内容.png" });

  await page.click(
    "body > div.header-container > div > div.header-section.container.clearfix > div.header-section__right > div.header-user.clearfix > div.header-user__card.clearfix > a"
  );
  await page.screenshot({ path: "2登录页弹窗.png" });

  await page.click(
    "body > div.light-alert > div > div > div.alert__box__body > div > div > button"
  );
  await page.screenshot({ path: "3未填写账号时点击Continue按钮.png" });

  //email input 选中
  await page.focus(
    "body > div.light-alert > div > div > div.alert__box__body > div > div > div.light-input__wrapper.login__email > div.light-input__container.error > input[type=text]"
  );
  await page.screenshot({ path: "4email input focus.png" });

  await page.keyboard.type("eric.zhou@qq.com");
  await page.screenshot({ path: "5email input 输入内容.png" });

  await page.click(
    "body > div.light-alert > div > div > div.alert__box__body > div > div > button"
  );
  await page.screenshot({ path: "6点击Continue.png" });

  await browser.close();
})();
