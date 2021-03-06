/* eslint-disable no-undef */
require('dotenv').config();
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const logger = require('./utils/logger');

const url = process.env.URL;

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
    const list = $('.uni-link').toArray().map((name) => $(name).text());
    logger.log(list);

    await browser.close();

    return list;
  } catch (error) {
    logger.error(error);
  }

  return null;
};

module.exports = getUniList;
