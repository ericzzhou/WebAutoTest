const puppeteer = require("puppeteer");
const globalConfiguraiton = require("../../../globalConfiguraiton");

let url = "/zh";

let page;
let browser;
let response;

describe("中文首页测试", () => {
  beforeAll(async () => {
    browser = await puppeteer.launch(globalConfiguraiton.launchOptions);
    page = await browser.newPage();

    // const blockTypes = new Set(['image', 'media', 'font']);
    // await page.setRequestInterception(true); //开启请求拦截
    // await page.setViewport(globalConfiguraiton.viewportOptions);
    response = await page.goto(`${globalConfiguraiton.host}${url}`, {
      // timeout: 0,
      waitUntil: "domcontentloaded",
    });
    await page.waitForSelector("#header");
  }, 1000 * 20);

  afterAll(async () => {
    response = undefined;
    try {
      await page.close();
    } catch (error) {
      console.error(error);
    }

    try {
      await browser.close();
    } catch (error) {
      console.error(error);
    }
  });

  test("验证页面标题", async () => {
    const title = await page.title();
    // console.log('title=>>',title)
    expect(title).toBe("亚米 | 北美海外华人购物首选");
  });

  test("检查H1标签", async () => {
    const h1 = await page.$eval("h1", (el) => (el ? true : false));
    // console.log('h1=>>',h1)
    expect(h1).toBe(true);
  });

  test("检查httpCode", async () => {
    expect(await response.status()).toBe(200);
  });

  // test("检查顶部搜索功能", async () => {
  //   // 输入zipcode
  //   await page.type(
  //     "#header > div.header-search.container.clearfix > div.header-search_searchbox.float_left > div > form > input.search-box_input.background-clr-bggray.cn",
  //     "饼干",
  //     { delay: 100 }
  //   );

  //   try {
  //     //关闭首页monetate弹窗广告，否则影响下方代码执行
  //     await page.click("#monetate_allinone_lightbox > a > div > span > i");
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   await page.click(
  //     "#header > div.header-search.container.clearfix > div.header-search_searchbox.float_left > div > form > button"
  //   );

  //   //等待页面加载完成
  //   await page.waitForNavigation({ timeout: 0, load: "domcontentloaded" });
    
  //   const keywords = page.$eval('#search-container > div.tags-wrapper > div > span.keywords.font-clr-black.float_left',e=>e.innerText);
    
  //   expect(keywords).toBe('饼干');
  //   // //是否存在搜索结果（第一个商品）
  //   // const existsSearchResult = await page.$eval(
  //   //   "#search-container > div.search-content.container-responsive.clearfix > div > div.col-2 > div > div.content.clearfix > div:nth-child(2) > div > div.item-add_desc > p > a",
  //   //   (el) => (el ? true : false)
  //   // );
  //   // const itemName = await page.$eval(
  //   //   "#search-container > div.search-content.container-responsive.clearfix > div > div.col-2 > div > div.content.clearfix > div:nth-child(2) > div > div.item-add_desc > p > a",
  //   //   (el) => el.innerText
  //   // );
  //   // expect(itemName.indexOf("饼干")).toBeGreaterThan(-1);
  //   // expect(existsSearchResult).toBe(true);
  // }, 200008);
});
