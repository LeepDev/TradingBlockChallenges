import { Link, useLocation } from 'react-router-dom'
import * as userService from '../../utilities/users-service'
import { useMediaQuery } from 'react-responsive';
import { useState } from 'react';

export default function NavBar ({setUser}) {
    const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
    const [menuOpen, setMenuOpen] = useState("hidden");
    const location = useLocation()
    const navText = "text-gray-300 hover:text-gray-500 rounded-md px-3 py-2 text-base font-medium font-['Heebo']"
    const navTextActive = "text-teal hover:text-white rounded-md px-3 py-2 text-base font-medium font-['Heebo']"

    // Add the following function
    function handleLogOut() {
        // Delegate to the users-service
        userService.logOut();
        // Update state will also cause a re-render
        setUser(null);
    }

    function toggleMenu(event) {
        event.preventDefault()
        if (menuOpen === "hidden")
            setMenuOpen(true)
        else
            setMenuOpen(!menuOpen)
    }

    return (
        <div className='z-10'>
            <nav className="fixed top-0 left-0 w-full h-16 px-6 bg-midnight-blue justify-between items-center gap-8 inline-flex z-30">
                <button id='hamburger' onClick={(e) => toggleMenu(e)} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
                <div className="w-40 h-8 relative block md:none">
                    <Link to="/" onClick={() => isMobile && menuOpen && menuOpen != "hidden" && setMenuOpen(!menuOpen)}>
                        <img src="https://assets-global.website-files.com/5d5c50dcee289053140e5d5f/5d5d88ca3e9e5acdd003f839_logo.svg" alt="TradingBlock" />
                    </Link>
                </div>
                <div id="navbar-default" className="grow shrink basis-0 h-6 justify-start items-center gap-8 lg:flex md:flex hidden">
                    <Link to="/Challenge1" className={location.pathname == "/Challenge1" ? navTextActive : navText}>Challenge 1</Link>
                    <Link to="/Challenge2" className={location.pathname == "/Challenge2" ? navTextActive : navText}>Challenge 2</Link>
                    <Link to="/Challenge2Bonus" className={location.pathname == "/Challenge2Bonus" ? navTextActive : navText}>Challenge 2 (BONUS)</Link>
                    <Link to="/Challenge3" className={location.pathname == "/Challenge3" ? navTextActive : navText}>Challenge 3</Link>
                </div>
                <button className="min-w-fit text-white bg-teal hover:bg-teal/70 focus:outline-none focus:ring-4 focus:ring-teal font-medium rounded-full text-sm px-5 py-2.5 text-center" onClick={handleLogOut}>LOG OUT</button>
            </nav>
            <div className={menuOpen === "hidden" ? "hidden" : menuOpen ? "fixed top-16 left-0 flex flex-col z-20 bg-midnight-blue w-full pb-2 px-10 animate__animated animate__slideInDown animate__fadeInDown" : "fixed top-16 left-0 flex flex-col z-10 bg-midnight-blue h-fit w-full pb-2 px-10 animate__animated animate__fadeOutUp"}>
                <hr className='bg-white' />
                <Link to="/Challenge1" onClick={() => isMobile && menuOpen && setMenuOpen(!menuOpen)} className={location.pathname == "/Challenge1" ? navTextActive : navText}>Challenge 1</Link>
                <Link to="/Challenge2" onClick={() => isMobile && menuOpen && setMenuOpen(!menuOpen)} className={location.pathname == "/Challenge2" ? navTextActive : navText}>Challenge 2</Link>
                <Link to="/Challenge2Bonus" onClick={() => isMobile && menuOpen && setMenuOpen(!menuOpen)} className={location.pathname == "/Challenge2Bonus" ? navTextActive : navText}>Challenge 2 (BONUS)</Link>
                <Link to="/Challenge3" onClick={() => isMobile && menuOpen && setMenuOpen(!menuOpen)} className={location.pathname == "/Challenge3" ? navTextActive : navText}>Challenge 3</Link>
            </div>
            {
                menuOpen && menuOpen != "hidden" && <div aria-hidden="true" className='fixed inset-0 z-10 bg-gray-700 bg-opacity-50 animate__animated animate__slideInDown animate__fadeInDown' onClick={() => isMobile && menuOpen && setMenuOpen(!menuOpen)}></div>
            }
        </div>
    )
}