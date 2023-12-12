const express = require('express')
const router = express.Router()
const fmpCtrl = require('../../controllers/api/fmp')
const ensureLoggedIn = require('../../config/ensureLoggedIn')

router.get('/getCurrentPrice/:stock', ensureLoggedIn, fmpCtrl.getCurrentPrice)

module.exports = router