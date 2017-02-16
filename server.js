const express = require('express');
const app = express();
const rp = require('request-promise');
const cheerio  = require('cheerio');
const Promise = require('bluebird');
const readline = require('readline');
const scraper = require('./scraper.js');

scraper(readline, Promise, rp, cheerio)
.then((data) => console.log(data));

