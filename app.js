// declare
const express = require('express')
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

// app usage
const app = express()

// enginge setting
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))

// route setting
app.get('/', (req, res) => {
  res.render('index')
})

app.get('/new', (req, res) => {
  res.render('new')
})

app.get('/edit', (req, res) => {
  res.render('edit')
})

// port listening
app.listen(port, () => {
  console.log(`App is listening to http://localhost:${port}`)
})
