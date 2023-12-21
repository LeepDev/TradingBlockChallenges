import { Link, useLocation } from 'react-router-dom'
import * as userService from '../../utilities/users-service'
import { useMediaQuery } from 'react-responsive';
import { useState } from 'react';

export default function NavBar ({setUser}) {
    const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
    const [menuOpen, setMenuOpen] = useState(isMobile);
    const location = useLocation()
    const nonActiveClass = "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
    const activeClass = "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
    const menuOpenClass = "w-full md:block md:w-auto"
    const navText = "text-gray-300 hover:text-gray-500 rounded-md px-3 py-2 text-base font-medium font-['Heebo']"
    const navTextActive = "text-teal hover:text-white rounded-md px-3 py-2 text-base font-medium font-['Heebo']"

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
                <div className="w-40 h-8 relative block md:none">
                    <Link to="/">
                        <img src="https://assets-global.website-files.com/5d5c50dcee289053140e5d5f/5d5d88ca3e9e5acdd003f839_logo.svg" alt="TradingBlock" />
                    </Link>
                </div>
                <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
                <div id="navbar-default" className="grow shrink basis-0 h-6 justify-start items-center gap-8 flex sm:none">
                    <Link to="/Challenge1" className={location.pathname == "/Challenge1" ? navTextActive : navText}>Challenge 1</Link>
                    <Link to="/Challenge2" className={location.pathname == "/Challenge2" ? navTextActive : navText}>Challenge 2</Link>
                    <Link to="/Challenge2Bonus" className={location.pathname == "/Challenge2Bonus" ? navTextActive : navText}>Challenge 2 (BONUS)</Link>
                    <Link to="/Challenge3" className={location.pathname == "/Challenge3" ? navTextActive : navText}>Challenge 3</Link>
                </div>
                <button className="text-white bg-teal hover:bg-teal/70 focus:outline-none focus:ring-4 focus:ring-teal font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={handleLogOut}>LOG OUT</button>
            </div>
        </>
    )
}