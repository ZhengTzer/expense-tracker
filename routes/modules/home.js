const express = require('express')
const router = express.Router()
const recordDBTable = require('../../models/record')
const categoryDBTable = require('../../models/category')

// index page
router.get('/', (req, res) => {
  // db side sum total amount
  recordDBTable.aggregate(
    [{ $group: { _id: null, totalAmount: { $sum: '$amount' } } }],
    function (err, result) {
      totalAmount = result[0].totalAmount
    }
  )

  // join 2 collection
  recordDBTable
    .aggregate([
      {
        $match: {}
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
    .then((recordList) => res.render('index', { recordList, totalAmount }))
    .catch((error) => console.log(error))
})

// module export
module.exports = router
