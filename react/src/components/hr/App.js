import React, { Component, Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';

import HrSettings from '../hr/settings';
import HrHome from '../hr/home';


function App (props) {
    const { match } = props;

    return (
  
        <div className="dashboard-wrapper">
          
            <Switch>
                <Route
                    path={`${match.url}/`}
                    exact
                    render={props => <HrHome {...props} />}
                />
                <Route
                    path={`${match.url}/settings`}
                    render={props => <HrSettings {...props} />}
                />
            </Switch>
      
        </div>
    );
}



export default withRouter(App);
