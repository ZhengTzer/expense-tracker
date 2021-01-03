// mongoose connection
const db = require('../../config/mongoose')
const recordModel = require('../record')

// add seed data
db.once('open', () => {
  const promises = []
  promises.push(
    recordModel.create(
      {
        name: '買暖氣',
        category: '1',
        date: '2021-01-01',
        amount: '1000'
      },
      {
        name: '捷運卡儲值',
        category: '2',
        date: '2021-01-01',
        amount: '1000'
      },
      {
        name: '看電影',
        category: '3',
        date: '2021-01-01',
        amount: '500'
      },
      {
        name: '吃蛋糕',
        category: '4',
        date: '2021-01-01',
        amount: '100'
      },
      {
        name: '剪頭髮',
        category: '5',
        date: '2021-01-01',
        amount: '300'
      },
      {
        name: '買新椅子',
        category: '1',
        date: '2021-01-03',
        amount: '1500'
      }
    )
  )
  Promise.all(promises).then(() => {
    console.log('insert sample record data, done!')
    db.close()
  })
})
