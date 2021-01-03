const express = require('express')
const router = express.Router()
const recordDBTable = require('../../models/record')

// routes
// new
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const { name, category, date, amount } = req.body
  return recordDBTable
    .create({
      name,
      category,
      date,
      amount
    })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

// remove
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return recordDBTable
    .findById(id)
    .then((deleteRecord) => deleteRecord.remove())
    .then(() => res.redirect('/'))
})

// module export
module.exports = router
