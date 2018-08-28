const puppeteer = require('puppeteer');
const { sleep, genRandomEmail } = require('./utils');
const { subject, content, loginInfo } = require('./data');

const instanceCount = 5;

async function init() {
  let i = 0;
  while(i++ < instanceCount) {
    let browser = await puppeteer.launch({
      headless: false,
      defaultViewport: {
        width: 1440,
        height: 900
      }
    });
    let page = await browser.newPage();
    await page.goto('https://mail.sina.com.cn');
    await sleep(1000);
    await doLogin(page);
    await send(page, genRandomEmail().slice(i * instanceCount, instanceCount).join(','));
    await browser.close();
  }
};

async function doLogin(page) {
  await page.type('#freename', loginInfo.email, { delay: 50 });
  await sleep(200);
  await page.type('#freepassword', loginInfo.password, { delay: 50 });
  await sleep(2000);
  await page.keyboard.press('Enter');
  await sleep(2000);
}

async function send(page, emails) {
  console.log(emails);
  
  await page.click('.wrWriteBtn');
  await sleep(2000);
  await page.keyboard.type(emails, { delay: 100 });
  await page.keyboard.press('Tab');
  await page.keyboard.type(subject, { delay: 50 });
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.type(content, { delay: 50 });
  await page.click('.mailPubText');
  await sleep(2000);
}

init();
