const puppeteer = require("puppeteer");
const globalConfiguraiton = require("../../../globalConfiguraiton");

let url = "/zh/search?q=饼干";

let page;
let browser;
let response;

describe("中文搜索结果页测试", () => {
  beforeAll(async () => {
    browser = await puppeteer.launch(globalConfiguraiton.launchOptions);
    page = await browser.newPage();
    // const blockTypes = new Set(['image', 'media', 'font']);
    // await page.setRequestInterception(true); //开启请求拦截
    await page.setViewport(globalConfiguraiton.viewportOptions);
    response = await page.goto(`${globalConfiguraiton.host}${url}`, {
      timeout: 0,
      waitUntil: "domcontentloaded",
    });
    await page.waitForSelector("#header");
  }, 66000);

  afterAll(async () => {
    response = undefined;
    await page.close();
    await browser.close();
  });

  test("验证页面标题", async () => {
    const title = await page.title();
    // console.log('title=>>',title)
    expect(title).toBe("饼干 | 亚米");
  }, 99999);

  test("检查H1标签", async () => {
    const h1 = await page.$eval("h1", (el) => (el ? true : false));
    // console.log('h1=>>',h1)
    expect(h1).toBe(true);
  }, 99999);

  test("检查httpCode", async () => {
    expect(await response.status()).toBe(200);
  }, 99999);

  test("检查顶部搜索输入框是否正确显示关键词", async () => {
    //等待页面 搜索结果展示
    await page.waitForSelector(
      "#search-container > div.tags-wrapper > div > span.keywords.font-clr-black.float_left"
    );

    //读取关键词input框里的文字
    const keywordsInputValue = await page.$eval(
      "#header > div.header-search.container.clearfix > div.header-search_searchbox.float_left > div > form > input.search-box_input.background-clr-bggray.cn",
      (el) => el.value
    );
    // console.log('关键词input框里的文字',keywordsInputValue)
    expect(keywordsInputValue).toBe("饼干");
  });

  test("检查搜索结果是否正确显示搜索内容", async () => {
    //等待页面 搜索结果展示
    await page.waitForSelector(
      "#search-container > div.tags-wrapper > div > span.keywords.font-clr-black.float_left"
    );

    //是否存在搜索结果（第一个商品）
    const existsSearchResult = await page.$eval(
      "#search-container > div.search-content.container-responsive.clearfix > div > div.col-2 > div > div.content.clearfix > div:nth-child(2) > div > div.item-add_desc > p > a",
      (el) => (el ? true : false)
    );
    const itemName = await page.$eval(
      "#search-container > div.search-content.container-responsive.clearfix > div > div.col-2 > div > div.content.clearfix > div:nth-child(2) > div > div.item-add_desc > p > a",
      (el) => el.innerText
    );
    expect(itemName.indexOf("饼干")).toBeGreaterThan(-1);
    expect(existsSearchResult).toBe(true);
  });

  test("检查商品加入购物车功能", async () => {
    // 等待页面加载完成
    
    await page.waitForSelector(
      "#search-container > div.tags-wrapper > div > span.keywords.font-clr-black.float_left"
    );
    //是否存在搜索结果（第一个商品加购按钮）
    const existsSearchResultItemBtn = await page.$eval(
      "#search-container > div.search-content.container-responsive.clearfix > div > div.col-2 > div > div.content.clearfix > div:nth-child(2) > div > div.item-action > div > div.js-add-desc",
      (el) => (el ? true : false)
    );
    expect(existsSearchResultItemBtn).toBe(true);

    let miniCartProductQuantity = await page.$eval(
      "#header-cart > a > i > div",
      (el) => el.innerText
    );
    console.log('miniCartProductQuantity===>',miniCartProductQuantity,'|')
    expect(miniCartProductQuantity).toBe('');


    await page.click('#search-container > div.search-content.container-responsive.clearfix > div > div.col-2 > div > div.content.clearfix > div:nth-child(2) > div > div.item-action > div > div.js-add-desc');
    
    await  page.waitForTimeout(1000)
    miniCartProductQuantity = await page.$eval(
      "#header-cart > a > i > div",
      (el) => el.innerText
    );
    
    console.log('miniCartProductQuantity222===>',miniCartProductQuantity,'|')
    expect(miniCartProductQuantity).toBe('1');

  }, 99000);

  test("检查顶部搜索功能", async () => {
    // 输入zipcode
    await page.type(
      "#header > div.header-search.container.clearfix > div.header-search_searchbox.float_left > div > form > input.search-box_input.background-clr-bggray.cn",
      "饼干",
      { delay: 100 }
    );
    await page.click(
      "#header > div.header-search.container.clearfix > div.header-search_searchbox.float_left > div > form > button"
    );

    //等待页面加载完成
    await page.waitForNavigation();

    //是否存在搜索结果（第一个商品）
    const existsSearchResult = await page.$eval(
      "#search-container > div.search-content.container-responsive.clearfix > div > div.col-2 > div > div.content.clearfix > div:nth-child(2) > div > div.item-add_desc > p > a",
      (el) => (el ? true : false)
    );
    const itemName = await page.$eval(
      "#search-container > div.search-content.container-responsive.clearfix > div > div.col-2 > div > div.content.clearfix > div:nth-child(2) > div > div.item-add_desc > p > a",
      (el) => el.innerText
    );
    expect(itemName.indexOf("饼干")).toBeGreaterThan(-1);
    expect(existsSearchResult).toBe(true);
  });

  
});
