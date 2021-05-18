var express = require('express');
var router = express.Router();
var knex = require('../knex')

router.get('/likes', function(req, res, next) {
  knex.select("*").from("likes").then(likes => res.send(likes)).catch(err => {
    res.statusCode(500)
    res.send("We fucked up.")
  })
});

router.post('/likes', function(req, res, next) {
  knex('likes').insert(req.body).then()
  res.send("posting cool stuff");
});

module.exports = router;
