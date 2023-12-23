import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import {useState} from 'react'

export default function AuthPage({setUser}) {
    const [showSignUp, setSignUp] = useState(false)
    return (
    <div className="h-screen w-full flex flex-col items-center justify-start">
            {/* <h1 className="flex-ctr-ctr flex-col text-white font-bold pb-10">AuthPage</h1> */}
            {
                showSignUp ? 
                <>
                    <SignUpForm setUser={setUser} setSignUp={setSignUp} />
                    {/* <button onClick={() => setSignUp(!showSignUp)}>Login</button> */}
                </>
                :
                <>
                    <LoginForm setUser={setUser} setSignUp={setSignUp} />
                    {/* <button onClick={() => setSignUp(!showSignUp)}>Sign Up</button> */}
                </>
            }
    </div>
    );
}