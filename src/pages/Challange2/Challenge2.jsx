import React, { useState, useEffect } from 'react';

export default function Challenge2() {
    const [msPrice, setMSPrice] = useState("$70.00")
    const [applPrice, setAPPLPrice] = useState("$170.00")
    const [amznPrice, setAMZNPrice] = useState("$120.00")
    const [currentTime, setCurrentTime] = useState(new Date());
    const [count, setCount] = useState(0);
    const [refreshTimerId, setRefreshIdTimer] = useState(null)
    
    const randomSeconds = 20000

    const updateCount = () => {
        setCount((count) => count + 1)
    }
    useEffect(() => {
        if (refreshTimerId)
            clearInterval(refreshTimerId)

        setRefreshIdTimer(setInterval(() => {
                updateCount()
            }, 1000))

        const updateTimerMS = () => {
            setCount(0)
            const randomTime = Math.random() * randomSeconds;
            
            // Update the stocks
            let randomMS = Math.random() * (90.00-70.00);
            randomMS = randomMS + 70.00
            setMSPrice(randomMS.toFixed(2));

            setCurrentTime(new Date())
            
            // Set a new timeout for the next update
            setTimeout(updateTimerMS, randomTime);
        };
        const updateTimerAPPL = () => {
            setCount(0)
            const randomTime = Math.random() * randomSeconds;
            
            // Update the stocks
            let randomAPPL = Math.random() * (220.00-170.00);
            randomAPPL = randomAPPL + 170.00
            setAPPLPrice(randomAPPL.toFixed(2));
            
            setCurrentTime(new Date())

            // Set a new timeout for the next update
            setTimeout(updateTimerAPPL, randomTime);
        };
        const updateTimerAMZN = () => {
            setCount(0)
            const randomTime = Math.random() * randomSeconds;
            
            // Update the stocks
            let randomAMZN = Math.random() * (220.00-170.00);
            randomAMZN = randomAMZN + 170.00
            setAMZNPrice(randomAMZN.toFixed(2));
            
            setCurrentTime(new Date())
            
            // Set a new timeout for the next update
            setTimeout(updateTimerAMZN, randomTime);
        };

        // Start the initial timer
        updateTimerMS();
        updateTimerAPPL();
        updateTimerAMZN();
    
        // Clean up any ongoing timers when the component is unmounted or when needed
        return () => { 
            clearTimeout(updateTimerMS); 
            clearTimeout(updateTimerAPPL); 
            clearTimeout(updateTimerAMZN); 
            clearInterval(refreshTimerId);
        }
      }, []); // Empty dependency array ensures the effect runs only once on mount
    
        const formattedTime = currentTime.toLocaleTimeString();

    return (
    <div className="bg-gradient-to-b from-midnight-blue to-rgb(255,196,126) h-screen w-full flex-ctr-ctr flex-col pt-16">
        <div style={{width: '100vh', padding: '10vh'}} className="flex-ctr-ctr flex-col border border-teal/10 rounded-xl bg-midnight-blue shadow-teal shadow-2xl mt-10">
            <h1 className='text-white text-4xl font-bold'>Trading Block Challenge 2</h1>

            <br />

            <p className='text-white text-2xl'>MS (Morgan Stanley): ${msPrice}</p>
            <p className='text-white text-2xl'>APPL (Apple): ${applPrice}</p>
            <p className='text-white text-2xl'>AMZN (Amazon): ${amznPrice}</p>
            
            <br/>
            <p className='text-white'>Refresh Count: {count}</p>
        </div>
    </div>
    );
}