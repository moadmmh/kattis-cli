const puppeteer = require('puppeteer');
const C = require('./constants');
const dotenv = require('dotenv');

dotenv.config();

var browser, page;
async function startBrowser() {
  browser = await puppeteer.launch();
  page = await browser.newPage();
}

async function closeBrowser(browser) {
  return browser.close();
}

async function Login(url) {
  await page.goto(url);

  await page.click(C.username_selector);
  await page.keyboard.type(process.env.EMAIL);
  await page.click(C.password_selector);
  await page.keyboard.type(process.env.PASSWORD);
  await page.click(C.cta_selector);

}


async function Submit(url,pblm){

  await page.goto(url);
  //uploading the file
  const input = await page.$('input[type=file]');
  await input.uploadFile(C.file_dir);
  //selecting the pblm
  await page.click(C.slct_pblm);
  await page.keyboard.type(pblm);
  await page.keyboard.press('Enter');
  //submitting the solution
  await page.click(C.btn_selector);

}
async function checksubmission(url){
  await page.goto(url);
  //TODO
}
exports.submission = function(pblm){
(async () => {

  await startBrowser();
  page.setViewport({width: 1366, height: 768});
  console.log("Please Wait your problem is being submitted ...");
  await Login(C.login_url);
  await Submit(C.submit_url,pblm);
  console.log("***********************************************************************")
  console.log(`* Your submission link is ${page.url()} *`);
  console.log("***********************************************************************")
  process.exit(0);

})();
}
