module.exports = {
  host: "https://www.yamibuy.com",
  launchOptions: {
    // devtools: true,
    headless: false,
    slowMo: 80,
    args: [`--window-size=1024,768`],
  },
  viewportOptions: {
    width: 1024,
    height: 768,
  },
};
