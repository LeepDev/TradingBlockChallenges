import React, { useState } from 'react';
import { getCurrentPrice } from '../../utilities/fmp-service'

export default function Challenge2Bonus() {
    const [timer, setTimer] = useState(null)
    const [msPrice, setMSPrice] = useState("70.00")
    const [applPrice, setAPPLPrice] = useState("170.00")
    const [amznPrice, setAMZNPrice] = useState("120.00")
    const [currentTime, setCurrentTime] = useState(new Date());

    const updateTimer = () => {
        const randomTime = Math.random() * 3000 + 1000;
        
        // Update the stocks
        handleStockCall()
        
        // Set a new timeout for the next update
        setTimer(setTimeout(updateTimer, randomTime))
    };

    const handleStockCall = async () => {
        setCurrentTime(new Date())
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

    const formattedTime = currentTime.toLocaleTimeString();

    const toggleCalls = () => {
        if (!timer) {
            updateTimer();
        } else {
            clearTimeout(timer);
            setTimer(null);
        }
    }

    return (
    <div>
        <h1>Trading Block Challenge 2 (updating between 1-4 seconds)</h1>

        <p>MS (Morgan Stanley): {msPrice}</p>
        <p>APPL (Apple): {applPrice}</p>
        <p>AMZN (Amazon): {amznPrice}</p>

        <br/>
        <p>Current Time(updated every refresh): {formattedTime}</p>

        <button onClick={toggleCalls}>{timer ? "Stop Calls" : "Start Calls"}</button>
    </div>
    );
}