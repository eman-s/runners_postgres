const express = require('express');
const db = require('./db');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');

const app = express();

//configure mustache
app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));


app.get('/', (req, res, next) => {
  db.query('SELECT * FROM runner', [], (err, results) => {
    if (err) {
      return next(err)
    }
    // res.send(results.rows)
    res.render('index', {runners:results.rows})
  });
});

app.get('/add_runner', (req,res) => {
  res.render('add')
});

app.post('/add_runner', (req, res, next) => {
  let addRunner =
  `INSERT INTO runner(
    division,
    sponsor,
    name
  )
  VALUES(
    '${req.body.division}',
    '${req.body.sponsor}',
    '${req.body.name}'
  )`;
  db.query(addRunner, (err) =>{
    if (err){
      return next(err)
    }
    res.redirect('/')
  });
});

app.get('/:id', (req, res, next) => {
  const id = req.params.id
  db.query(`SELECT * FROM runner WHERE bib_id = ${id}`, (err, results) => {
    if (err) {
      return next(err)
    }
    res.render('runner', {runner:results.rows})
  });
});




app.listen(3000, () => {
  console.log('server listening on 3000...')
});
