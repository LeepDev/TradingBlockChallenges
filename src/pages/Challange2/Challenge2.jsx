import { useState } from "react";

export default function Challenge2() {
    const [msPrice, setMSPrice] = useState(70.00)
    const [applPrice, setAPPLPrice] = useState(170.00)
    const [amznPrice, setAMZNPrice] = useState(120.00)

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