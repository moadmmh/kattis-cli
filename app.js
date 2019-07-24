const puppeteer = require('puppeteer');
var lineReader = require('line-reader');


const C = require('./constants');
const USERNAME_SELECTOR = '#user_input';
const PASSWORD_SELECTOR = '#password_input';
const CTA_SELECTOR = '#wrapper > div > div > section > div.login > div.login-right > form > input.btn.btn-default';

const login_url = "https://open.kattis.com/login/email";
var submit_url = "https://open.kattis.com/submit";
const user_url = "https://open.kattis.com/users/test32";

const BTN_SELECTOR = '#submit-solution-form > div > div:nth-child(4) > div.col-md-offset-1.col-md-3 > input.btn.btn-default'
const SLCT_LANGUAGE = '#s2id_language_select > a';
const LANGUAGE_INPUT = "#s2id_autogen2_search";

const SLCT_PBLM = '#s2id_problem_select > a';
const PBLM_INPUT = '#s2id_autogen1_search';

const FILE_UPLD = '#sub_files_input';
const FILE_DIR = "/home/moad/Desktop/ok.cpp";
const TEXT_BTN_AREA = "#show_editor_button_sub_code";
const TEXT_AREA  = "#sub_code > textarea";

const SPAN_SUB = "#wrapper > div > div:nth-child(2) > section > table > tbody > tr:nth-child(3) > td.status.rejected.middle";

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
  await page.click(USERNAME_SELECTOR);
  await page.keyboard.type(C.username);
  await page.click(PASSWORD_SELECTOR);
  await page.keyboard.type(C.password);
  await page.click(CTA_SELECTOR);
}


async function Submit(url){

  await page.goto(url);
  //uploading the file
  const input = await page.$('input[type=file]');
  await input.uploadFile(FILE_DIR);
  //selecting the pblm
  await page.click(SLCT_PBLM);
  await page.keyboard.type('hello');
  await page.keyboard.press('Enter');
  //submitting the solution
  await page.click(BTN_SELECTOR);
  await page.screenshot({ path: './image.jpg', type: 'jpeg' });
  console.log(page.url());
}
async function checksubmission(url){
  await page.goto(url);

}

(async () => {

  await startBrowser();
  page.setViewport({width: 1366, height: 768});
  await Login(login_url);
  await Submit(submit_url);
  process.exit(0);

})();
