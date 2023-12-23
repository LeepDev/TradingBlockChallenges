import React, { useState, useEffect } from 'react';
import { getCurrentQuote } from '../../utilities/fmp-service'
import { useMediaQuery } from 'react-responsive';

export default function Challenge3() {
    const [timer, setTimer] = useState(null)
    const [quotes, setQuotes] = useState({})
    const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
    const [prices, setPrices] = useState({})
    const [upDown, setUpDown] = useState({})
    const symbolList = ['MS', 'AAPL', 'AMZN']
    
    const updateTimer = () => {
        const randomTime = Math.random() * 3000 + 1000;

        const randomStock = Math.floor(Math.random() * 3 + 1)
        let element
        switch(randomStock) {
            case 1:
                element = 'MS'
                break
            case 2:
                element = 'AAPL'
                break
            case 3:
                element = 'AMZN'
                break
            default:
                element = 'AMZN'
                break
        }
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
        if (Object.keys(quotes).length > 0) {
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
    <div className="bg-gradient-to-b from-midnight-blue to-rgb(255,196,126) h-screen w-full flex-ctr-ctr flex-col pb-10">
        {
            !isMobile && 
            <div className="flex-ctr-ctr flex-col shadow-teal shadow-2xl rounded-xl bg-midnight-blue border border-teal/10 p-10 mt-72 -z-0">
                <div className="relative overflow-x-auto">
                    <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-hidden">
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
                                        <td className={upDown[element] && upDown[element] !== "equal" ? (upDown[element] === "up" ? "px-6 py-4 text-teal animate__animated animate__pulse transition-colors duration-300 ease-in-out" : (upDown[element] === "down" ? "px-6 py-4 text-red-600 animate__animated animate__pulse transition-colors duration-300 ease-in-out" : "px-6 py-4 text-white transition-colors duration-300 ease-in-out")) : "px-6 py-4 text-white transition-colors duration-300 ease-in-out"}>
                                            ${quote.price.toFixed(2)}
                                        </td>
                                        <td className={isNegative(quote.change.toFixed(2)) ? "px-6 py-4 text-red-600 transition-colors duration-300 ease-in-out" : "px-6 py-4 text-teal transition-colors duration-300 ease-in-out"}>
                                            {isNegative(quote.change.toFixed(2)) ? "▼" + getChange(quote.change.toFixed(2)) : "▲+" + getChange(quote.change.toFixed(2))}
                                        </td>
                                        <td className={isNegative(quote.change.toFixed(2)) ? "px-6 py-4 text-red-600 transition-colors duration-300 ease-in-out" : "px-6 py-4 text-teal transition-colors duration-300 ease-in-out"}>
                                            {quote.changesPercentage.toFixed(2)}%
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
        }
        {
            isMobile && 
            <div className="relative w-full overflow-y-auto min-h-0 mt-16 -z-0">
                <div className="relative overflow-hidden rounded-lg mt-5">
                    {
                        Object.entries(quotes).map(([element, quote]) => 
                        <div key={element} className="shadow-teal shadow-2xl rounded-xl bg-midnight-blue border border-teal/10 p-10 mt-1 mx-20">
                            <div className="relative overflow-none">
                                <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                                    <li class="py-3 sm:py-4">
                                        <div class="flex items-center">
                                            <div class="flex-1 min-w-0 ms-4">
                                                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    Symbol
                                                </p>
                                            </div>
                                            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                {quote.symbol}
                                            </div>
                                        </div>
                                    </li>
                                    <li class="py-3 sm:py-4">
                                        <div class="flex items-center">
                                            <div class="flex-1 min-w-0 ms-4">
                                                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    Last
                                                </p>
                                            </div>
                                            <div class={upDown[element] && upDown[element] !== "equal" ? (upDown[element] === "up" ? "inline-flex items-center text-base font-semibold text-teal animate__animated animate__pulse transition-colors duration-300 ease-in-out" : (upDown[element] === "down" ? "inline-flex items-center text-base font-semibold text-red-600 animate__animated animate__pulse transition-colors duration-300 ease-in-out" : "inline-flex items-center text-base font-semibold text-white transition-colors duration-300 ease-in-out")) : "inline-flex items-center text-base font-semibold text-white transition-colors duration-300 ease-in-out"}>
                                                ${quote.price.toFixed(2)}
                                            </div>
                                        </div>
                                    </li>
                                    <li class="py-3 sm:py-4">
                                        <div class="flex items-center">
                                            <div class="flex-1 min-w-0 ms-4">
                                                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    Change
                                                </p>
                                            </div>
                                            <div class={isNegative(quote.change.toFixed(2)) ? "inline-flex items-center text-base font-semibold text-red-600 transition-colors duration-300 ease-in-out" : "inline-flex items-center text-base font-semibold text-teal transition-colors duration-300 ease-in-out"}>
                                                {isNegative(quote.change.toFixed(2)) ? "▼" + getChange(quote.change.toFixed(2)) : "▲+" + getChange(quote.change.toFixed(2))}
                                            </div>
                                        </div>
                                    </li>
                                    <li class="py-3 sm:py-4">
                                        <div class="flex items-center">
                                            <div class="flex-1 min-w-0 ms-4">
                                                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    (%)
                                                </p>
                                            </div>
                                            <div class={isNegative(quote.change.toFixed(2)) ? "inline-flex items-center text-base font-semibold text-red-600 transition-colors duration-300 ease-in-out" : "inline-flex items-center text-base font-semibold text-teal transition-colors duration-300 ease-in-out"}>
                                                {quote.changesPercentage.toFixed(2)}%
                                            </div>
                                        </div>
                                    </li>
                                    <li class="py-3 sm:py-4">
                                        <div class="flex items-center">
                                            <div class="flex-1 min-w-0 ms-4">
                                                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    Open
                                                </p>
                                            </div>
                                            <div class="inline-flex items-center text-base font-semibold text-white">
                                                ${quote.open.toFixed(2)}
                                            </div>
                                        </div>
                                    </li>
                                    <li class="py-3 sm:py-4">
                                        <div class="flex items-center">
                                            <div class="flex-1 min-w-0 ms-4">
                                                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    Close
                                                </p>
                                            </div>
                                            <div class="inline-flex items-center text-base font-semibold text-white">
                                                ${quote.previousClose.toFixed(2)}
                                            </div>
                                        </div>
                                    </li>
                                    <li class="py-3 sm:py-4">
                                        <div class="flex items-center">
                                            <div class="flex-1 min-w-0 ms-4">
                                                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    High
                                                </p>
                                            </div>
                                            <div class="inline-flex items-center text-base font-semibold text-white">
                                                ${quote.dayHigh.toFixed(2)}
                                            </div>
                                        </div>
                                    </li>
                                    <li class="py-3 sm:py-4">
                                        <div class="flex items-center">
                                            <div class="flex-1 min-w-0 ms-4">
                                                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    Low
                                                </p>
                                            </div>
                                            <div class="inline-flex items-center text-base font-semibold text-white">
                                                ${quote.dayLow.toFixed(2)}
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        }
        <button className='mt-10 text-white bg-teal hover:bg-teal/70 focus:outline-none focus:ring-4 focus:border-primary-600 font-medium rounded-full text-lg px-5 py-2.5 text-center me-2 mb-1' onClick={setUpStocks}>Set Stocks</button>
        <button className='mt-2 text-white bg-teal hover:bg-teal/70 focus:outline-none focus:ring-4 focus:border-primary-600 font-medium rounded-full text-lg px-5 py-2.5 text-center me-2' onClick={toggleCalls}>{timer ? "Stop Calls" : "Start Calls"}</button>
    </div>
    );
}