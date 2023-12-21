import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import {useState} from 'react'

export default function AuthPage({setUser}) {
    const [showSignUp, setSignUp] = useState(false)
    return (
    <div className="bg-gradient-to-b from-midnight-blue to-rgb(255,196,126) h-screen w-full flex-ctr-ctr flex-col">
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