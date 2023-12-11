# Trading Block Challenges

## Useful Links
[Miro Board](https://miro.com/app/board/uXjVNEHOQ70=/
)

## Trading Block Challenges
* Displays landing page that allows user/client to access all 3 challenges
* uses custom styling


---


### Trading Block Challenge 1 Requirements
* Build a webpage displaying 2 inputs
* input 1 - a number that will be used in a square root formula
* input 2 - a number for precision (how many decimal places you would want to go. Defaulted to 0 if no input is set). May choose to be a pull down or a button (+/-).

### Trading Block Challenge 1 MVP
* A webpage built in react
* meets input requirements and calculates without use of libraires (aka uses only basic math)
* test against this website (https://web2.0calc.com/)


---


### Trading Block Challenge 2 Requirements
* Build a webpage that displays prices of 3 stocks (MS, AAPL and AMZN).
    * Morgan Stanely
    * Apple
    * Amazon
* This webpage can generate the random small price changes with the following restrictions
    * each price is rounded up to the nearest penny
    * prices will vary withing these ranges (or use a delayed market data source)
        * MS:    $70.00-90.00
        * AAPL:  $170.00-220.00 
        * AMZN:  $120.00-160.00
* Prices should update frequently (at most one second)

### Trading Block Challenge 2 MVP
* A webpage built in react
* meets requirements
* updates freqently (at most one second)
* BONUS: attach a delayed market data source

---

# Trading Block Challenge Prompts

1. You should build a simple web page that takes client’s input as number and calculates square root of it with precision to n decimal places where client selects the precision (could be from a pull down menu or a button or in other way).  When calculating the square root, you should not use any function call, library, or a third party function but rather calculate it using only operations of +, -, *, and /. 
 

2. You will not need to be completely familiar with finance to complete this exercise.  However, you should know that stocks have a price, and the price moves around as the market moves around. 
 

    You are to build a demo web page that could display prices of three stocks:  MS, AAPL, and AMZN.  You may know them as Morgan Stanley, Apple, and Amazon, respectively.  The web page could either generate the random small price changes with the following restrictions: Each price will be rounded to the penny (0.01); prices shall vary within a range as follows, or use a delayed market data source if available (this requires a little bit more knowledge):

        i.      MS:  between 70 and 90.00

        ii.      AAPL:  between 170.00 and 220.00

        iii.      AMZN:  between 120.00 and 160.00

    The prices should change with reasonably small increments, with update frequency at most once per second. 

3. Challenge task: inspired by top of our company’s landing page at www.tradingblock.com and by our virtual trading platform https://vt.tradingblock.com , build  a simple one screen web page looking alike ours but with quoted prices on it changing (no need to use market data). 