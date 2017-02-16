module.exports = function scrape(readline, Promise, rp, cheerio) {

  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    });

    rl.question('What are you looking for? \n', (answer) => {
    
      const query = answer;

      rl.question('How many pages? \n', (int) => {

        const URL = `https://losangeles.craigslist.org/search/sss?query=${query}&sort=rel&s=`;

        const requests = [...Array(+int).keys()]
          .map(int => rp(URL + (int * 100)));
        
        Promise.reduce(requests, (data, request) => {
          const $ = cheerio.load(request);
          const totalCount = $('span.totalcount').html();
          $('.rows').children().each((i,row) => {
            const title = $(row).find('.result-title').text();
            const price = $(row).find('.result-price').html() || 'no price avail';
            const href  = $(row).find('.result-info').find('a').attr('href');
            const link = `http://losangeles.craigslist.org/${href}`;
            data.push({ title, price, link });
          });
          return data;
        }, [])
        .then(data => resolve(data));
      });
    });
  })
}

