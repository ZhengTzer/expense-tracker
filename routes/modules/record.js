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
  console.log(req.body)
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

// edit
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return recordDBTable
    .findById(id)
    .lean()
    .then((singleRecord) => res.render('edit', { singleRecord }))
    .catch((error) => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, date, category, amount } = req.body

  return recordDBTable
    .findById(id)
    .then((singleRecord) => {
      singleRecord.name = name
      singleRecord.date = date
      singleRecord.category = category
      singleRecord.amount = amount
      return singleRecord.save()
    })
    .then(() => res.redirect(`/`))
    .catch((error) => console.log(error))
})

// module export
module.exports = router
