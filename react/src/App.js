// import logo from './logo.svg';
import './App.css';
// import LoginFrom from './components/loginForm';
import EmpTable from './components/empTable';
// import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import client from './gqlClient';

import React, { Component, Suspense } from "react";

import {isLoggedIn } from './auth';

import ViewError from './components/ViewError';
import Home from './components/home';
import PrivateHome from './components/privateHome';
import LoginForm from './components/loginForm';

import HrRouters from '../src/components/hr/App';

import {
  BrowserRouter as Router,withRouter,
  Route,
  Switch,
  Redirect
} from "react-router-dom";



const loginUser = {'name': 'jhon doe', 'username': 'doe'};


const AuthRoute = ({ component: Component, authUser, ...rest }) => {
  return (
      <Route
          {...rest}
          render={props =>
              isLoggedIn() ? (
                  <Component {...props} />
              ) : (
                  <Redirect
                      to={{
                        pathname: '/user/login',
                        state: { from: props.location }
                      }}
                  />
              )
          }
      />
  );
};



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

      <Suspense fallback={<div className="loading" />}>
        <Router>
          <Switch>
            <AuthRoute
              path={"/privatehome"}
              authUser={loginUser}
              component={PrivateHome}
            />
            {/* <Redirect exact from={`/`} to={`/landing`} /> */}
            <Route
              path={"/error"}
              exact
              render={props => <ViewError {...props} />}
            />
             <Route
              path={"/emptable"}
              exact
              render={props => <EmpTable {...props} />}
            />
            <Route
              path={"/hr"}
              render={props => <HrRouters {...props} />}
            />
             <Route
              path={"/user/login"}
              exact
              render={props => <LoginForm {...props} />}
            />
            <Route
              path={"/"}
              exact
              render={props => <Home {...props} />}
            />
            <Redirect to={"/"} />
          </Switch>
        </Router>
      </Suspense>

      </div>
    </ApolloProvider>
  );
}

export default App;
