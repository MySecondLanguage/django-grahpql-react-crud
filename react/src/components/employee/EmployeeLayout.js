import EmpTable from '../../components/empTable';
import React, { Component, Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';


function EmployeeLayout(props) {
    const { match } = props;
    return (
        <div className="container border">
            <div className="row mb-5">
                <div className="col-md-12">
                    <div className="text-center bg-secondary p-lg-3">
                        <h1>Django GraphQL and ReactJS CRUD</h1>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                        <Switch>
                            <Route
                                path={`${match.url}/`}
                                exact
                                render={props => <EmpTable {...props} />}
                            />
                        </Switch>
                </div>
            </div>
        </div>
    )
};


export default withRouter(EmployeeLayout);