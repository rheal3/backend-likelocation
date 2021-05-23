require('dotenv').config()
var express = require('express');
var router = express.Router();
var knex = require('../knex')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')


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

router.post('/login', function(req, res, next) {
  const {email, password} = req.body

  knex.select("*").from('account').where('email', email).then(results => {
    if (results.length > 0) {
      bcrypt.compare(password, results[0].password_hash, function(err, result) {
        if (result) {
          const user = { id : results[0].id }
          const accessToken = generateAccessToken(user)
          const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
          refreshTokens.push(refreshToken)
          res.json({accessToken: accessToken, refreshToken: refreshToken})
        }
      }); 
    } else {
      res.send(false)
    }
  }).catch ((err) => {
    res.send(err)
  })
})

// store in db
let refreshTokens = [] 

router.post('/token', (req, res) => {
  const refreshToken = req.body.token
  if (refreshToken == null) return res.sendStatus(401)
  // query db to see if refresh token there
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)
      const accessToken = generateAccessToken({ id: user.id })
      res.json({ accessToken: accessToken })
  })
})

router.delete('/logout', (req, res) => {
  // query db
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204)
})

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' })
}


module.exports = router;
