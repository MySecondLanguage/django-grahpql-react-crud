import React from "react";



function CreateForm (props) {

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (props.isEdit) {
      props.onEditHandler(props.formData);
    } else {
      props.onCreatekHandler(props.formData);
    }
    

    document.getElementById("empForm").reset();
    props.setFormData({name: '', role: ''})
  };

  

 

  return (
      <div className="col-md-12 mb-5">
        <form id="empForm" onSubmit={onSubmitHandler} className="text-center create-form">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input defaultValue={props.formData.name} onChange={props.onChangeHandler} type="text" name="name" className="form-control" id="name" placeholder="Name.." required></input>
            </div>
            <div className="form-group">
              <label htmlFor="role">Role:</label>
              <input defaultValue={props.formData.role} onChange={props.onChangeHandler} type="text" name="role" className="form-control" id="role" placeholder="Role.." required></input>
            </div>
            <button type="submit" className={`btn ${props.isEdit ? 'btn-info' : 'btn-primary'}`}>
              {props.isEdit ? 'Edit' : 'Save'}
            </button>
        </form>
      </div>
  )
}


export default CreateForm;