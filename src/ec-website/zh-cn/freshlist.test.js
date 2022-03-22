const puppeteer = require("puppeteer");
const globalConfiguraiton = require("../../../globalConfiguraiton");

let url = "/zh/freshlist";

let page;
let browser;
let response;

describe("生鲜首页测试", () => {
  beforeAll(async () => {
    browser = await puppeteer.launch(globalConfiguraiton.launchOptions);
    page = await browser.newPage();
    // await page.setViewport(globalConfiguraiton.viewportOptions);
    response = await page.goto(`${globalConfiguraiton.host}${url}`, {
      // timeout: 0,
      waitUntil: "domcontentloaded",
    });
    await page.waitForSelector("#container");
  }, 66000);

  afterAll(async () => {
    response = undefined;
    await page.close();
    await browser.close();
  });

  test("验证页面标题", async () => {
    const title = await page.title();
    expect(title).toBe("亚米 - 亚米生鲜");
  }, 3000);

  test("检查H1标签", async () => {
    const h1 = await page.$eval("h1", (el) => (el ? true : false));
    expect(h1).toBe(true);
  }, 3000);

  test("检查httpCode", async () => {
    expect(await response.status()).toBe(200);
  }, 10000);

  test("检查生鲜商品列表", async () => {
    await page.waitForSelector(
      "#container > div.freshlist_body > div.freshlist_body-menu"
    );
    // zipcode弹窗检查
    let showZipcodeDialog = await page.$eval(
      "#container > div.popup-modal_content.fadeIn > div > div.freshlist__zipcodeinit__main > div > input[type=text]",
      (el) => (el ? true : false)
    );

    if (showZipcodeDialog) {
      // 输入zipcode
      await page.type(
        "#container > div.popup-modal_content.fadeIn > div > div.freshlist__zipcodeinit__main > div > input[type=text]",
        "91789"
      );
      //点击确定按钮
      await page.click(
        "#container > div.popup-modal_content.fadeIn > div > div.freshlist__zipcodeinit__foot > button"
      );

      //等待页面加载完成
      await page.waitForNavigation();
      // 检查生鲜商品分类导航是否存在
      const existsFreshItemNav = await page.$eval(
        "#container > div.freshlist_body > div.freshlist_body-menu > div > a.freshlist_body-menu_nav",
        (el) => (el ? true : false)
      );
      expect(existsFreshItemNav).toBe(true);
    }
  }, 10000);
});
