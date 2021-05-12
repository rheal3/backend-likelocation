var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/likes', function(req, res, next) {
  res.send('hello goodbye')
});

router.post('/like', function(req, res, next) {
  res.send("posting cool stuff");
});

module.exports = router;
