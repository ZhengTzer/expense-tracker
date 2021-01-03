const express = require('express')
const router = express.Router()

// route
const home = require('./modules/home')
/* const record = require('./modules/record') */

// route
router.use('/', home)
/* router.use('/record', record) */

// module export
module.exports = router
