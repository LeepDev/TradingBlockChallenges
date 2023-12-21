const express = require('express')
const router = express.Router()
const fmpCtrl = require('../../controllers/api/fmp')
const ensureLoggedIn = require('../../config/ensureLoggedIn')

router.get('/getCurrentPrice/:stock', ensureLoggedIn, fmpCtrl.getCurrentPrice)
router.get('/getCurrentQuote/:stock', ensureLoggedIn, fmpCtrl.getCurrentQuote)

module.exports = router