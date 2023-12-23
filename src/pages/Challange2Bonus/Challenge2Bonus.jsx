import React, { useEffect, useState } from 'react';
import { getCurrentPrice } from '../../utilities/fmp-service'

export default function Challenge2Bonus() {
    const [timer, setTimer] = useState(null)
    const [refreshTimerId, setRefreshIdTimer] = useState(null)
    const [msPrice, setMSPrice] = useState("70.00")
    const [applPrice, setAPPLPrice] = useState("170.00")
    const [amznPrice, setAMZNPrice] = useState("120.00")
    const [count, setCount] = useState(0);
    const [resetTimer, setResetTimer] = useState(false);
    
    const updateCount = () => {
        setResetTimer(false)
        setCount((count) => count + 1)
    }

    useEffect(() => {
        if (refreshTimerId)
            clearInterval(refreshTimerId)
        if (resetTimer)
            setCount(0)
        setRefreshIdTimer(setInterval(() => {updateCount()}, 1000))
        return () => {
            clearInterval(refreshTimerId);
        };
    }, [resetTimer]);
    
    const updateTimer = () => {
        const randomTime = Math.random() * 3000 + 1000;

        // Update the stocks
        handleStockCall()
        
        // Set a new timeout for the next update
        setTimer(setTimeout(updateTimer, randomTime))
    };

    const handleStockCall = async () => {
        setResetTimer(true)
        let res,price
        
        res = await getCurrentPrice("AMZN")
        price = getPriceFromJSON(res)
        setAMZNPrice(price)
        
        res = await getCurrentPrice("MS")
        price = getPriceFromJSON(res)
        setMSPrice(price)
        
        res = await getCurrentPrice("AAPL")
        price = getPriceFromJSON(res)
        setAPPLPrice(price)

    }

    const getPriceFromJSON = (res) => {
        let price
        if (res.companiesPriceList)
            price = res.companiesPriceList[0].price.toFixed(2)
        else if (res.error)
            price = 'Ran out of requests for this minute'
        return price
    }

    const toggleCalls = () => {
        if (!timer) {
            updateTimer();
        } else {
            clearTimeout(timer);
            setTimer(null)
        }
    }

    return (
    <div className="bg-gradient-to-b from-midnight-blue to-rgb(255,196,126) h-screen w-full flex-ctr-ctr flex-col">
        <div className="flex flex-col items-center justify-start border border-teal/10 rounded-xl bg-midnight-blue shadow-teal shadow-2xl w-11/12 h-fit mt-10 py-10">
            <h1 className='text-white md:text-4xl sm:text-3xl font-bold pb-10 text-2x1'>Trading Block Challenge 2</h1>

            <br />
            
            <p className='text-white md:text-xl sm:text-lg text-base flex-ctr-ctr flex-col'>MS (Morgan Stanley): ${msPrice}</p>
            <p className='text-white md:text-xl sm:text-lg text-base flex-ctr-ctr flex-col'>APPL (Apple): ${applPrice}</p>
            <p className='text-white md:text-xl sm:text-lg text-base flex-ctr-ctr flex-col'>AMZN (Amazon): ${amznPrice}</p>

            <br/>
            <p className='text-white'>Refresh Count: {count}</p>
            <p className='text-white pb-10'>(updating between 1-4 seconds)</p>
            

            <button className='text-white bg-teal hover:bg-teal/70 focus:outline-none focus:ring-4 focus:border-primary-600 font-medium rounded-full text-lg px-5 py-2.5 text-center me-2 mb-2' onClick={toggleCalls}>{timer ? "Stop Calls" : "Start Calls"}</button>
        </div>
    </div>
    );
}