/* eslint-disable max-len */
/* eslint-disable no-console */
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const url = 'https://www.topuniversities.com/university-rankings/world-university-rankings/2022';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForSelector('.uni-link');
  const html = await page.content();
  const $ = cheerio.load(html);
  console.log($('.uni-link').toArray().map((name) => $(name).text()));
  await browser.close();
})();
