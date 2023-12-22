import React, { useState, useEffect } from 'react';
import { getCurrentQuote } from '../../utilities/fmp-service'

export default function Challenge3() {
    const [timer, setTimer] = useState(null)
    const [quotes, setQuotes] = useState({})
    const [prevQuotes, setPrevQuotes] = useState({})
    const [prices, setPrices] = useState({})
    const [upDown, setUpDown] = useState({})
    const symbolList = ['MS', 'AAPL', 'AMZN']
    
    const updateTimer = () => {
        const randomTime = Math.random() * 3000 + 1000;

        symbolList.forEach(element => {
            if (quotes[element])
            {
                const randomChange = Math.floor(Math.random() * 3) + 1
                console.log(randomChange)
                switch (randomChange) {
                    case 1:
                        let price = quotes[element].price
                        const randomPriceChange = Math.random() * 1 - .5
                        setQuotes(quotes => ({...quotes, [element]: {...quotes[element], 'price': (price + randomPriceChange)}}))
                        break
                    case 2:
                        let change = quotes[element].change
                        const randomchange = Math.random() * 1 - .5
                        setQuotes(quotes => ({...quotes, [element]: {...quotes[element], 'change': (change + randomchange)}}))
                        break
                    case 2:
                        let changesPercentage = quotes[element].changesPercentage
                        const randomchangesPercentage = Math.random() * 1 - .5
                        setQuotes(quotes => ({...quotes, [element]: {...quotes[element], 'changesPercentage': (changesPercentage + randomchangesPercentage)}}))
                        break
                    default:
                        break
                }

            }
        });

        // Set a new timeout for the next update
        setTimer(setTimeout(updateTimer, randomTime))
    };

    useEffect(() => {
        if (Object.keys(quotes).length > 0) {
            symbolList.forEach(element => {
                if (quotes[element])
                {
                    if(!prices[element]){
                        console.log("priceSet")
                        setPrices(prices => ({...prices, [element]: quotes[element].price}))
                    }
                    else if (quotes[element].price > prices[element]) {
                        console.log("up")
                        setUpDown(upDown => ({...upDown, [element]: "up"}))
                        setPrices(prices => ({...prices, [element]: quotes[element].price}))
                    } else if (quotes[element].price < prices[element]) {
                        console.log("down")
                        setUpDown(upDown => ({...upDown, [element]: "down"}))
                        setPrices(prices => ({...prices, [element]: quotes[element].price}))
                    } else if (quotes[element].price === prices[element]) {
                        console.log("equal")
                        setUpDown(upDown => ({...upDown, [element]: "equal"}))
                        setPrices(prices => ({...prices, [element]: quotes[element].price}))
                    }
                }
            })
        }
    }, [quotes])
    
    const setUpStocks = () => {
        // Update the stocks
        symbolList.forEach(element => {
            handleStockCall(element)
        });
    }
    
    
    async function handleStockCall(element) {
        let res = await getCurrentQuote(element)
        setQuotes(quotes => ({...quotes, [element]: res}))
    }

    const toggleCalls = () => {
        if (!timer) {
            updateTimer();
        } else {
            clearTimeout(timer);
            setTimer(null)
            setQuotes({})
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
    <div className="bg-gradient-to-b from-midnight-blue to-rgb(255,196,126) h-screen w-full flex-ctr-ctr flex-col">
        <div style={{width: '110vh', padding: '10vh'}} className="flex-ctr-ctr flex-col shadow-teal shadow-2xl rounded-xl bg-midnight-blue  border border-teal/10">
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs border-b dark:bg-midnight-blue dark:border-gray-700 dark:text-gray-600">
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
                            <th scope="col" className="px-6 py-3">
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
                                    <td className={upDown[element] ? (upDown[element] === "up" ? "px-6 py-4 text-teal transition-colors duration-500 ease-in-out animate__animated animate__pulse" : (upDown[element] === "down" ? "px-6 py-4 text-red-600 transition-colors duration-500 ease-in-out animate__animated animate__pulse" : "px-6 py-4")) : "px-6 py-4"}>
                                        ${quote.price.toFixed(2)}
                                    </td>
                                    <td className={isNegative(quote.change.toFixed(2)) ? "px-6 py-4 text-red-600 animate__animated animate__pulse" : "px-6 py-4 text-teal animate__animated animate__pulse"}>
                                        {getChange(quote.change.toFixed(2))}
                                    </td>
                                    <td className={isNegative(quote.change.toFixed(2)) ? "px-6 py-4 text-red-600 animate__animated animate__pulse" : "px-6 py-4 text-teal animate__animated animate__pulse"}>
                                        {quote.changesPercentage.toFixed(2)}%
                                    </td>
                                    <td className="px-6 py-4">
                                        ${quote.open}
                                    </td>
                                    <td className="px-6 py-4">
                                        ${quote.previousClose}
                                    </td>
                                    <td className="px-6 py-4">
                                        ${quote.dayHigh}
                                    </td>
                                    <td className="px-6 py-4">
                                        ${quote.dayLow}
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>

        <button className='mt-10 text-white bg-teal hover:bg-teal/70 focus:outline-none focus:ring-4 focus:ring-teal font-medium rounded-full text-lg px-5 py-2.5 text-center me-2 mb-2' onClick={setUpStocks}>Set Stocks</button>
        <button className='mt-10 text-white bg-teal hover:bg-teal/70 focus:outline-none focus:ring-4 focus:ring-teal font-medium rounded-full text-lg px-5 py-2.5 text-center me-2 mb-2' onClick={toggleCalls}>{timer ? "Stop Calls" : "Start Calls"}</button>
    </div>
    );
}