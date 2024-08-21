import React from 'react';
import EmployeeRow from './EmployeeRow';

const EmployeeTable = ({ employeeList, setEmployeeList, setEditEmployee }) => {
  const rowStyle = { border: '1px solid silver', padding: 4 };
  const tableHeaders = ['Serial No.', 'First Name', 'Last Name', 'Age', 'Date of Joining', 'Title', 'Department', 'Employee Type', 'Current Status', 'Actions'];

  // Check if employeeList is empty or undefined
  if (!employeeList || employeeList.length === 0) {
    return <p>No employees found.</p>;
  }

  const employeeRows = employeeList.map((employee, index) => (
    <EmployeeRow
      key={employee.id}
      index={index + 1} // Serial number
      rowStyle={rowStyle}
      employee={employee}
      setEmployeeList={setEmployeeList}
      setEditEmployee={setEditEmployee}
    />
  ));

  return (
    <table className='tableemployee'>
      <thead className='tablehead'>
        <tr className='tablerow'>
          {tableHeaders.map((header, index) => (
            <th key={index} style={rowStyle}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody className='tablebody'>{employeeRows}</tbody>
    </table>
  );
};

export default EmployeeTable;
