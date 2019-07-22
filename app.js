const puppeteer = require('puppeteer');
const C = require('./constants');
const USERNAME_SELECTOR = '#user_input';
const PASSWORD_SELECTOR = '#password_input';
const CTA_SELECTOR = '#wrapper > div > div > section > div.login > div.login-right > form > input.btn.btn-default';
const login_url = "https://open.kattis.com/login/email";
const submit_url = "https://open.kattis.com/submit";
const BTN_SELECTOR = '#submit-solution-form > div > div:nth-child(4) > div.col-md-offset-1.col-md-3 > input.btn.btn-default'
const SLCT_LANGUAGE = '#language_select';
const SLCT_PBLM = '#problem_select';
const FILE_UPLD = '#sub_files_input';
const FILE_DIR = "/home/moad/Desktop/ok.cpp";


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
  await page.setRequestInterception(true);
  page.on('request', (req) => {
      if(req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image'){
          req.abort();
      }
      else {
          req.continue();
      }
  });
  await page.click(USERNAME_SELECTOR);
  await page.keyboard.type(C.username);
  console.log("Email done");
  await page.click(PASSWORD_SELECTOR);
  await page.keyboard.type(C.password);
  console.log("Password done");
  await page.click(CTA_SELECTOR);
  console.log("Submitted done");
  await page.waitForNavigation();
  console.log("Done for now");
}
async function Submit(url){
  await page.goto(url);
  await page.setRequestInterception(true);
  page.on('request', (req) => {
      if(req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image'){
          req.abort();
      }
      else {
          req.continue();
      }
  });
  //Upload the file
  const fileInput = await page.click(FILE_UPLD);
  await fileInput.uploadFile(FILE_DIR);
  await page.click(SLCT_PBLM);
  await page.keyboard.type("hello");
  await page.click(SLCT_LANGUAGE);
  await page.keyboard.type("C++");
  await page.click(BTN_SELECTOR);
}
(async () => {
  await startBrowser();
  page.setViewport({width: 1366, height: 768});
  await Login(login_url);
  console.log("Done logging");
  await Submit(submit_url);
  process.exit(0);
})();
