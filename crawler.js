(function() {
  'use strict';
  var crawler    = require('simplecrawler');

  var MAX_DEPTH = 2,
      INTERVAL_LENGTH = 1000,
      MAX_CONCURRENCY = 1;

  var csCrawler = crawler.crawl('http://example.com/');
  csCrawler.maxDepth = MAX_DEPTH;
  csCrawler.interval = INTERVAL_LENGTH;
  csCrawler.maxConcurrency = MAX_CONCURRENCY;

  csCrawler.on("fetchcomplete", function(queueItem) {
    console.log('fetchcomplete!');
  });

  csCrawler.on('fetcherror', function(queueItem, response) {
    console.log('Error!');
    console.log(response);
  });

  csCrawler.on('complete', function() {
    console.log('finished!');
  });

  csCrawler.start();
  console.log('started crawling!');


  crawler.crawl("http://example.com/")
    .on("fetchcomplete", function(queueItem) {
        console.log("Completed fetching resource:", queueItem.url);
    });
})();
