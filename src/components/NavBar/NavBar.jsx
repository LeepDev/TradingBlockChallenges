import { Link } from 'react-router-dom'
import * as userService from '../../utilities/users-service'

export default function NavBar ({user, setUser}) {
    // Add the following function
    function handleLogOut() {
        // Delegate to the users-service
        userService.logOut();
        // Update state will also cause a re-render
        setUser(null);
    }

    return (
        <>
            <div className="fixed top-0 w-screen h-16 px-6 bg-midnight-blue justify-start items-center gap-8 inline-flex">
                <div className="w-40 h-8 relative">
                    <Link to="/">
                        <img src="https://assets-global.website-files.com/5d5c50dcee289053140e5d5f/5d5d88ca3e9e5acdd003f839_logo.svg" alt="TradingBlock" />
                    </Link>
                </div>
                <div className="grow shrink basis-0 h-6 justify-start items-center gap-8 flex">
                    <Link to="/Challenge1" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium font-['Heebo']">Challenge 1</Link>
                    <Link to="/Challenge2" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium font-['Heebo']">Challenge 2</Link>
                    <Link to="/Challenge2Bonus" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium font-['Heebo']">Challenge 2 (BONUS)</Link>
                    <Link to="/Challenge3" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium font-['Heebo']">Challenge 3</Link>
                </div>
                <button className="text-white bg-teal hover:bg-teal/70 focus:outline-none focus:ring-4 focus:ring-teal font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={handleLogOut}>LOG OUT</button>

            </div>            
        </>
    )
}