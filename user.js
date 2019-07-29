const puppeteer = require('puppeteer');
const C = require('./constants');


var browser, page;
async function startBrowser() {
  browser = await puppeteer.launch();
  page = await browser.newPage();
}

async function closeBrowser(browser) {
  return browser.close();
}

async function userinfo(url){
  await page.goto(url);
  const score = await page.$$eval(C.score, tds => tds.map((td) => {
    return td.innerHTML;
  }));
  const rank = await page.$$eval(C.rank, tds => tds.map((td) => {
    return td.innerHTML;
  }));
  var curr_rank = rank[0].replace(/\s/g,'');
  console.log(`Current Rank :${curr_rank}`);
  console.log(`Current Score :${score[0]}`);
}

exports.userinfo = function(user){
(async () => {

  await startBrowser();
  page.setViewport({width: 1366, height: 768});
  var userurl = C.user_url + user;
  await userinfo(userurl);
  process.exit(0);

})();
}
