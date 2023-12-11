import React, { useState, useEffect } from 'react';

export default function Challenge2() {
    const [msPrice, setMSPrice] = useState(70.00)
    const [applPrice, setAPPLPrice] = useState(170.00)
    const [amznPrice, setAMZNPrice] = useState(120.00)

    useEffect(() => {
        const updateTimerMS = () => {
            // Generate a random time between 0 and 1000 milliseconds (1 second)
            const randomTime = Math.random() * 1000;
            
            // Update the stocks
            let randomMS = Math.random() * (90.00-70.00);
            randomMS = randomMS + 70.00
            setMSPrice(randomMS.toFixed(2));
            
            // Set a new timeout for the next update
            setTimeout(updateTimerMS, randomTime);
        };
        const updateTimerAPPL = () => {
            // Generate a random time between 0 and 1000 milliseconds (1 second)
            const randomTime = Math.random() * 1000;
            
            // Update the stocks
            let randomAPPL = Math.random() * (220.00-170.00);
            randomAPPL = randomAPPL + 170.00
            setAPPLPrice(randomAPPL.toFixed(2));
            
            // Set a new timeout for the next update
            setTimeout(updateTimerAPPL, randomTime);
        };
        const updateTimerAMZN = () => {
            // Generate a random time between 0 and 1000 milliseconds (1 second)
            const randomTime = Math.random() * 1000;
            
            // Update the stocks
            let randomAMZN = Math.random() * (220.00-170.00);
            randomAMZN = randomAMZN + 170.00
            setAMZNPrice(randomAMZN.toFixed(2));
            
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
    
    
    return (
    <div>
        <button onClick={() => window.location.href = '/'}>Home</button>

        <h1>Trading Block Challenge 2</h1>

        <p>MS (Morgan Stanley): ${msPrice}</p>
        <p>APPL (Apple): ${applPrice}</p>
        <p>AMZN (Amazon): ${amznPrice}</p>
    </div>
    );
}