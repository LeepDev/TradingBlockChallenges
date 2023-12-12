const axios = require('axios')

module.exports = {
    getCurrentPrice,
}

async function getCurrentPrice(req,res) {
    try {
        const fmp = require('financialmodelingprep')(process.env.FMP_API_KEY)
        const response = fmp.stock(req.params.stock).current_price().then(response => {
            if (response.companiesPriceList)
                res.json(response)
            else if (response.status === 429)
                res.json({error: "Ran out of request for this minute"})
            else
                res.json({error: "An error has occurred. Please refresh the page or contact the administrator."})
        });
    } catch (err) {
        res.status(400).json(err)
    }
}