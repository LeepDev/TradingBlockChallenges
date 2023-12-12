import React, { useState, useEffect } from 'react';
import { getShortQuote } from '../../utilities/fmp-service'

export default function Challenge2Bonus() {
    const [msPrice, setMSPrice] = useState(0)
    const [applPrice, setAPPLPrice] = useState(0)
    const [amznPrice, setAMZNPrice] = useState(0)
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const updateTimer = () => {
            const secondTimer = 1000;
            
            // Update the stocks
            handleStockCall()
            
            // Set a new timeout for the next update
            setTimeout(updateTimer, secondTimer);
        };

        // Start the initial timer
        updateTimer();
    
        // Clean up any ongoing timers when the component is unmounted or when needed
        return () => { 
            clearTimeout(updateTimer); 
        }
      }, []);

    const handleStockCall = async () => {
        setCurrentTime(new Date())
        let res = ''
        res = await getShortQuote("AMZN")
        let price = ''
        if (res.companiesPriceList) {
            price = res.companiesPriceList[0].price.toFixed(2)
            setAMZNPrice(price)
        }
        
        res = await getShortQuote("MS")
        if (res.companiesPriceList) {
            price = res.companiesPriceList[0].price.toFixed(2)
            setMSPrice(price)
        }
        
        res = await getShortQuote("AAPL")
        if (res.companiesPriceList) {
            price = res.companiesPriceList[0].price.toFixed(2)
            setAPPLPrice(price)
        }
    }

    const formattedTime = currentTime.toLocaleTimeString();

    return (
    <div>
        <button onClick={() => window.location.href = '/'}>Home</button>

        <h1>Trading Block Challenge 2 (updating every second)</h1>

        <p>MS (Morgan Stanley): ${msPrice}</p>
        <p>APPL (Apple): ${applPrice}</p>
        <p>AMZN (Amazon): ${amznPrice}</p>

        <br/>
        <p>Refresh Timer: {formattedTime}</p>
    </div>
    );
}