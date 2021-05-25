var express = require('express');
var router = express.Router();
var knex = require('../knex')
const jwt = require('jsonwebtoken')


router.get('/likes', authenticateToken, function(req, res, next) {
  knex.select("*").from("likes").then(likes => res.send(likes)).catch(err => {
    res.statusCode(500)
    res.send("We fucked up.", err)
  })
});

router.post('/likes', authenticateToken, function(req, res, next) {
  knex('likes').insert(req.body).then()
  res.send("posting cool stuff");
});

router.delete('/likes/:pageid', authenticateToken, function(req, res, next) {
  const { pageid } = req.params
  knex('likes')
    .del()
    .where('page_id', pageid)
    .then(result => res.send('Gone forever...'))
    .catch(err => {
      res.statusCode(500)
      res.send("Something broke. Try again later.")  
    })
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)
      req.user = user
      next()
  })
}   

module.exports = router;
