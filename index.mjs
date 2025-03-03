import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage();

await page.goto('https://cdhrss.chengdu.gov.cn/cdrsj/c151971/sydwzp.shtml');


await page.waitForSelector('.header');



// 关闭浏览器
await browser.close();
