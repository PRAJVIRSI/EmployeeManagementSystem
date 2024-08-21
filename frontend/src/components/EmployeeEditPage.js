// EmployeeEditPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import EmployeeEdit from './EmployeeEdit';

const EmployeeEditPage = () => {
  const { id } = useParams();

  return (
    <div className='editemployeecontainer'>
        <div className='editemployeerow'>
            <div className="editemployeecol">
            <EmployeeEdit employeeId={id} />
            </div>
        </div>
    </div>
  );
};

export default EmployeeEditPage;