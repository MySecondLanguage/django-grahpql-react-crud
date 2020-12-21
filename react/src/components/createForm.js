import React, { useEffect, useState } from "react";
import client from "../gqlClient";
import { gql, useMutation } from "@apollo/client";
import props from 'prop-types';



function CreateForm (props) {

  const [formData, setFormData] = useState({
    name: '',
    role: '',
  });

  const onChangeHandler = (e) => {
    formData[e.target.name] = e.target.value
    setFormData(formData)
  }


  const onSubmitHandler = (e) => {
    e.preventDefault();
    props.onClickHandler(formData);
    document.getElementById("createEmpForm").reset();
    setFormData({name: '', role: ''})
  };

 

  return (
      <div className="col-md-12 mb-5">
        <form id="createEmpForm" onSubmit={onSubmitHandler} className="text-center create-form">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input defaultValue={formData.name} onChange={onChangeHandler} type="text" name="name" className="form-control" id="name" placeholder="Name.." required></input>
            </div>
            <div className="form-group">
              <label htmlFor="role">Role:</label>
              <input defaultValue={formData.role} onChange={onChangeHandler} type="text" name="role" className="form-control" id="role" placeholder="Role.." required></input>
            </div>
            <button type="submit" className="btn btn-primary">Save</button>
        </form>
      </div>
  )
}


export default CreateForm;