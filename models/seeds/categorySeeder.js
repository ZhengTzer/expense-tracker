// mongoose connection
const db = require('../../config/mongoose')
const categoryModel = require('../category')

// add seed data
db.once('open', () => {
  const promises = []
  promises.push(
    categoryModel.create(
      {
        categoryName: '家居物業',
        categoryId: '1',
        categoryIcon: 'home'
      },
      {
        categoryName: '交通出行',
        categoryId: '2',
        categoryIcon: 'shuttle-van'
      },
      {
        categoryName: '休閒娛樂',
        categoryId: '3',
        categoryIcon: 'grin-beam'
      },
      {
        categoryName: '餐飲食品',
        categoryId: '4',
        categoryIcon: 'utensils'
      },
      {
        categoryName: '其他',
        categoryId: '5',
        categoryIcon: 'pen'
      }
    )
  )
  Promise.all(promises).then(() => {
    console.log('insert sample category data, done!')
    db.close()
  })
})
