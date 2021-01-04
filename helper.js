const helper = require('handlebars')

// register helper
helper.registerHelper('ifEquals', function (job, targetJob, options) {
  if (job === targetJob) {
    return options.fn(this)
  }
  return options.inverse(this)
})

module.exports = helper
