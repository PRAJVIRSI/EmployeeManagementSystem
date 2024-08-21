import React from 'react';
import { useMutation } from "@apollo/client";
import { DELETE_EMPLOYEE } from "../mutations/employeeMutation";
import { useNavigate } from "react-router-dom";

const EmployeeRow = (props) => {
    const navigate = useNavigate();
    const rowStyle = props.rowStyle;
    const employee = props.employee;
    const index = props.index; 
    const setEditEmployee = props.setEditEmployee;
    const setEmployeeList = props.setEmployeeList;

    const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
        variables: { id: employee.id },
    });

    const handleOnEdit = () => {
        setEditEmployee(employee);
    };

    const handleOnDelete = () => {
        deleteEmployee();
        setEmployeeList((currEmployeeList) => {
            return currEmployeeList.filter(
                (currentEmployee) => currentEmployee.id !== employee.id
            );
        });
    };
    const handleEditEmployee = (employeeId) => {
        navigate(`/edit-employee/${employee.id}`);
        
      };

    if (!employee) return <h3>EmployeeRow</h3>;

    const dateOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        timeZone: "UTC", 
    };
    
    const handleViewDetails = () => {
        navigate(`/employee-details/${employee.id}`); // Navigate to the employee details page with the employee ID
    };


    const formattedDateOfJoining = new Date(employee.dateOfJoining).toLocaleDateString("en-GB", dateOptions);
    // Get the status text based on the currentStatus value
    const statusText = employee.currentStatus ? "Working" : "Not Working";
    return (
        <tr>
            <td style={rowStyle}>{index}</td>
            {Object.entries(employee).map(([key, value], i) => {
                // Skip __typename and id fields
                if (key !== "__typename" && key !== "id") {
                    return (
                        <td key={i} style={rowStyle}>
                            {key === "dateOfJoining" ? formattedDateOfJoining : key === "currentStatus" ? statusText : value}
                        </td>
                    );
                }
                return null;
            })}
            <td style={rowStyle}>
                <button className="btn btn-primary mr-2" onClick={handleEditEmployee}>Edit</button> {/* Added Bootstrap classes */}
                <button className="btn btn-danger mr-2" onClick={handleOnDelete}>Delete</button> {/* Added Bootstrap classes */}
                <button className="btn btn-info" onClick={handleViewDetails}>Details</button> {/* Details button */}
            </td>
        </tr>
    );
};

export default EmployeeRow;
