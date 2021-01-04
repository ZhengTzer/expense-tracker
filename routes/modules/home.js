const express = require('express')
const router = express.Router()
const recordDBTable = require('../../models/record')
const categoryDBTable = require('../../models/category')

// index page
router.get('/', (req, res) => {
  // category filter
  categoryFilter = req.query
  categoryFilterToFront = req.query.category

  // get sum total amount
  recordDBTable.aggregate(
    [
      {
        $match: categoryFilter
      },
      {
        $group: { _id: null, totalAmount: { $sum: '$amount' } }
      }
    ],
    function (err, result) {
      totalAmount = result[0].totalAmount
    }
  )

  // get record list
  recordDBTable
    .aggregate([
      {
        $match: categoryFilter
      },
      {
        $lookup: {
          from: 'categorytables',
          localField: 'category',
          foreignField: 'categoryId',
          as: 'iconName'
        }
      }
    ])
    .sort({ date: 'desc' })
    .then((recordList) =>
      res.render('index', { recordList, totalAmount, categoryFilterToFront })
    )
    .catch((error) => console.log(error))
})

// module export
module.exports = router
