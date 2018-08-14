const lighthouse = require('lighthouse')
const chromeLauncher = require('chrome-launcher')
const Crawler = require('easycrawler')

// regex to check for a proper URL
// starts at 2 'cuz "node index" are 0 and 1, respectively
if(!process.argv[2].match(/(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+/g)) {
  console.error("Please use a correct URL.")
  process.exit(1)
}
const URL = process.argv[2]

console.log(`About to crawl ${URL}`)

const crawler = new Crawler({
    thread: 5, // how many threads at once (async)
    logs: false, // debug logging
    depth: 1, // crawl depth
    headers: {}, // headers to send
    // onlyCrawl: [], // only URLs containing these strings
    // reject: [], // no URLs with these strings
    onSuccess: crawlerSuccess,
    onError: crawlerError,
    onFinished: crawlerFinished
})

/**
  Deals with the URL request succeeding

  @param {object} data - the data of the returned document
*/
function crawlerSuccess(data) {
  // console.log(data.url) // successful URL
  // console.log(data.body) // successul URL HTML body
}

/**
  Deals with the URL request failing

  @param {object} data
*/
function crawlerError(data) {
  // console.log(data.url) // failed URL
  // console.log(data.status) // failed URL status code
}

/**
  Deals with the arrays of crawled and discovered links

  @param {object} urls - crawled and discovered URL arrays
*/
function crawlerFinished(urls) {
  if(
    urls.crawled.length === 0
    && urls.discovered.length === 0
    ) {
    console.error("\nPlease check your URL exists and has links in it.")
    return
  }
  console.log("Crawled URLs:", urls.crawled)
  console.log("Discovered URLs:", urls.discovered)
}

// crawl given URL
crawler.crawl(URL)

// auditing soon:tm:
