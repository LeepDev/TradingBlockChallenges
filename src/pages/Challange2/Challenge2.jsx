import React, { useState, useEffect } from 'react';

export default function Challenge2() {
    const [msPrice, setMSPrice] = useState("$70.00")
    const [applPrice, setAPPLPrice] = useState("$170.00")
    const [amznPrice, setAMZNPrice] = useState("$120.00")
    const [currentTime, setCurrentTime] = useState(new Date());
    const randomSeconds = 3000

    useEffect(() => {
        const updateTimerMS = () => {
            // Generate a random time between 1000 and 2000 milliseconds (1 - 2 seconds)
            const randomTime = Math.random() * randomSeconds + 1000;
            
            // Update the stocks
            let randomMS = Math.random() * (90.00-70.00);
            randomMS = randomMS + 70.00
            setMSPrice(randomMS.toFixed(2));

            setCurrentTime(new Date())
            
            // Set a new timeout for the next update
            setTimeout(updateTimerMS, randomTime);
        };
        const updateTimerAPPL = () => {
            const randomTime = Math.random() * randomSeconds + 1000;
            
            // Update the stocks
            let randomAPPL = Math.random() * (220.00-170.00);
            randomAPPL = randomAPPL + 170.00
            setAPPLPrice(randomAPPL.toFixed(2));
            
            setCurrentTime(new Date())

            // Set a new timeout for the next update
            setTimeout(updateTimerAPPL, randomTime);
        };
        const updateTimerAMZN = () => {
            const randomTime = Math.random() * randomSeconds + 1000;
            
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
        }
      }, []); // Empty dependency array ensures the effect runs only once on mount
    
        const formattedTime = currentTime.toLocaleTimeString();

    return (
    <div>
        <h1>Trading Block Challenge 2 (updating between 1-4 seconds)</h1>

        <p>MS (Morgan Stanley): ${msPrice}</p>
        <p>APPL (Apple): ${applPrice}</p>
        <p>AMZN (Amazon): ${amznPrice}</p>
        
        <br/>
        <p>Current Time(updated every refresh): {formattedTime}</p>
    </div>
    );
}