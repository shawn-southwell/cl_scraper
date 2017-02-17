const rp = require('request-promise');
const cheerio  = require('cheerio');
const Promise = require('bluebird');
const readline = require('readline');
const twilio = require('twilio');
//this will create an error until you generate a credentials file with your own information
const { authToken, SSID, twilioNum, myNum } = require('./credentials.js');
const client = twilio(SSID,authToken);

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
      console.log(firstTen);
      sendSMS(client, myNum, twilioNum, firstTen);
    });

})();
