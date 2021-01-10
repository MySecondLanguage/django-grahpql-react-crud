import {
    BrowserRouter as Router,withRouter,
    Route,
    Switch,
    Redirect
  } from "react-router-dom";


export function isLoggedIn() {
    let user = null;
    // user = JSON.parse(localStorage.getItem('persist:cargobid-auth'));
    // console.log("user : ",user)
    // debugger
    // console.log(user ,user.groups !== undefined, user.groups.indexOf('Agent') > -1)
    // debugger
    let status = false;
        user = JSON.parse(localStorage.getItem('persist:emp-token'));
            if(user)
                status = true;
    return status;

};

export function isEmp() {
    let user = null;
    // // user = JSON.parse(localStorage.getItem('persist:cargobid-auth'));
    // // console.log("user : ",user)
    // // debugger
    // // console.log(user ,user.groups !== undefined, user.groups.indexOf('Agent') > -1)
    // // debugger
    let status = false;
        user = JSON.parse(localStorage.getItem('persist:emp-token'));
            if(user)
                status = true;
    return status;
};


export const AuthRoute = ({ component: Component, authUser, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                isLoggedIn() ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                          pathname: '/login',
                          state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
  };



  export const EmpRoute = ({ component: Component, authUser, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                isEmp() ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                          pathname: '/login',
                          state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
  };