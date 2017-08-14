const express = require('express');
const db = require('./db')

const app = express();

app.get('/', (req, res, next) => {
  db.query('SELECT * FROM runner', [], (err, results) => {
    if (err) {
      return next(err)
    }
    res.send(results.rows[0])
  });
});


app.listen(3000, () => {
  console.log('server listening on 3000...')
});
