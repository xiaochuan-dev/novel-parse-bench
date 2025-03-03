import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  devtools: false,
});
const page = await browser.newPage();

await page.setRequestInterception(true);
page.on('request', async (request) => {
  const url = request.url();

  if (url.includes('cdrsj/c151971/sydwzp.shtml')) {
    const response = await fetch(url);
    const body = await response.text();

    await request.respond({
      status: 200,
      headers: response.headers, 
      body: body,
    });
  } else {
    request.continue();
  }
});

await page.goto('https://cdhrss.chengdu.gov.cn/cdrsj/c151971/sydwzp.shtml');

await page.waitForNavigation({ waitUntil: 'networkidle0' });

await page.waitForSelector('.header');

const html = await page.content();
console.log(html);

// 关闭浏览器
await browser.close();
