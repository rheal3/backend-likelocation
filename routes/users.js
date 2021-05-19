var express = require('express');
var router = express.Router();
var knex = require('../knex')
const bcrypt = require('bcrypt');
const saltRounds = 10;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', function(req, res, next) {
  const {email, password} = req.body
  bcrypt.hash(password, saltRounds, function(err, password_hash) {
    knex('account').insert({email, password_hash}).then(results => {
      res.send('ok')
    }).catch ((err) => {
      res.send(err)
    })
  });
})

module.exports = router;
