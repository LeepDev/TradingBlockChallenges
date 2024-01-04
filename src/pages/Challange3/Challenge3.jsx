import React, { useState, useEffect } from 'react';
import { getCurrentQuote } from '../../utilities/fmp-service'

const DEFAULT_QUOTE = {
    "MS": {
        "symbol": "MS",
        "name": "Morgan Stanley",
        "price": 92.19909207255206,
        "changesPercentage": 0.31453821407035776,
        "change": 0.2890920725520658,
        "dayLow": 91.66,
        "dayHigh": 93.135,
        "yearHigh": 100.99,
        "yearLow": 69.42,
        "marketCap": 151927860150,
        "priceAvg50": 81.0834,
        "priceAvg200": 84.2968,
        "exchange": "NYSE",
        "volume": 3630190,
        "avgVolume": 8907162,
        "open": 92.15,
        "previousClose": 91.91,
        "eps": 5.6,
        "pe": 16.53,
        "earningsAnnouncement": "2024-01-16T12:30:00.000+0000",
        "sharesOutstanding": 1641310000,
        "timestamp": 1704394309
    },
    "AAPL": {
        "symbol": "AAPL",
        "name": "Apple Inc.",
        "price": 182.47168270937962,
        "changesPercentage": -0.9651654223177091,
        "change": -1.7783172906203788,
        "dayLow": 180.88,
        "dayHigh": 183.0872,
        "yearHigh": 199.62,
        "yearLow": 124.76,
        "marketCap": 2845541843280,
        "priceAvg50": 187.0648,
        "priceAvg200": 179.7831,
        "exchange": "NASDAQ",
        "volume": 40281195,
        "avgVolume": 53567116,
        "open": 182.15,
        "previousClose": 184.25,
        "eps": 6.14,
        "pe": 29.8,
        "earningsAnnouncement": "2024-01-31T10:59:00.000+0000",
        "sharesOutstanding": 15552800000,
        "timestamp": 1704394310
    },
    "AMZN": {
        "symbol": "AMZN",
        "name": "Amazon.com, Inc.",
        "price": 145.3809313454364,
        "changesPercentage": -2.0806012356459824,
        "change": -3.08906865456359,
        "dayLow": 144.05,
        "dayHigh": 147.37,
        "yearHigh": 155.63,
        "yearLow": 81.43,
        "marketCap": 1503648670000,
        "priceAvg50": 143.9422,
        "priceAvg200": 128.2308,
        "exchange": "NASDAQ",
        "volume": 32588583,
        "avgVolume": 50557703,
        "open": 145.59,
        "previousClose": 148.47,
        "eps": 1.9,
        "pe": 76.58,
        "earningsAnnouncement": "2024-01-31T10:59:00.000+0000",
        "sharesOutstanding": 10334000000,
        "timestamp": 1704394309
    },
    "MSFT": {
        "symbol": "MSFT",
        "name": "Microsoft Corporation",
        "price": 370.335,
        "changesPercentage": -0.0715,
        "change": -0.265,
        "dayLow": 369.92,
        "dayHigh": 373.1,
        "yearHigh": 384.3,
        "yearLow": 219.35,
        "marketCap": 2752426007100,
        "priceAvg50": 365.2396,
        "priceAvg200": 330.97635,
        "exchange": "NASDAQ",
        "volume": 9481915,
        "avgVolume": 26012645,
        "open": 370.665,
        "previousClose": 370.6,
        "eps": 10.3,
        "pe": 35.95,
        "earningsAnnouncement": "2024-01-22T00:00:00.000+0000",
        "sharesOutstanding": 7432260000,
        "timestamp": 1704394310
    },
    "GOOGL": {
        "symbol": "GOOGL",
        "name": "Alphabet Inc.",
        "price": 137.48,
        "changesPercentage": -1.0366,
        "change": -1.44,
        "dayLow": 137.225,
        "dayHigh": 139.16,
        "yearHigh": 142.68,
        "yearLow": 84.86,
        "marketCap": 1728858216406,
        "priceAvg50": 133.6704,
        "priceAvg200": 125.28855,
        "exchange": "NASDAQ",
        "volume": 11406082,
        "avgVolume": 29221229,
        "open": 138.42,
        "previousClose": 138.92,
        "eps": 5.22,
        "pe": 26.34,
        "earningsAnnouncement": "2024-01-31T21:00:00.000+0000",
        "sharesOutstanding": 12575343442,
        "timestamp": 1704394310
    },
    "TSLA": {
        "symbol": "TSLA",
        "name": "Tesla, Inc.",
        "price": 240.95,
        "changesPercentage": 1.0484,
        "change": 2.5,
        "dayLow": 237.73,
        "dayHigh": 242.7,
        "yearHigh": 299.29,
        "yearLow": 101.81,
        "marketCap": 765960774000,
        "priceAvg50": 233.9912,
        "priceAvg200": 229.8612,
        "exchange": "NASDAQ",
        "volume": 72800265,
        "avgVolume": 119449730,
        "open": 239.25,
        "previousClose": 238.45,
        "eps": 3.1,
        "pe": 77.73,
        "earningsAnnouncement": "2024-01-23T21:00:00.000+0000",
        "sharesOutstanding": 3178920000,
        "timestamp": 1704394311
    },
    "META": {
        "symbol": "META",
        "name": "Meta Platforms, Inc.",
        "price": 347.705,
        "changesPercentage": 0.9391,
        "change": 3.235,
        "dayLow": 343.3987,
        "dayHigh": 348.1499,
        "yearHigh": 361.9,
        "yearLow": 124.54,
        "marketCap": 893554111147,
        "priceAvg50": 329.6596,
        "priceAvg200": 287.63376,
        "exchange": "NASDAQ",
        "volume": 6184555,
        "avgVolume": 18667183,
        "open": 344.5,
        "previousClose": 344.47,
        "eps": 11.33,
        "pe": 30.69,
        "earningsAnnouncement": "2024-01-30T00:00:00.000+0000",
        "sharesOutstanding": 2569862703,
        "timestamp": 1704394311
    },
    "NVDA": {
        "symbol": "NVDA",
        "name": "NVIDIA Corporation",
        "price": 482.68,
        "changesPercentage": 1.4694,
        "change": 6.99,
        "dayLow": 475.08,
        "dayHigh": 485,
        "yearHigh": 505.48,
        "yearLow": 140.34,
        "marketCap": 1192219600000,
        "priceAvg50": 469.2984,
        "priceAvg200": 408.19635,
        "exchange": "NASDAQ",
        "volume": 21221803,
        "avgVolume": 42190506,
        "open": 477.67,
        "previousClose": 475.69,
        "eps": 7.57,
        "pe": 63.76,
        "earningsAnnouncement": "2024-02-21T10:59:00.000+0000",
        "sharesOutstanding": 2470000000,
        "timestamp": 1704394311
    },
    "V": {
        "symbol": "V",
        "name": "Visa Inc.",
        "price": 259.775,
        "changesPercentage": 0.6958,
        "change": 1.795,
        "dayLow": 258,
        "dayHigh": 261.04,
        "yearHigh": 263.25,
        "yearLow": 208.76,
        "marketCap": 522170866598,
        "priceAvg50": 250.3602,
        "priceAvg200": 237.97725,
        "exchange": "NYSE",
        "volume": 1507214,
        "avgVolume": 5868564,
        "open": 258.07,
        "previousClose": 257.98,
        "eps": 8.28,
        "pe": 31.37,
        "earningsAnnouncement": "2024-01-24T00:00:00.000+0000",
        "sharesOutstanding": 2010088987,
        "timestamp": 1704394309
    },
    "JPM": {
        "symbol": "JPM",
        "name": "JPMorgan Chase & Co.",
        "price": 172.32,
        "changesPercentage": 1.198,
        "change": 2.04,
        "dayLow": 170.64,
        "dayHigh": 173.35,
        "yearHigh": 173.35,
        "yearLow": 123.11,
        "marketCap": 498178843200,
        "priceAvg50": 154.2586,
        "priceAvg200": 145.72086,
        "exchange": "NYSE",
        "volume": 5430216,
        "avgVolume": 9420161,
        "open": 170.64,
        "previousClose": 170.28,
        "eps": 16.75,
        "pe": 10.29,
        "earningsAnnouncement": "2024-01-12T13:30:00.000+0000",
        "sharesOutstanding": 2891010000,
        "timestamp": 1704394310
    },
    "MA": {
        "symbol": "MA",
        "name": "Mastercard Incorporated",
        "price": 421.99,
        "changesPercentage": 0.7689,
        "change": 3.22,
        "dayLow": 418.28,
        "dayHigh": 423.45,
        "yearHigh": 428.36,
        "yearLow": 340.21,
        "marketCap": 392635531620,
        "priceAvg50": 404.313,
        "priceAvg200": 391.2742,
        "exchange": "NYSE",
        "volume": 689817,
        "avgVolume": 2579720,
        "open": 418.5,
        "previousClose": 418.77,
        "eps": 11.48,
        "pe": 36.76,
        "earningsAnnouncement": "2024-01-24T00:00:00.000+0000",
        "sharesOutstanding": 930438000,
        "timestamp": 1704394293
    },
    "TSM": {
        "symbol": "TSM",
        "name": "Taiwan Semiconductor Manufacturing Company Limited",
        "price": 99.65,
        "changesPercentage": -0.5191,
        "change": -0.52,
        "dayLow": 99.35,
        "dayHigh": 100.44,
        "yearHigh": 110.69,
        "yearLow": 75.34,
        "marketCap": 491819624463,
        "priceAvg50": 97.2652,
        "priceAvg200": 94.29825,
        "exchange": "NYSE",
        "volume": 4030441,
        "avgVolume": 9023264,
        "open": 99.53,
        "previousClose": 100.17,
        "eps": 5.47,
        "pe": 18.22,
        "earningsAnnouncement": "2024-01-11T05:00:00.000+0000",
        "sharesOutstanding": 4935470391,
        "timestamp": 1704394304
    },
    "AMD": {
        "symbol": "AMD",
        "name": "Advanced Micro Devices, Inc.",
        "price": 137.1108,
        "changesPercentage": 1.3234,
        "change": 1.7908,
        "dayLow": 134,
        "dayHigh": 137.7,
        "yearHigh": 151.05,
        "yearLow": 60.05,
        "marketCap": 221502497400,
        "priceAvg50": 122.504,
        "priceAvg200": 109.78665,
        "exchange": "NASDAQ",
        "volume": 42012404,
        "avgVolume": 57092612,
        "open": 134.3,
        "previousClose": 135.32,
        "eps": 0.11,
        "pe": 1246.46,
        "earningsAnnouncement": "2024-01-29T10:59:00.000+0000",
        "sharesOutstanding": 1615500000,
        "timestamp": 1704394311
    }
}

