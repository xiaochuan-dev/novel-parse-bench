import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage();

// 访问百度
await page.goto('https://www.baidu.com/');

// 聚焦到搜索框并输入搜索内容
await page.focus('#kw');
await page.type('#kw', '免费小说网', { delay: 100 });

// 点击搜索按钮
await page.click('#su');

// 等待搜索结果加载
await page.waitForSelector('#content_left');

// 获取搜索结果页面的 HTML
const html = await page.content();

const firstResultSelector = '#content_left a'; // 第一个搜索结果的选择器
await page.click(firstResultSelector);

await page.waitForNavigation();

const html2 = await page.content();

console.log(html2);

// 关闭浏览器
await browser.close();
