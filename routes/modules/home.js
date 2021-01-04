const express = require('express')
const router = express.Router()
const recordDBTable = require('../../models/record')
const categoryDBTable = require('../../models/category')

// index page
router.get('/', (req, res) => {
  // category filter
  const categoryFilter = req.query
  const categoryFilterToFront = req.query.category
  let totalAmount = 0

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
      return totalAmount
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
      res.render('index', {
        recordList,
        totalAmount,
        categoryFilterToFront
      })
    )
    .catch((error) => console.log(error))
})

// module export
module.exports = router
