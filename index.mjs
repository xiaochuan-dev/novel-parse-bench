import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  devtools: false,
});
const page = await browser.newPage();


await page.setRequestInterception(true);
page.on('request', (request) => {
  request.continue(); // 继续请求
});

// 拦截响应
page.on('response', async (response) => {
  const url = response.url();
  const status = response.status();

  if (status === 412 || status === 413) {

    const responseBody = await response.text();

    console.log('------------------');
    console.log(responseBody);
    console.log('------------------');


    // // 发送修改后的响应
    // await page.evaluate((body) => {
    //   console.log(body);
    //   document.body.innerHTML = body;
    // }, responseBody);
  }
});

await page.goto('https://cdhrss.chengdu.gov.cn/cdrsj/c151971/sydwzp.shtml');

await page.waitForNavigation({ waitUntil: 'networkidle0' });

await page.waitForSelector('.header');

const html = await page.content();
console.log(html);

// 关闭浏览器
await browser.close();
