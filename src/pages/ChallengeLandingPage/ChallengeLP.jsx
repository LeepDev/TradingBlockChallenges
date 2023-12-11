import { Link } from 'react-router-dom'

export default function ChallengeLP() {
    return (
    <div>
        <h1>Trading Block Challenges</h1>

        

        <button><Link to="/Challenge1">Challenge 1</Link></button>
        <button>Challenge 2</button>
        <button>Challenge 3</button>
    </div>
    );
}