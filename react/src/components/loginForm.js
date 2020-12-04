import React from 'react';

function LoginForm() {
    return (
        <form>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                    type="email"
                    className="form-control"
                    id="username"
                    aria-describedby="emailHelp"
                    placeholder="Enter username"/>
            </div>
            <div className="form-group">
                <label htmlFor="epassword">Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="epassword"
                    placeholder="Password"/>
            </div>

            <button className="btn btn-primary">Login</button>
        </form>
    )
}

export default LoginForm;