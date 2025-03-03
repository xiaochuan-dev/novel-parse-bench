import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();

await page.goto('https://cdhrss.chengdu.gov.cn/cdrsj/c151971/sydwzp.shtml');

await page.waitForNavigation({ waitUntil: 'networkidle0' })

// await page.waitForSelector('.header');

const html = await page.content();
console.log(html);

// 关闭浏览器
await browser.close();
