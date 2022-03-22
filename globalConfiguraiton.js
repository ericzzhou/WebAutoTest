
const width = 1024;
const height = 768
module.exports = {
  host: "https://www.yamibuy.com",
  launchOptions: {
    // devtools: true,
    // headless: false,
    // slowMo: 80, //将 Puppeteer 操作减慢指定的毫秒数
    args: [`--window-size=${width},${height} `], //传递给浏览器实例的附加参数
    // ignoreHTTPSErrors: true, //导航时是否忽略 HTTPS 错误。默认为false
    defaultViewport: {
      width: width,
      height: height,
      isMobile: false, //是否考虑meta viewport标签。默认为false
    },
    // timeout:0 ,//等待浏览器实例启动的最长时间（毫秒）。默认为30000（30 秒）。通过0禁用超时
  },
  viewportOptions: {
    // width: 800,
    // height: 768,
  },
};
