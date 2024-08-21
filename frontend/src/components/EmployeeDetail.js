import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_EMPLOYEE_BY_ID } from '../mutations/employeeQueries';
import { useParams } from 'react-router-dom';

const EmployeeDetail = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const { loading, error, data } = useQuery(GET_EMPLOYEE_BY_ID, {
    variables: { id },
  });

  useEffect(() => {
    if (data && data.employee) {
      setEmployee(data.employee);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;
  if (!employee) return null;

  // Format date of joining
  const dateOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "UTC", // Specify the timezone as UTC
};

  const formattedDateOfJoining = new Date(employee.dateOfJoining).toLocaleDateString("en-GB", dateOptions);

  return (
    <div >
    <div >
    <div>
    <div>
      <div className='employeedetailsheader'>
        <h3 className="employeedetailstitle">Employee Details</h3>
      </div>
      <div className="employeesdetailsbody">
        <form>
          <div className='formdiv'>
            <div className="formcontent">
              <label>First Name</label>
              <input type="text" className="forminput" value={employee.firstName} readOnly />
            </div>
            <div className="formcontent">
              <label>Last Name</label>
              <input type="text" className="forminput" value={employee.lastName} readOnly />
            </div>
            <div className="formcontent">
              <label>Age</label>
              <input type="number" className="forminput" value={employee.age} readOnly />
            </div>
            <div className="formcontent">
              <label>Date of Joining</label>
              <input type="text" className="forminput" value={formattedDateOfJoining} readOnly />
            </div>
            <div className="formcontent">
              <label>Title</label>
              <input type="text" className="forminput" value={employee.title} readOnly />
            </div>
            <div className="formcontent">
              <label>Department</label>
              <input type="text" className="forminput" value={employee.department} readOnly />
            </div>
            <div className="formcontent">
              <label>Employee Type</label>
              <input type="text" className="forminput" value={employee.employeeType} readOnly />
            </div>
            <div className="formcontent">
              <label>Current Status</label>
              <input type="text" className="forminput" value={employee.currentStatus ? 'Working' : 'Not Working'} readOnly />
            </div>
          </div>
        </form>
      </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default EmployeeDetail;
