const axios = require('axios')

module.exports = {
    getCurrentPrice,
}

async function getCurrentPrice(req,res) {
    try {
        const fmp = require('financialmodelingprep')(process.env.FMP_API_KEY)
        fmp.stock(req.params.stock).current_price().then(response => {
            if (typeof response === 'object' && response !== null && response.constructor === Object) {
                if (response.companiesPriceList)
                    res.json(response)
                else if (response.status === 429) {
                    console.log(response)
                    res.json({error: "Ran out of request for this minute"})
                } else {
                    console.log(response)
                    res.json({error: "An error has occurred. Please refresh the page or contact the administrator."})
                }
            } else {
                console.log(response)
                res.json({error: "Response object is not json. Please refresh the page or contact the administrator."})
            }
        });
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}