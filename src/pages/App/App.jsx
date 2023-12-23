import { useState } from 'react';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import { Routes, Route } from 'react-router-dom'
import NavBar from '../../components/NavBar/NavBar';
import { getUser } from '../../utilities/users-service';
import ChallengeLP from '../ChallengeLandingPage/ChallengeLP';
import Challenge1 from '../Challange1/Challenge1';
import Challenge2 from '../Challange2/Challenge2';
import Challenge3 from '../Challange3/Challenge3';
import Challenge2Bonus from '../Challange2Bonus/Challenge2Bonus';

export default function App() {

  const [user, setUser] = useState(getUser())

  return (
    <div className='w-screen h-screen antialiased overflow-hidden'>
    {
      user && <NavBar setUser={setUser} />
    }
    <main className="bg-gradient-to-b from-midnight-blue to-rgb(255,196,126) w-screen h-screen flex flex-ctr-ctr flex-col fixed top-16 overflow-y-auto pb-20">
      { user ? 
        <>
          <Routes>
           <Route path="/" element={ <ChallengeLP/> } />
           <Route path="/Challenge1" element={ <Challenge1/> } />
           <Route path="/Challenge2" element={ <Challenge2/> } />
           <Route path="/Challenge3" element={ <Challenge3/> } />
           <Route path="/Challenge2Bonus" element={ <Challenge2Bonus/> } />
           <Route path="*" element={ <div className='border rounded-lg bg-slate-500 h-5/6 flex-ctr-ctr w-5/6'><h1>404 Not Found</h1></div> }/>
          </Routes> 
        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
    </div>
    
    // <main className="App">
    //   
    // </main>
  );
}
