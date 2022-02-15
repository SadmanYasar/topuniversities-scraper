const { default: axios } = require('axios');
const cheerio = require('cheerio');
/* eslint-disable no-console */

const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';

const getData = async () => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }

  return null;
};

const displayData = () => {
  getData().then((html) => {
    const $ = cheerio.load(html);
    console.log($('tbody > tr > td > b > a').length);
    console.log($('tbody > tr > td > b > a'));
  });
};

module.exports = displayData;
