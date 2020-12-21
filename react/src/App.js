import logo from './logo.svg';
import './App.css';
// import LoginFrom from './components/loginForm';
import EmpTable from './components/empTable';
// import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import client from './gqlClient';


function App() {
  return (
    <ApolloProvider client={client}>
      <div className="container border">
      <div className="row mb-5">
          <div className="col-md-12">
              <div className="text-center bg-secondary p-lg-3">
                <h1>Django GraphQL and ReactJS CRUD</h1>
              </div>
          </div>
      </div>

        <EmpTable />
      </div>
    </ApolloProvider>
  );
}

export default App;
