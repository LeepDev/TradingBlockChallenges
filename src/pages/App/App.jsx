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
    <main className="App flex-ctr-ctr flex-col antialiased">
      { user ? 
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
           <Route path="/" element={ <ChallengeLP/> } />
           <Route path="/Challenge1" element={ <Challenge1/> } />
           <Route path="/Challenge2" element={ <Challenge2/> } />
           <Route path="/Challenge3" element={ <Challenge3/> } />
           <Route path="/Challenge2Bonus" element={ <Challenge2Bonus/> } />
           <Route path="*" element={ <div><h1>404 Not Found</h1></div> }/>
          </Routes> 
        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
    // <main className="App">
    //   
    // </main>
  );
}
