import React, { useEffect, useState } from "react";
import client from "../gqlClient";
import { gql, useMutation } from "@apollo/client";

import CreateForm from './createForm';

function EmpTable() {
  const [employees, setEmployee] = useState({ emp: [] });

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

const [deleteEmployee, { data }] = useMutation(DELETE_EMPLOYEE);


  const onDeleteHandler = (id, key) => {

  deleteEmployee({
    variables: {
      id: id
    }
  }).then((response) => {
    setEmployee({emp: [...employees.emp.filter((empl) => empl.id != id)]})
  })


  }

  return (
    <div className="row">
     
        <CreateForm />
    
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
                  <button className="btn btn-info ml-1">Edit</button>
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
