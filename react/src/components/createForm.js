import React, { useEffect, useState } from "react";
import client from "../gqlClient";
import { gql, useMutation } from "@apollo/client";



function CreateForm () {

  const [formData, setFormData] = useState({});

  const onChangeHandler = (e) => {
    formData[e.target.name] = e.target.value
    setFormData(formData)
  }

  const ADD_EMPLOYEE = gql`
    mutation {
      createEmployee(
        name: "react",
        role: "designer",
      ) {
        id
        name
        role
      }
    }
`;

  // const [addEmployee, { data }] = useMutation(ADD_EMPLOYEE);

  const onSubmitHandler = (e) => {
    e.preventDefault();
  }

 

  return (
      <div className="col-md-12 mb-5">
        <form className="text-center create-form">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input onChange={onChangeHandler} type="text" name="name" className="form-control" id="name" placeholder="Name.."></input>
            </div>
            <div className="form-group">
              <label htmlFor="role">Role:</label>
              <input onChange={onChangeHandler} type="text" name="role" className="form-control" id="role" placeholder="Role.."></input>
            </div>
            <button onClick={onSubmitHandler} type="submit" className="btn btn-primary">Save</button>
        </form>
      </div>
  )
}


export default CreateForm;