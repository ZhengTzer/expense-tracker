const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
  categoryName: {
    type: String,
    required: true
  },
  categoryIcon: {
    type: String,
    required: true
  }
})

// Export module
module.exports = mongoose.model('categoryTables', categorySchema)
