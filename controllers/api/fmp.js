const axios = require('axios')

module.exports = {
    getShortQuote,
}

async function getShortQuote(req,res) {
    try {
        const fmp = require('financialmodelingprep')(process.env.FMP_API_KEY)
        const response = fmp.stock(req.params.stock).current_price().then(response => {
            res.json(response)
        });
        
        // const response = await axios.get(`https://financialmodelingprep.com/api/v3/quote-short/${req.params.stock}?apikey=${process.env.FMP_API_KEY}`)
        // res.json(response)
    } catch (err) {
        res.status(400).json(err)
    }
}