export default function Challenge3() {
    const [timer, setTimer] = useState(null)
    const symbolList = ['MS', 'AAPL', 'AMZN','GOOGL','TSLA', 'MSFT', 'NVDA', 'META', 'V', 'MA', 'JPM', 'TSM', 'AMD']
    const [quotes, setQuotes] = useState(DEFAULT_QUOTE)
    const [prices, setPrices] = useState({})
    const [upDown, setUpDown] = useState({})

    const updateTimer = () => {
        const randomTime = Math.random() * 1000 + 300;

        const randomStock = Math.floor(Math.random() * 3)
        let element = Object.keys(quotes)[randomStock]
        if (quotes[element]) {
            const randomPriceChange = Math.random() * 1 - .5
            const prevClose = quotes[element].previousClose
            let price = quotes[element].price + randomPriceChange
            let change = price - prevClose 
            let changePercent = (change/prevClose) * 100
            setQuotes(quotes => ({...quotes, [element]: {...quotes[element], 'price': price}}))
            setQuotes(quotes => ({...quotes, [element]: {...quotes[element], 'change': change}}))
            setQuotes(quotes => ({...quotes, [element]: {...quotes[element], 'changesPercentage': changePercent}}))
        }

        // Set a new timeout for the next update
        setTimer(setTimeout(updateTimer, randomTime))
    };
    
    useEffect(() => {
        setUpStocks()
    }, [])

    useEffect(() => {
        symbolList.forEach(element => {
            if (quotes[element])
            {
                if(!prices[element]){
                    setPrices(prices => ({...prices, [element]: quotes[element].price}))
                }
                else if (quotes[element].price > prices[element]) {
                    setUpDown(upDown => ({...upDown, [element]: "up"}))
                    setPrices(prices => ({...prices, [element]: quotes[element].price}))
                } else if (quotes[element].price < prices[element]) {
                    setUpDown(upDown => ({...upDown, [element]: "down"}))
                    setPrices(prices => ({...prices, [element]: quotes[element].price}))
                } else if (quotes[element].price === prices[element]) {
                    setUpDown(upDown => ({...upDown, [element]: "equal"}))
                    setPrices(prices => ({...prices, [element]: quotes[element].price}))
                }
            }
        })
    }, [quotes])
    
    function setUpStocks() {
        // Update the stocks
        for(let i = 0; i < symbolList.length; i++) {
            handleStockCall(symbolList[i])
        }
    }

    
    async function handleStockCall(element) {
        let res = await getCurrentQuote(element)
        if (!res.error)
            setQuotes(quotes => ({...quotes, [element]: res}))
        else
            setQuotes(DEFAULT_QUOTE)
    }

    function toggleCalls () {
        if (!timer) {
            updateTimer();
        } else {
            clearTimeout(timer);
            setTimer(null)
            setUpStocks()
        }
    }

    const getChange = (change) => {
        let price = change.toString()
        if (price[0] === '-') {
            price = '-$' + price.slice(1)
        } else
            price = '$' + price
        return price
    }

    const isNegative = (change) => {
        let price = change.toString()
        if (price[0] === '-')
            return true
        else
            return false
    }

    return (
    <div className="bg-gradient-to-b from-midnight-blue to-rgb(255,196,126) h-screen w-full flex-ctr-ctr flex-col pb-10 overflow-y-auto">
            <div className='z-20 flex flex-col items-center pt-10 xl:max-w-xl lg:max-w-md md:max-w-md max-w-sm'>
                <h1 className='text-white font-extralight text-6xl pb-5 text-center'>TradingBlock Challenge 3</h1>
                <p className='text-white font-bold pb-2 text-center'>Simple to configure.  Powerful to use.  Endlessly customizable.</p>
                <p className='text-white pb-2 text-center'>Take 60 seconds to open a risk-free virtual account and start putting your trading ideas into action.</p>
                <button className='mt-2 text-white bg-teal hover:bg-teal/70 focus:outline-none focus:ring-4 focus:border-primary-600 font-medium rounded-full text-lg px-5 py-2.5 text-center me-2' onClick={toggleCalls}>{timer ? "Stop Calls" : "Start Calls"}</button>
            </div>
            <div className='flex fixed bottom-52'>
                <div className='transform rotate-45 flex flex-row relative xl:-bottom-[11.5rem] xl:-left-20 md:-bottom-[16.25rem] -bottom-[16.25rem] -left-24'>
                    <div className="rounded-lg dark:bg-midnight-blue shadow-2xl shadow-black m-2">
                        <table className="m-2 text-sm md:text-base lg:text-lg xl:text-xl text-gray-500 dark:text-gray-400 overflow-hidden">
                            <thead className=" border-b dark:border-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Symbol
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Open
                                    </th>
                                    <th scope="col" className="">
                                        Prev. Close
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        High
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Low
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Change
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        (%)
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Last
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Object.entries(quotes).map(([element, quote]) => 
                                        <tr className="bg-white border-b dark:bg-midnight-blue dark:border-gray-700 font-bold" key={element}>
                                            <th scope="row" className="px-6 py-4 whitespace-nowrap dark:text-white">
                                                {quote.symbol}
                                            </th>
                                            <td className="px-6 py-4">
                                                ${quote.open.toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4">
                                                ${quote.previousClose.toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4">
                                                ${quote.dayHigh.toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4">
                                                ${quote.dayLow.toFixed(2)}
                                            </td>
                                            <td className={isNegative(quote.change.toFixed(2)) ? "text-center text-red-600 transition-colors duration-300 ease-in-out" : "text-center text-teal transition-colors duration-300 ease-in-out"}>
                                                {isNegative(quote.change.toFixed(2)) ? "▼" + getChange(quote.change.toFixed(2)) : "▲+" + getChange(quote.change.toFixed(2))}
                                            </td>
                                            <td className={isNegative(quote.change.toFixed(2)) ? "text-center text-red-600 transition-colors duration-300 ease-in-out" : "text-center text-teal transition-colors duration-300 ease-in-out"}>
                                                {isNegative(quote.change.toFixed(2)) ? quote.changesPercentage.toFixed(2) : "+" + quote.changesPercentage.toFixed(2)}%
                                            </td>
                                            <td className={upDown[element] && upDown[element] !== "equal" ? (upDown[element] === "up" ? "text-center text-teal animate__animated animate__pulse transition-colors duration-300 ease-in-out" : (upDown[element] === "down" ? "text-center text-red-600 animate__animated animate__pulse transition-colors duration-300 ease-in-out" : "text-center text-white transition-colors duration-300 ease-in-out")) : "text-center text-white transition-colors duration-300 ease-in-out"}>
                                                ${quote.price.toFixed(2)}
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="rounded-lg dark:bg-midnight-blue shadow-2xl shadow-black m-2">
                        <table className="m-2 text-sm md:text-base lg:text-lg xl:text-xl text-gray-500 dark:text-gray-400 overflow-hidden">
                            <thead className=" border-b dark:border-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Symbol
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Open
                                    </th>
                                    <th scope="col" className="">
                                        Prev. Close
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        High
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Low
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Last
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Change
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        (%)
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Object.entries(quotes).map(([element, quote]) => 
                                        <tr className="bg-white border-b dark:bg-midnight-blue dark:border-gray-700 font-bold" key={element}>
                                            <th scope="row" className="px-6 py-4 whitespace-nowrap dark:text-white">
                                                {quote.symbol}
                                            </th>
                                            <td className="px-6 py-4">
                                                ${quote.open.toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4">
                                                ${quote.previousClose.toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4">
                                                ${quote.dayHigh.toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4">
                                                ${quote.dayLow.toFixed(2)}
                                            </td>
                                            <td className={upDown[element] && upDown[element] !== "equal" ? (upDown[element] === "up" ? "text-center text-teal animate__animated animate__pulse transition-colors duration-300 ease-in-out" : (upDown[element] === "down" ? "text-center text-red-600 animate__animated animate__pulse transition-colors duration-300 ease-in-out" : "text-center text-white transition-colors duration-300 ease-in-out")) : "text-center text-white transition-colors duration-300 ease-in-out"}>
                                                ${quote.price.toFixed(2)}
                                            </td>
                                            <td className={isNegative(quote.change.toFixed(2)) ? "text-center text-red-600 transition-colors duration-300 ease-in-out" : "text-center text-teal transition-colors duration-300 ease-in-out"}>
                                                {isNegative(quote.change.toFixed(2)) ? "▼" + getChange(quote.change.toFixed(2)) : "▲+" + getChange(quote.change.toFixed(2))}
                                            </td>
                                            <td className={isNegative(quote.change.toFixed(2)) ? "text-center text-red-600 transition-colors duration-300 ease-in-out" : "text-center text-teal transition-colors duration-300 ease-in-out"}>
                                                {isNegative(quote.change.toFixed(2)) ? quote.changesPercentage.toFixed(2) : "+" + quote.changesPercentage.toFixed(2)}%
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='transform -rotate-45 flex flex-row relative xl:-bottom-[42.5rem] xl:right-[28rem] lg:right-[25rem] md:right-[25.75rem] -bottom-[45rem] right-[26.25rem]'>
                    <div className="rounded-lg dark:bg-midnight-blue shadow-2xl shadow-black m-2">
                        <table className="m-2 text-xs md:text-sm lg:text-base xl:text-lg text-gray-500 dark:text-gray-400 overflow-hidden">
                            <thead className=" border-b dark:border-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Symbol
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Open
                                    </th>
                                    <th scope="col" className="">
                                        Prev. Close
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        High
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Low
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Change
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        (%)
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Last
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Object.entries(quotes).map(([element, quote]) => 
                                        <tr className="bg-white border-b dark:bg-midnight-blue dark:border-gray-700 font-bold" key={element}>
                                            <th scope="row" className="px-6 py-4 whitespace-nowrap dark:text-white">
                                                {quote.symbol}
                                            </th>
                                            <td className="px-6 py-4">
                                                ${quote.open.toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4">
                                                ${quote.previousClose.toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4">
                                                ${quote.dayHigh.toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4">
                                                ${quote.dayLow.toFixed(2)}
                                            </td>
                                            <td className={isNegative(quote.change.toFixed(2)) ? "text-center text-red-600 transition-colors duration-300 ease-in-out" : "text-center text-teal transition-colors duration-300 ease-in-out"}>
                                                {isNegative(quote.change.toFixed(2)) ? "▼" + getChange(quote.change.toFixed(2)) : "▲+" + getChange(quote.change.toFixed(2))}
                                            </td>
                                            <td className={isNegative(quote.change.toFixed(2)) ? "text-center text-red-600 transition-colors duration-300 ease-in-out" : "text-center text-teal transition-colors duration-300 ease-in-out"}>
                                                {isNegative(quote.change.toFixed(2)) ? quote.changesPercentage.toFixed(2) : "+" + quote.changesPercentage.toFixed(2)}%
                                            </td>
                                            <td className={upDown[element] && upDown[element] !== "equal" ? (upDown[element] === "up" ? "text-center text-teal animate__animated animate__pulse transition-colors duration-300 ease-in-out" : (upDown[element] === "down" ? "text-center text-red-600 animate__animated animate__pulse transition-colors duration-300 ease-in-out" : "text-center text-white transition-colors duration-300 ease-in-out")) : "text-center text-white transition-colors duration-300 ease-in-out"}>
                                                ${quote.price.toFixed(2)}
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="rounded-lg dark:bg-midnight-blue shadow-2xl shadow-black m-2">
                        <table className="m-2 text-xs md:text-sm lg:text-base xl:text-lg text-gray-500 dark:text-gray-400 overflow-hidden">
                            <thead className=" border-b dark:border-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Symbol
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Last
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Change
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        (%)
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Open
                                    </th>
                                    <th scope="col" className="">
                                        Prev. Close
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        High
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Low
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Object.entries(quotes).map(([element, quote]) => 
                                        <tr className="bg-white border-b dark:bg-midnight-blue dark:border-gray-700 font-bold" key={element}>
                                            <th scope="row" className="px-6 py-4 whitespace-nowrap dark:text-white">
                                                {quote.symbol}
                                            </th>
                                            <td className={upDown[element] && upDown[element] !== "equal" ? (upDown[element] === "up" ? "text-center text-teal animate__animated animate__pulse transition-colors duration-300 ease-in-out" : (upDown[element] === "down" ? "text-center text-red-600 animate__animated animate__pulse transition-colors duration-300 ease-in-out" : "text-center text-white transition-colors duration-300 ease-in-out")) : "text-center text-white transition-colors duration-300 ease-in-out"}>
                                                ${quote.price.toFixed(2)}
                                            </td>
                                            <td className={isNegative(quote.change.toFixed(2)) ? "text-center text-red-600 transition-colors duration-300 ease-in-out" : "text-center text-teal transition-colors duration-300 ease-in-out"}>
                                                {isNegative(quote.change.toFixed(2)) ? "▼" + getChange(quote.change.toFixed(2)) : "▲+" + getChange(quote.change.toFixed(2))}
                                            </td>
                                            <td className={isNegative(quote.change.toFixed(2)) ? "text-center text-red-600 transition-colors duration-300 ease-in-out" : "text-center text-teal transition-colors duration-300 ease-in-out"}>
                                                {isNegative(quote.change.toFixed(2)) ? quote.changesPercentage.toFixed(2) : "+" + quote.changesPercentage.toFixed(2)}%
                                            </td>
                                            <td className="px-6 py-4">
                                                ${quote.open.toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4">
                                                ${quote.previousClose.toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4">
                                                ${quote.dayHigh.toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4">
                                                ${quote.dayLow.toFixed(2)}
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                
                
            </div>
        
    </div>
    );
}