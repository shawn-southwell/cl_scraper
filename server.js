const express = require('express');
const app = express();
const rp = require('request-promise');
const cheerio  = require('cheerio');
const Promise = require('bluebird');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
	terminal: false
});

const data = [];

rl.question('WHAT YOU NEED \n', (answer) => {

	const query = answer;
	rl.question('How many pages? \n', (int) => {

			const URL = `https://losangeles.craigslist.org/search/sss?query=${query}&sort=rel&s=`;
			const requests = [...Array(+int).keys()]
				.map(int => rp(URL + (int * 100)));

			Promise.each(requests, (request) => {
					const $ = cheerio.load(request);
					const totalCount = $('span.totalcount').html();
					$('.rows').children().each((i,row) => {
						const title = $(row).find('.result-title').text();
						const price = $(row).find('.result-price').html() || 'no price avail';
						const href  = $(row).find('.result-info').find('a').attr('href');
						const link = `http://losangeles.craigslist.org/${href}`;
						data.push({ title, price, link });
					});
			})
				.then(() => console.log(data))
				.catch(err => console.error(err));
	});
});

