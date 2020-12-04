import logo from './logo.svg';
import './App.css';
// import LoginFrom from './components/loginForm';
import EmpTable from './components/empTable';

function App() {
  return (
    <div className="container">
      <div className='row'>
          <div className="col-md-12">
              <EmpTable />
          </div>
      </div>
    </div>
  );
}

export default App;
