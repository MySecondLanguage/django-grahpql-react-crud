import React, { useEffect, useState } from "react";

function LoginForm() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
      });


    const onChangeHandler = (e) => {
        formData[e.target.name] = e.target.value
        setFormData(formData)
      }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        console.log(formData)
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
                                type="text"
                                className="form-control"
                                id="username"
                                aria-describedby="emailHelp"
                                name="username"
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