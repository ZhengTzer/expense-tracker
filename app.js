// declare
const express = require('express')
const exphbs = require('express-handlebars')
const handlebars = require('handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const helper = require('./helper')
const port = process.env.PORT || 3000
const app = express()

// routes setting
const routes = require('./routes')
require('./config/mongoose')

// engine setting
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))

// helper check category filter

// get from routes
app.use(routes)

// port listening
app.listen(port, () => {
  console.log(`App is listening to http://localhost:${port}`)
})
