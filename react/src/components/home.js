import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <Link to="/employee">Employee Board</Link>
                </div>
            </div>
        </div>
    )
 }
 
 export default Home;