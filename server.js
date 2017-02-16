const rp = require('request-promise');
const cheerio  = require('cheerio');
const Promise = require('bluebird');
const readline = require('readline');
const twilio = require('twilio');
const client = twilio('AC1816e2688d6a7920c8957aac3050d0ec', '2de256037a8d8f32e658c846dfba11ba');

const scraper = require('./scraper.js');
const { checkCache, generateString, getSomeItems, sendSMS } = require('./util.js'); 
	
let cache;

//make a chron job
scraper(readline, Promise, rp, cheerio)
.then((data) => {
	if (!cache) {
		cache = data;
	} else {
		cache = updateCache(data);
	}
	const newItems = checkCache(cache,data);
	const diff = generateString(newItems);
	const firstTen = generateString(getSomeItems(cache,10));
	sendSMS(client,firstTen);
});

			
	
	

