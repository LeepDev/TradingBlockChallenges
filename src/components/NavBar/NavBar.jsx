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
        <nav>
            <span>Welcome, {user.name}!</span>
            &nbsp; | &nbsp;
            <Link to="/">Home</Link>
            &nbsp; | &nbsp;
            <Link to="/Challenge1">Challenge 1</Link>
            &nbsp; | &nbsp;
            <Link to="/Challenge2">Challenge 2</Link>
            &nbsp; | &nbsp;
            <Link to="/Challenge2Bonus">Challenge 2 (Real Time Data)</Link>
            &nbsp; | &nbsp;
            <Link to="/Challenge3">Challenge 3</Link>
            &nbsp; | &nbsp;
            <Link to="" onClick={handleLogOut}>Log Out</Link>
        </nav>
    )
}