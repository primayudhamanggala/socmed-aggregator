const express = require('express');
const router = express.Router()
const twattController = require('../controllers/twatt-controller');

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/search', twattController.twitterSearch)

router.get('/timeline', twattController.twitterTimeline)

router.post('/post', twattController.postTweet)

module.exports = router;
