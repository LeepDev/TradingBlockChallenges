import './App.css';
import { Routes, Route } from 'react-router-dom'
import ChallengeLP from '../ChallengeLandingPage/ChallengeLP';
import Challenge1 from '../Challange1/Challenge1';

export default function App() {

  return (
    <main className="App">
      <Routes>
        <Route path="/" element={ <ChallengeLP /> } />
        <Route path="/Challenge1" element={ <Challenge1 /> } />
        <Route path="*" element={ <div><h1>404 Not Found</h1></div> }/>
      </Routes>
      
    </main>
  );
}
