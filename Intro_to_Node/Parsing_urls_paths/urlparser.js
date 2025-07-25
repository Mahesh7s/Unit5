// urlparser.js
const url = require("url");
const querystring = require("querystring");

function parseURL(fullURL) {
  const parsed = url.parse(fullURL);
  const queryParams = querystring.parse(parsed.query);

  return {
    hostname: parsed.hostname,
    pathname: parsed.pathname,
    query: queryParams
  };
}

module.exports = parseURL;
