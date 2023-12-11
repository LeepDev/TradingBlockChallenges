import { useState } from 'react';
import { Link } from 'react-router-dom'

export default function Challenge1() {
    const [sqNumber, setSQNumber] = useState(0)

    const handleInputChange = (event) => {
        const value = event.target.value;
        setSQNumber(value);
      };
    

    return (
    <div>
        <button><Link to="/">Home</Link></button>

        <h1>Trading Block Challenge 1</h1>

        <p>This is a sentence with an input: <input type="text" value={sqNumber} onChange={handleInputChange} /></p>
        <p>You typed: {sqNumber}</p>
    </div>
    );
}