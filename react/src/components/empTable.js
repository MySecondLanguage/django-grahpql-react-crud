import React, { useEffect, useState } from "react";
import client from "../gqlClient";
import { gql } from "@apollo/client";

import CreateForm from './createForm';

function EmpTable() {
  const [employees, setEmployee] = useState({ emp: [] });

  useEffect(() => {
    client
      .query({
        query: gql`
          query {
            employees {
              name
              role
            }
          }
        `,
      })
      .then((result) => {
        setEmployee({ emp: result.data.employees });
      });
  }, []);

  return (
    <div className="row">
     
        <CreateForm />
    
      <div className="col-md-12">
        <table className="table text-center">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody>
            {employees.emp.map((employee, key) => (
              <tr key={key}>
                <td scope="col">{employee.name}</td>
                <td scope="col">{employee.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmpTable;
