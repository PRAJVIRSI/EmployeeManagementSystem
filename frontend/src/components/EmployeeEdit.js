import React, { useState,useEffect } from "react";
import { useMutation,useQuery } from "@apollo/client";
import { UPDATE_EMPLOYEE } from "../mutations/employeeMutation";
import { GET_EMPLOYEE_BY_ID } from "../mutations/employeeQueries";

const EmployeeEdit = ({ employeeId }) => {
    const [newEmployeeSet, setNewEmployee] = useState(null);
    const [updateEmployee] = useMutation(UPDATE_EMPLOYEE);
    const [successMessage, setSuccessMessage] = useState(null);

    // Fetch employee data by ID
    const { loading, error, data } = useQuery(GET_EMPLOYEE_BY_ID, {
      variables: { id: employeeId },
    });
  
    useEffect(() => {
      if (data && data.employee) {
        setNewEmployee(data.employee);
      }
    }, [data]);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error...</p>;
    // Ensure newEmployeeSet is loaded before rendering
    if (!newEmployeeSet) return null;
  
    const handleOnSubmit = async (evt) => {
      evt.preventDefault();
      try {
        const parsedAge = parseInt(newEmployeeSet.age); // Parse age as an integer
      if (isNaN(parsedAge)) {
        throw new Error("Age must be a valid number.");
      }
      

        await updateEmployee({
          variables: {
            id: newEmployeeSet.id,
            firstName: newEmployeeSet.firstName,
            lastName: newEmployeeSet.lastName,
            age: parsedAge,
            dateOfJoining: newEmployeeSet.dateOfJoining,
            title: newEmployeeSet.title,
            department: newEmployeeSet.department,
            employeeType: newEmployeeSet.employeeType,
            currentStatus: newEmployeeSet.currentStatus,
          },
        });
        setSuccessMessage("Employee updated successfully!");
        window.location.reload();
        
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      } catch (error) {
        console.error("Error updating employee:", error);
      }
    };

   
  const dateOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "UTC", 
};

  const formattedDateOfJoining = new Date(newEmployeeSet.dateOfJoining).toLocaleDateString("en-GB", dateOptions);


    const formattedDateToInputValue = (formattedDate) => {
        const [day, month, year] = formattedDate.split('/');
        return `${year}-${month}-${day}`;
    };
    
  
 
    return (
        <div >
            <div className="editemployeeheader">
                <h3 className="editemployeetitle">Edit Employee</h3>
            </div>
            <div className="addform">
            {successMessage && (
            <div className="alert alert-success" role="alert">
                {successMessage}
            </div>
            )}
            <form onSubmit={(e) => handleOnSubmit(e)}>
                <div className="formdiv">
                    <div className="formcontent">
                        <label>First Name</label>
                        <input
                            type="text"
                            className="forminput"
                            value={newEmployeeSet.firstName}
                            onChange={(e) =>
                                setNewEmployee((currentEmployee) => ({
                                    ...currentEmployee,
                                    firstName: e.target.value,
                                }))
                            }
                        />
                    </div>
                    <div className="formcontent">
                        <label>Last Name</label>
                        <input
                            type="text"
                            className="forminput"
                            value={newEmployeeSet.lastName}
                            onChange={(e) =>
                                setNewEmployee((currentEmployee) => ({
                                    ...currentEmployee,
                                    lastName: e.target.value,
                                }))
                            }
                        />
                    </div>
                    <div className="formcontent">
                        <label>Age</label>
                        <input
                            type="number"
                            className="forminput"
                            value={newEmployeeSet.age}
                            onChange={(e) =>
                                setNewEmployee((currentEmployee) => ({
                                    ...currentEmployee,
                                    age: e.target.value,
                                }))
                            }
                        />
                    </div>
                    <div className="formcontent">
                        <label>Date of Joining</label>
                        <input
                            type="date"
                            className="forminput"
                            value= {formattedDateToInputValue(formattedDateOfJoining)}
                            onChange={(e) =>
                                setNewEmployee((currentEmployee) => ({
                                    ...currentEmployee,
                                    dateOfJoining: e.target.value,
                                }))
                            }
                        />
                    </div>
                    <div className="formcontent">
                        <label>Title</label>
                        <select
                            className="forminput"
                            value={newEmployeeSet.title}
                            onChange={(e) =>
                                setNewEmployee((currentEmployee) => ({
                                    ...currentEmployee,
                                    title: e.target.value,
                                }))
                            }
                        >
                            <option value="">Select Title</option>
                            <option value="Employee">Employee</option>
                            <option value="Manager">Manager</option>
                            <option value="Director">Director</option>
                            <option value="VP">VP</option>
                        </select>
                    </div>
                    <div className="formcontent">
                        <label>Department</label>
                        <select
                            className="forminput"
                            value={newEmployeeSet.department}
                            onChange={(e) =>
                                setNewEmployee((currentEmployee) => ({
                                    ...currentEmployee,
                                    department: e.target.value,
                                }))
                            }
                        >
                            <option value="">Select Department</option>
                            <option value="IT">IT</option>
                            <option value="Marketing">Marketing</option>
                            <option value="HR">HR</option>
                            <option value="Engineering">Engineering</option>
                        </select>
                    </div>
                    <div className="formcontent">
                        <label>Employee Type</label>
                        <select
                            className="forminput"
                            value={newEmployeeSet.employeeType}
                            onChange={(e) =>
                                setNewEmployee((currentEmployee) => ({
                                    ...currentEmployee,
                                    employeeType: e.target.value,
                                }))
                            }
                        >
                            <option value="">Select Employee Type</option>
                            <option value="FullTime">FullTime</option>
                            <option value="PartTime">PartTime</option>
                            <option value="Contract">Contract</option>
                            <option value="Seasonal">Seasonal</option>
                        </select>
                    </div>
                </div>
                <div className="formcontent">
                    <label>Current Status</label>
                    <input
                        type="checkbox"
                        className="checkbox"
                        checked={newEmployeeSet.currentStatus}
                        onChange={(e) =>
                            setNewEmployee((currentEmployee) => ({
                                ...currentEmployee,
                                currentStatus: e.target.checked,
                            }))
                        }
                    />
                </div>
                <div className="btn-container">
                    <button className="btneditemployee" type="submit">Save</button>
                </div>
            </form>
        </div>
    </div>
    );
};

export default EmployeeEdit;