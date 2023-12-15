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
            <div className="w-screen h-16 px-6 bg-slate-900 justify-start items-center gap-8 inline-flex">
                <div className="w-40 h-8 relative">
                    <Link to="/">
                        <img src="https://assets-global.website-files.com/5d5c50dcee289053140e5d5f/5d5d88ca3e9e5acdd003f839_logo.svg" alt="TradingBlock" class="logo-img" />
                    </Link>
                </div>
                <div className="grow shrink basis-0 h-6 justify-start items-center gap-8 flex">
                    <Link to="/Challenge1" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium font-['Heebo']">Challenge 1</Link>
                    <Link to="/Challenge2" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium font-['Heebo']">Challenge 2</Link>
                    <Link to="/Challenge2Bonus" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium font-['Heebo']">Challenge 2 (Real Time Data)</Link>
                    <Link to="/Challenge3" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium font-['Heebo']">Challenge 3</Link>
                </div>
                <button className="w-28 h-9 py-1 bg-white rounded-full justify-start items-center gap-2.5 flex hover:bg-cyan-300"  onClick={handleLogOut}>
                    <div className="grow shrink basis-0 text-center text-slate-900 text-base font-bold font-['Heebo']">LOG OUT</div>
                </button>
            </div>            
        </>
    )
}