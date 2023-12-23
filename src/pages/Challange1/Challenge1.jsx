import Decimal from 'decimal.js';
import { useEffect, useRef, useState } from 'react';

export default function Challenge1() {
    const inputRef = useRef(null);
    const [sqNumber, setSQNumber] = useState('')
    const [decimal, setDecimal] = useState(2)
    const [answer, setAnswer] = useState("Please enter a number!")
    const [inputWidth, setInputWidth] = useState(null)

    
    const clearInput = (event) => {
        if (event.keyCode === 8 || event.keyCode === 46) {
            event.target.value = null
            setSQNumber('')
            setDecimal(2)
        } else if (event.keyCode === 107 || (event.keyCode === 187 && event.shiftKey)) {
            setDecimal(decimal + 1);
            getSquareRoot(sqNumber)
        }
        else if (event.keyCode === 109 || (event.keyCode === 189 && !event.shiftKey)) {
            if (decimal > 0)
                setDecimal(decimal - 1);
            getSquareRoot(sqNumber)
        }
    }
    
    const handleInputChangeSQ = (event) => {
        const value = event.target.value;
        const regex = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/;
    
        if (regex.test(value)) {
            setSQNumber(value);
        }
      };

    const getInputWidth = (value) => {
        if (value) {
            let width = (value.length * 13 + 40) + 'px'
            setInputWidth(width);
        } else {
            setInputWidth('40px');
        }
    };

    const handleInputChangeDecimalUp = () => {
        setDecimal(decimal + 1);
        getSquareRoot(sqNumber)
      };
      
    const handleInputChangeDecimalDown = () => {
        if (decimal > 0)
            setDecimal(decimal - 1);
        getSquareRoot(sqNumber)
      };

    useEffect(() => {
        inputRef.current.focus();

        const runGetSquareRoot = async () => {
            if (sqNumber)
                getInputWidth(sqNumber)
            else
                getInputWidth(null)
            await getSquareRoot(sqNumber)
        }

        runGetSquareRoot()
    }, [sqNumber, decimal])
    
    const getSquareRoot = (value) => {
        let scientificNumber = false
        let tempAnswer = ''
        if (!value)
            tempAnswer ='Please enter a number!'
        else if (value == 0)
            tempAnswer ='0'
        else if (!scientificNumber) {
            //Step one break number into groups of 2
            let integerSubstringLength = 0
            const sqString = value.toString()
            const parts = sqString.split('.')
            let integerPart = 0
            if (parts[0].length > 0)
                integerPart = new Decimal(parts[0])
            const integerSubStrings = breakStringIntoSubstrings(integerPart.toString())
            let decimalSubStrings = []
            if (parts.length > 1) {
                const decimalPart  = parts[1]
                decimalSubStrings = breakStringIntoSubstrings(decimalPart, true)
            }
            //Step 2 find the biggest squared number that goes into the first group
            let startingGroup = new Decimal(integerSubStrings[0])
            let startingDecimalGroup = 0
            let groupNumber = ''
            if (startingGroup == 0) {
                if (decimalSubStrings[startingDecimalGroup].length > 1)
                    groupNumber = new Decimal(decimalSubStrings[startingDecimalGroup])
                else
                    groupNumber = new Decimal(decimalSubStrings[startingDecimalGroup] + '0')
                startingDecimalGroup++;
            } else
                groupNumber = startingGroup
            let remainder = ''
            let biggestSQ = getBiggestSquare(groupNumber)
            //Step 3 subtract the square of the biggest squared number from the group and take the remainder and add it to the next group
            remainder = groupNumber - biggestSQ*biggestSQ
            tempAnswer += biggestSQ
            let nextGroup = ''
            integerSubstringLength = integerSubStrings.length
            for (let ind = 1; ind < integerSubstringLength; ind++) {
                if (integerSubStrings[ind])
                    nextGroup = remainder.toString() + integerSubStrings[ind]
                else
                    nextGroup = remainder.toString() + '00'
                if (nextGroup.includes('e')) {
                    scientificNumber = true;
                    break
                }
                let nextGroupNumber = new Decimal(nextGroup)
                let x = (new Decimal(tempAnswer)*2).toString()
                if (x.includes('e')) {
                    scientificNumber = true;
                    break
                }
                let nextDivisor = getNextBiggestDivisor(nextGroupNumber, x)
                tempAnswer += nextDivisor
                remainder = nextGroupNumber - new Decimal(x+nextDivisor.toString())*nextDivisor
            }

            for (let ind = startingDecimalGroup; ind <= decimal+startingDecimalGroup && !scientificNumber; ind++) {
                if (decimalSubStrings[ind]) {
                    if (decimalSubStrings[ind].length > 1)
                        nextGroup = remainder.toString() + decimalSubStrings[ind]
                    else
                        nextGroup = remainder.toString() + decimalSubStrings[ind] + '0'
                }
                else {
                    if (remainder.toString().includes('e')) {
                        scientificNumber = true;
                        break;
                    }
                    nextGroup = remainder.toString() + '00'
                }
                if (nextGroup.includes('e')) {
                    scientificNumber = true;
                    break
                }
                let nextGroupNumber = new Decimal(nextGroup)
                let x = (new Decimal(tempAnswer)*2).toString()
                if (x.includes('e')) {
                    scientificNumber = true;
                    break
                }
                let nextDivisor = getNextBiggestDivisor(nextGroupNumber, x)
                tempAnswer += nextDivisor
                remainder = nextGroupNumber - new Decimal(x+nextDivisor.toString())*nextDivisor
            }
            //round up
            tempAnswer = tempAnswer.slice(0,(integerSubstringLength + decimal + 1) - 1) + '.' + tempAnswer.slice((integerSubstringLength + decimal + 1) - 1)
            tempAnswer = new Decimal(tempAnswer).toFixed(0)
            tempAnswer = tempAnswer.toString()
            //add decimal place
            tempAnswer = tempAnswer.slice(0,integerSubstringLength - startingDecimalGroup) + '.' + tempAnswer.slice(integerSubstringLength - startingDecimalGroup)
            tempAnswer = new Decimal(tempAnswer).toFixed(decimal)
        }
        if (!scientificNumber){
            setAnswer(tempAnswer)
        }
        else
            setAnswer("The answer contains a scientific number which is outside the bounds of this operation.  Many apologies.  :(")
    }

    function getNextBiggestDivisor(number, numString) {
        let biggestDivisor = 0
        for (let ind = 0; new Decimal(numString+ind.toString())*ind <= number; ind++) {
            biggestDivisor = ind
        }
        return biggestDivisor
    }

    function getBiggestSquare(number) {
        let biggestSQ = 1
        for (let ind = 1; ind*ind <= number; ind++) {
            biggestSQ = ind
        }
        return biggestSQ
    }
    
    function breakStringIntoSubstrings(inputString, decimal = false) {
        const result = [];
        let ind = 0
        if (!decimal && inputString.length % 2 === 1) {
            ind = 1
            result.push(inputString.slice(0, 1))
        }
        
        for (let i = ind; i < inputString.length; i += 2) {
          result.push(inputString.slice(i, i + 2));
        }
      
        return result;
      }

    return (
    <div className="bg-gradient-to-b from-midnight-blue to-rgb(255,196,126) h-screen w-screen flex flex-col items-center justify-start pt-10">
        <div className="flex flex-col items-center justify-start border rounded-xl border-teal/10 w-11/12 h-fit bg-midnight-blue shadow-teal shadow-2xl mt-10 py-10">
            <h1 className='text-white md:text-4xl sm:text-3xl font-bold pb-10 text-2x1'>Trading Block Challenge 1</h1>

            <div className='text-white md:text-xl sm:text-lg text-base flex-ctr-ctr flex-col'>
                What is the square root of<br/>
                <input className='text-black text-center font-bold block py-2.5 px-0 w-full text-lg bg-transparent border-0 border-b-2 appearance-none dark:text-white dark:border-white dark:focus:border-teal focus:outline-none focus:ring-0 focus:border-teal peer' ref={inputRef} style={{ width: inputWidth}} type="text" value={sqNumber} onKeyDown={clearInput} onChange={handleInputChangeSQ} />
                to the {decimal}th place?
                <div className='flex-ctr-ctr p-2'>
                    <button className="text-white bg-teal hover:bg-teal/70 focus:outline-none focus:ring-4 focus:border-primary-600  font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={handleInputChangeDecimalUp}>+</button>
                    <button className="text-white bg-teal hover:bg-teal/70 focus:outline-none focus:ring-4 focus:border-primary-600  font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={handleInputChangeDecimalDown}>-</button>
                </div>
            </div>
            <p className='text-teal text-base pb-10 text-center w-3/4'>
                Please enter a valid positive number and clear the input using the delete or the backspace key. Also, feel free to use the +/- keys to increment and decrement the decimal place. The cursor is focused in the input box on default.
                <br />
                I.E. - 123, 123.12, 0.5, .34
            </p>
            {
                answer.length > 106 ?
                <div className='text-center text-white font-bold w-3/4 mt-4'>{answer}</div>
                :
                <input type="text" id="disabled-input" aria-label="disabled input"  value={answer}
                className="mb-5 w-fit text-center font-bold text-lg border rounded-lg block p-2.5 cursor-not-allowed dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-400" disabled />
            }
        </div>
    </div>
    );
}