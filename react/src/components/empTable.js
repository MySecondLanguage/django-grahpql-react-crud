import React, { useEffect, useState } from "react";
import client from "../gqlClient";
import { gql, useMutation, useQuery } from "@apollo/client";

import CreateForm from './createForm';

function EmpTable() {
  const [employees, setEmployee] = useState({ emp: [] });
  const [status, setStatus] = useState({
    isEdit: false,
  });

  const [formData, setFormData] = useState({
    name: '',
    role: '',
  });

  const onChangeHandler = (e) => {
    formData[e.target.name] = e.target.value
    setFormData(formData)
  }

  useEffect(() => {
    client
      .query({
        query: gql`
          query {
            employees {
              id
              name
              role
            }
          }
        `,
      })
      .then((result) => {
        setEmployee({ emp: [...result.data.employees] });
      });
  }, []);


  const DELETE_EMPLOYEE = gql`
    mutation deleteEmployee ($id: ID!){
      deleteEmployee (id: $id){
        ok
      }
    }
`;

  const ADD_EMPLOYEE = gql`
      mutation createEmployee ($name: String!, $role: String!){
        createEmployee (name: $name, role: $role){
          id
          name
          role
        }
      }
  `;

  const EDIT_EMPLOYEE = gql`
      mutation editEmp ($id: ID!, $name: String!, $role: String!){
        updateEmployee(id: $id, name: $name, role: $role) {
          employee {
            id
            name
            role
          }
        }
      }
  `;

  const GET_EMPLOYEE = gql`
    query getEmp($id: String) {
      employeeById(id: $id) {
        id
        name
        role
      }
    }
  `;

  const [addEmployee, ] = useMutation(ADD_EMPLOYEE);

  const [editEmployee,] = useMutation(EDIT_EMPLOYEE);

  const [deleteEmployee, ] = useMutation(DELETE_EMPLOYEE);
  const {refetch} = useQuery(GET_EMPLOYEE)


  const onDeleteHandler = (id, key) => {
    deleteEmployee({
      variables: {
        id: id
      }
    }).then((response) => {
      setEmployee({emp: [...employees.emp.filter((empl) => empl.id != id)]})
    })
  };

  const onCreateHandler = (formData) => {
      addEmployee(
        { variables: formData }
      ).then((response => {
          setEmployee({emp: [...employees.emp, response.data.createEmployee]})
      }))
  };


  const onEditHandler = (formData) => {
    editEmployee(
      { variables: formData }
    ).then((response => {
        setEmployee({emp: employees.emp.map((emp) => emp.id === response.data.updateEmployee.employee.id ? response.data.updateEmployee.employee: emp )})
        // setEmployee({emp: [...employees.emp, response.data.updateEmployee.employee]})
        console.log(response.data.updateEmployee.employee)
    }))
  };


  const openEditForm = (id) => {
    setStatus({isEdit: true});
    refetch({
      id: id
    }).then((response) => {
      setFormData({
        name: response.data.employeeById.name,
        role: response.data.employeeById.role,
        id: response.data.employeeById.id,
      });
    })
    
  }

  return (
    <div className="row">
     
        <CreateForm onCreatekHandler={onCreateHandler} onEditHandler={onEditHandler} isEdit={status.isEdit} onChangeHandler={onChangeHandler} formData={formData} setFormData={setFormData} />
    
      <div className="col-md-12">
        <table className="table text-center">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Role</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.emp.map((employee, key) => (
              <tr key={key}>
                <td scope="col">{employee.name}</td>
                <td scope="col">{employee.role}</td>
                <td>
                  <button onClick={() => onDeleteHandler(employee.id, key)} className="btn btn-danger mr-1">Delete</button>
                  <button onClick={() => openEditForm(employee.id)} className="btn btn-info ml-1">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmpTable;
