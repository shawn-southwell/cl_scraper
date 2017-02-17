const rp = require('request-promise');
const cheerio  = require('cheerio');
const Promise = require('bluebird');
const readline = require('readline');
const twilio = require('twilio');
const client = twilio('TWILO_ACCOUNT_SSID', 'TWILIO_AUTH_TOKEN');

const scraper = require('./scraper.js');
const { checkCache, generateString, getSomeItems, sendSMS } = require('./util.js'); 

(function(){
  let cache;
  //make scraper a chron job

  scraper(readline, Promise, rp, cheerio)
    .then(data => {
      cache = !cache? data : updateCache(data);	
      const newItems = checkCache(cache,data);
      const diff = generateString(newItems);
      const firstTen = generateString(getSomeItems(cache,10));
      sendSMS(client,firstTen);
    });

})();
