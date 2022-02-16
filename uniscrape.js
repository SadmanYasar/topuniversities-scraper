/* eslint-disable no-console */
/* eslint-disable no-undef */

require('dotenv').config();
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const url = 'https://www.topuniversities.com/university-rankings/world-university-rankings/2022';

const getUniList = async () => {
  try {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector('div[data-value="100"]');
    await page.waitForSelector('.uni-link');

    await Promise.all([
      page.waitForFunction(() => document.querySelectorAll('.uni-link').length === 100),
      page.evaluate(() => document.querySelector('div[data-value="100"]').click()),
    ]);

    const html = await page.content();
    const $ = cheerio.load(html);
    console.log($('.uni-link').toArray().map((name) => $(name).text()));

    await browser.close();
  } catch (error) {
    console.log(error);
  }
};

module.exports = getUniList;
