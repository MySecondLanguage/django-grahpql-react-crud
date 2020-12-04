
import React, { useEffect, useState } from 'react';
import client from '../gqlClient';
import { gql } from '@apollo/client';

function EmpTable() {

    useEffect(() => {

        client
            .query({
                query: gql`
                query GetRates {
                    rates(currency: "USD") {
                    currency
                    }
                }
                `
            })
            .then(result => console.log(result));
    })

    return (
        <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Role</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                </tr>
              </tbody>
          </table>
    )
};


export default EmpTable;