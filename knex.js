const knex = require('knex')({
    client: 'pg',
    connection: {
      host : 'localhost',
      port : '5433',
      user : 'likelocation',
      password : 'likelocation',
      database : 'likelocation',
    },
    pool: {
      min: 3,
      max: 7,
      afterCreate: function (conn, done) {
        console.log("connected to db")
        done(null, conn)
      }
    }
  });
  
 module.exports = knex 