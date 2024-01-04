import React, { useState, useEffect } from 'react';
import { getCurrentQuote } from '../../utilities/fmp-service'
import { useMediaQuery } from 'react-responsive';

export default function Challenge3() {
    const [timer, setTimer] = useState(null)
    const symbolList = ['MS', 'AAPL', 'AMZN','GOOGL','TSLA', 'MSFT', 'NVDA', 'META', 'V', 'MA', 'JPM', 'TSM', 'AMD']
    const [quotes, setQuotes] = useState({})
    const [prices, setPrices] = useState({})
    const [upDown, setUpDown] = useState({})

    const updateTimer = () => {
        const randomTime = Math.random() * 1000 + 300;

        const randomStock = Math.floor(Math.random() * 3)
        let element = symbolList[randomStock]
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
        } else {
            setUpStocks()
        }      
    }, [quotes])
    
    function setUpStocks() {
        // Update the stocks
        for(let i = 0; i < symbolList.length; i++) {
            handleStockCall(symbolList[i])
        }
    }
    
    async function handleStockCall(element) {
        let res = await getCurrentQuote(element)
        setQuotes(quotes => ({...quotes, [element]: res}))
    }

    function toggleCalls () {
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
            <div className='z-20 flex flex-col items-center p-10 xl:max-w-xl lg:max-w-md md:max-w-md max-w-sm'>
                <h1 className='text-white font-extralight text-6xl pb-5 text-center'>TradingBlock Challenge 3</h1>
                <p className='text-white font-bold pb-2 text-center'>Simple to configure.  Powerful to use.  Endlessly customizable.</p>
                <p className='text-white pb-2 text-center'>Take 60 seconds to open a risk-free virtual account and start putting your trading ideas into action.</p>
                <button className='mt-2 text-white bg-teal hover:bg-teal/70 focus:outline-none focus:ring-4 focus:border-primary-600 font-medium rounded-full text-lg px-5 py-2.5 text-center me-2' onClick={toggleCalls}>{timer ? "Stop Calls" : "Start Calls"}</button>
            </div>
            <div className='flex fixed bottom-52'>
                <div className='transform rotate-45 flex flex-row relative xl:-bottom-40 xl:-left-20 md:-bottom-[14.25] -bottom-52 -left-24'>
                    <div className="rounded-lg dark:bg-midnight-blue shadow-2xl shadow-black m-1">
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
                                            <td className={isNegative(quote.change.toFixed(2)) ? "px-6 py-4 text-red-600 transition-colors duration-300 ease-in-out" : "px-6 py-4 text-teal transition-colors duration-300 ease-in-out"}>
                                                {isNegative(quote.change.toFixed(2)) ? "▼" + getChange(quote.change.toFixed(2)) : "▲+" + getChange(quote.change.toFixed(2))}
                                            </td>
                                            <td className={isNegative(quote.change.toFixed(2)) ? "px-6 py-4 text-red-600 transition-colors duration-300 ease-in-out" : "px-6 py-4 text-teal transition-colors duration-300 ease-in-out"}>
                                                {isNegative(quote.change.toFixed(2)) ? quote.changesPercentage.toFixed(2) : "+" + quote.changesPercentage.toFixed(2)}%
                                            </td>
                                            <td className={upDown[element] && upDown[element] !== "equal" ? (upDown[element] === "up" ? "px-6 py-4 text-teal animate__animated animate__pulse transition-colors duration-300 ease-in-out" : (upDown[element] === "down" ? "px-6 py-4 text-red-600 animate__animated animate__pulse transition-colors duration-300 ease-in-out" : "px-6 py-4 text-white transition-colors duration-300 ease-in-out")) : "px-6 py-4 text-white transition-colors duration-300 ease-in-out"}>
                                                ${quote.price.toFixed(2)}
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="rounded-lg dark:bg-midnight-blue shadow-2xl shadow-black m-1">
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
                                            <td className={upDown[element] && upDown[element] !== "equal" ? (upDown[element] === "up" ? "px-6 py-4 text-teal animate__animated animate__pulse transition-colors duration-300 ease-in-out" : (upDown[element] === "down" ? "px-6 py-4 text-red-600 animate__animated animate__pulse transition-colors duration-300 ease-in-out" : "px-6 py-4 text-white transition-colors duration-300 ease-in-out")) : "px-6 py-4 text-white transition-colors duration-300 ease-in-out"}>
                                                ${quote.price.toFixed(2)}
                                            </td>
                                            <td className={isNegative(quote.change.toFixed(2)) ? "px-6 py-4 text-red-600 transition-colors duration-300 ease-in-out" : "px-6 py-4 text-teal transition-colors duration-300 ease-in-out"}>
                                                {isNegative(quote.change.toFixed(2)) ? "▼" + getChange(quote.change.toFixed(2)) : "▲+" + getChange(quote.change.toFixed(2))}
                                            </td>
                                            <td className={isNegative(quote.change.toFixed(2)) ? "px-6 py-4 text-red-600 transition-colors duration-300 ease-in-out" : "px-6 py-4 text-teal transition-colors duration-300 ease-in-out"}>
                                                {isNegative(quote.change.toFixed(2)) ? quote.changesPercentage.toFixed(2) : "+" + quote.changesPercentage.toFixed(2)}%
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='transform -rotate-45 flex flex-row relative xl:-bottom-[46rem] lg:-bottom-[46rem] md:-bottom-[43rem] -bottom-[40rem] xl:right-[35.5rem] lg:right-[31.50rem] md:right-[28.80rem] right-[26.25rem]'>
                    <div className="rounded-lg dark:bg-midnight-blue shadow-2xl shadow-black m-1">
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
                                            <td className={isNegative(quote.change.toFixed(2)) ? "px-6 py-4 text-red-600 transition-colors duration-300 ease-in-out" : "px-6 py-4 text-teal transition-colors duration-300 ease-in-out"}>
                                                {isNegative(quote.change.toFixed(2)) ? "▼" + getChange(quote.change.toFixed(2)) : "▲+" + getChange(quote.change.toFixed(2))}
                                            </td>
                                            <td className={isNegative(quote.change.toFixed(2)) ? "px-6 py-4 text-red-600 transition-colors duration-300 ease-in-out" : "px-6 py-4 text-teal transition-colors duration-300 ease-in-out"}>
                                                {isNegative(quote.change.toFixed(2)) ? quote.changesPercentage.toFixed(2) : "+" + quote.changesPercentage.toFixed(2)}%
                                            </td>
                                            <td className={upDown[element] && upDown[element] !== "equal" ? (upDown[element] === "up" ? "px-6 py-4 text-teal animate__animated animate__pulse transition-colors duration-300 ease-in-out" : (upDown[element] === "down" ? "px-6 py-4 text-red-600 animate__animated animate__pulse transition-colors duration-300 ease-in-out" : "px-6 py-4 text-white transition-colors duration-300 ease-in-out")) : "px-6 py-4 text-white transition-colors duration-300 ease-in-out"}>
                                                ${quote.price.toFixed(2)}
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="rounded-lg dark:bg-midnight-blue shadow-2xl shadow-black m-1">
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
                                            <td className={upDown[element] && upDown[element] !== "equal" ? (upDown[element] === "up" ? "px-6 py-4 text-teal animate__animated animate__pulse transition-colors duration-300 ease-in-out" : (upDown[element] === "down" ? "px-6 py-4 text-red-600 animate__animated animate__pulse transition-colors duration-300 ease-in-out" : "px-6 py-4 text-white transition-colors duration-300 ease-in-out")) : "px-6 py-4 text-white transition-colors duration-300 ease-in-out"}>
                                                ${quote.price.toFixed(2)}
                                            </td>
                                            <td className={isNegative(quote.change.toFixed(2)) ? "px-6 py-4 text-red-600 transition-colors duration-300 ease-in-out" : "px-6 py-4 text-teal transition-colors duration-300 ease-in-out"}>
                                                {isNegative(quote.change.toFixed(2)) ? "▼" + getChange(quote.change.toFixed(2)) : "▲+" + getChange(quote.change.toFixed(2))}
                                            </td>
                                            <td className={isNegative(quote.change.toFixed(2)) ? "px-6 py-4 text-red-600 transition-colors duration-300 ease-in-out" : "px-6 py-4 text-teal transition-colors duration-300 ease-in-out"}>
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