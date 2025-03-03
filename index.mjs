import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  devtools: false,
});
const page = await browser.newPage();

await page.setRequestInterception(true);
page.on('request', (request) => {
  request.continue();
});
page.on('response', async (response) => {
  const url = response.url();
  const status = response.status();

  if (status === 412 || status === 413) {
    console.log(`拦截到 412 响应，URL: ${url}`);

    await response._request._respond({
      status: 200,
      headers: response.headers(),
      body: await response.buffer(),
    });

  }
});

await page.goto('https://cdhrss.chengdu.gov.cn/cdrsj/c151971/sydwzp.shtml');

await page.waitForNavigation({ waitUntil: 'networkidle0' });

await page.waitForSelector('.header');

const html = await page.content();
console.log(html);

// 关闭浏览器
await browser.close();
