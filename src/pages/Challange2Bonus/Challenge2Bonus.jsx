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
        setCount((count) => count + 1)
    }

    useEffect(() => {
        if (resetTimer) {
            setCount(0)
            if (refreshTimerId)
                clearInterval(refreshTimerId)
            setResetTimer(false)
        }

        setRefreshIdTimer(setInterval(() => {
                updateCount()
            }, 1000))

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
    <div style={{width: '100vh', padding: '10vh'}} className="flex-ctr-ctr flex-col">
        <h1>Trading Block Challenge 2 (updating between 1-4 seconds)</h1>

        <p>MS (Morgan Stanley): ${msPrice}</p>
        <p>APPL (Apple): ${applPrice}</p>
        <p>AMZN (Amazon): ${amznPrice}</p>

        <br/>
        <p>Refresh Count: {count}</p>

        <button onClick={toggleCalls}>{timer ? "Stop Calls" : "Start Calls"}</button>
    </div>
    );
}