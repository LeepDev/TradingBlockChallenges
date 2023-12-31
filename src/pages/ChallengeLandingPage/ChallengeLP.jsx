export default function ChallengeLP() {
    return (
    <div className="bg-gradient-to-b from-midnight-blue to-rgb(255,196,126) h-screen w-full flex flex-col items-center justify-start pt-10 overflow-y-auto">
        <div className="flex flex-col items-center justify-start rounded-xl bg-midnight-blue w-10/12 px-10 py-5 border border-teal/10 shadow-teal shadow-2xl">
            <h1 className='text-white text-4xl font-bold'>TradingBlock Challenge Prompts</h1>
            <br/>

            <ol className='text-white list-decimal flex-ctr-ctr flex-col'>
                <li>You should build a simple web page that takes client’s input as number and calculates square root of it with precision to n decimal places where client selects the precision (could
    be from a pull down menu or a button or in other way).&nbsp; When calculating the square root, you should not use any function call, library, or a third party function but rather calculate it using only operations of +, -, *, and /.&nbsp;
                </li>
                <br></br>
                <li>
                    You will not need to be completely familiar with finance to complete this exercise.  However, you should know that stocks have a price, and the price moves around as the market moves around.
                    <br/>
                    <br/>
                    You are to build a demo web page that could display prices of three stocks:  MS, AAPL, and AMZN.  You may know them as Morgan Stanley, Apple, and Amazon, respectively.  The web page could either generate the random small price changes with the following restrictions: Each price will be rounded to the penny (0.01); prices shall vary within a range as follows, or use a delayed market data source if available (this requires a little bit more knowledge):
                    <br/>
                    <br/>
                    <ol className="list-[lower-roman] flex-ctr-ctr flex-col">
                        <li>MS:  between 70 and 90.00</li>
                        <li>AAPL:  between 170.00 and 220.00</li>
                        <li>AMZN:  between 120.00 and 160.00</li>
                    </ol>
                    <br/>
                    <br/>
                    The prices should change with reasonably small increments, with update frequency at most once per second.
                </li>
                <br></br>
                <li>
                Challenge task: inspired by top of our company’s landing page at <a href="www.tradingblock.com">www.tradingblock.com</a> and by our virtual trading platform <a href="https://vt.tradingblock.com">https://vt.tradingblock.com</a> , build  a simple one screen web page looking like ours but with quoted prices on it changing (no need to use market data). 
                </li>
            </ol>
        </div>
    </div>
    );
}