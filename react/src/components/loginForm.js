import React, { useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";

function LoginForm(props) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });


    const LOGIN_QL = gql`
        mutation TokenAuth($email: String!, $password: String!) {
            tokenAuth(email: $email, password: $password) {
            token
            payload
            refreshExpiresIn
            }
        }
  `;

  const [getToken, ] = useMutation(LOGIN_QL);


    const onChangeHandler = (e) => {
        formData[e.target.name] = e.target.value
        setFormData(formData)
      };

    const login = () => {
        getToken({variables: formData}).then((response) => {
            localStorage.setItem('persist:emp-token', JSON.stringify(response.data.tokenAuth));
            var authenticated = JSON.parse(localStorage.getItem('persist:emp-token'));
            if (authenticated) {
                props.history.push('/');
            }
        })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        login();
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div>
                    <form onSubmit={onSubmitHandler}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="email"
                                className="form-control"
                                id="username"
                                aria-describedby="emailHelp"
                                name="email"
                                onChange={onChangeHandler}
                                placeholder="Enter username"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="epassword">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="epassword"
                                name="password"
                                onChange={onChangeHandler}
                                placeholder="Password"/>
                        </div>

                        <button className="btn btn-primary">Login</button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;