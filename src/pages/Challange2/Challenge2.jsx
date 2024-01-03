import React, { useState, useEffect } from 'react';

export default function Challenge2() {
    const [msPrice, setMSPrice] = useState(70)
    const [applPrice, setAPPLPrice] = useState(200)
    const [amznPrice, setAMZNPrice] = useState(160)
    const [count, setCount] = useState(0);
    const [resetTimer, setResetTimer] = useState(false)
    const [refreshTimerId, setRefreshIdTimer] = useState(null)
    const [timer, setTimer] = useState(null)

    const updateCount = () => {
        setResetTimer(false)
        setCount((count) => count + 1)
    }

    const updateTimer = () => {
        const randomTime = Math.random() * 3000 + 1000;

        // Update the stocks
        handleCalls()
        
        // Set a new timeout for the next update
        setTimer(setTimeout(updateTimer, randomTime))
    };

    const handleCalls = async () => {
        setResetTimer(true)
        let price
        
        price = msPrice
        price = getRandomPrice(price, 70, 90)
        setMSPrice(price)
        
        price = applPrice
        price = getRandomPrice(price, 170, 220)
        setAPPLPrice(price)
        
        price = amznPrice
        price = getRandomPrice(price, 120, 160)
        setAMZNPrice(price)

    }

    const getRandomPrice = (price, min, max) =>
    {
        const randomShift = Math.random() * 2
        const randomSign = Math.floor(Math.random() * 2)
        if (randomSign == 1 && price+randomShift < max)
            price += randomShift
        else if (price-randomShift > min)
            price -= randomShift
        else
            price += randomShift
        return price.toFixed(2)
    }

    useEffect(() => {
        if (refreshTimerId)
            clearInterval(refreshTimerId)
        else {
            if (!timer) {
                updateTimer();
            } else {
                clearTimeout(timer);
                setTimer(null)
            }
        }
        if (resetTimer)
            setCount(0)
        setRefreshIdTimer(setInterval(() => {updateCount()}, 1000))
        return () => {
            clearInterval(refreshTimerId);
        };
    }, [resetTimer]);
    
    return (
    <div className="bg-gradient-to-b from-midnight-blue to-rgb(255,196,126) h-screen w-full flex-ctr-ctr flex-col pt-16">
        <div className="flex flex-col items-center justify-start w-11/12 h-fit border border-teal/10 rounded-xl bg-midnight-blue shadow-teal shadow-2xl mt-10 py-10">
            <h1 className='text-white md:text-4xl sm:text-3xl font-bold pb-10 text-2x1'>TradingBlock Challenge 2</h1>

            <br />

            <p className='text-white sm:text-xl text-lg flex-ctr-ctr flex-col'>MS (Morgan Stanley): ${msPrice}</p>
            <p className='text-white sm:text-xl text-lg flex-ctr-ctr flex-col'>APPL (Apple): ${applPrice}</p>
            <p className='text-white sm:text-xl text-lg flex-ctr-ctr flex-col'>AMZN (Amazon): ${amznPrice}</p>
            
            <br/>
            <p className='text-white'>Refresh Count: {count}</p>
        </div>
    </div>
    );
}