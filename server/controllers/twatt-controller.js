const OAuth = require('oauth');
require('dotenv').config()

var oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  process.env.APP_CONSUMER_KEY,
  process.env.APP_SECRET,
  '1.0A',
  null,
  'HMAC-SHA1'
);


var twitterSearch = function(req, res) {
  oauth.post(
    `https://api.twitter.com/1.1/search/tweets.json?q=${req.body.data}&result_type=recent`,
    process.env.USER_TOKEN,
    process.env.USER_SECRET,
    `${req.body.data}`,
    `text`,
    function(e, data) {
      if (e) console.error(e)
      res.send(data)
    }
  )
}

var twitterTimeline = function(req, res) {
  oauth.get(
    'https://api.twitter.com/1.1/statuses/user_timeline.json',
    process.env.USER_TOKEN,
    process.env.USER_SECRET,
    function(e, data) {
      var tweetArr = []
      var tweets = JSON.parse(data)
      tweets.forEach((tweet) => {
        tweetArr.push(tweet.text)
      })
      res.send(tweetArr)
    }
  )
}

var postTweet = function(req, res) {
  oauth.post(
    `https://api.twitter.com/1.1/statuses/update.json?status=${req.body.data}`,
    process.env.USER_TOKEN,
    process.env.USER_SECRET,
    `${req.body.data}`,
    'text',
    function(e, data) {
      if (e) console.error(e)
      res.send(data)
    }
  )
}

module.exports = {
  twitterSearch, twitterTimeline, postTweet
}
