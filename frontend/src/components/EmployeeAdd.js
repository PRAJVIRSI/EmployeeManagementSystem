import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_EMPLOYEE } from "../mutations/employeeMutation";

const EmployeeAdd = ({}) => {
  const [newEmployeeSet, setNewEmployee] = useState({
    firstName: "",
    lastName: "",
    age: "",
    dateOfJoining: "",
    title: "",
    department: "",
    employeeType: "",
    currentStatus: true,
  });
  const [ageError, setAgeError] = useState("");

  const [addEmployee] = useMutation(ADD_EMPLOYEE, {
    variables: {
      firstName: newEmployeeSet.firstName,
      lastName: newEmployeeSet.lastName,
      age: parseInt(newEmployeeSet.age),
      dateOfJoining: newEmployeeSet.dateOfJoining,
      title: newEmployeeSet.title,
      department: newEmployeeSet.department,
      employeeType: newEmployeeSet.employeeType,
      currentStatus: newEmployeeSet.currentStatus,
    },
    onCompleted: (newValue) => {
      setNewEmployee((currentEmployee) => ({
        ...currentEmployee,
        id: newValue.addEmployee.id,
      }));
    },
  });

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
    if (!validateAge(newEmployeeSet.age)) {
      setAgeError("Age must be between 20 and 70");
      return;
    }
    try {
      const { data } = await addEmployee();
      const newEmployeeData = {
        id: data.addEmployee.id,
        firstName: newEmployeeSet.firstName,
        lastName: newEmployeeSet.lastName,
        age: newEmployeeSet.age,
        dateOfJoining: newEmployeeSet.dateOfJoining,
        title: newEmployeeSet.title,
        department: newEmployeeSet.department,
        employeeType: newEmployeeSet.employeeType,
        currentStatus: newEmployeeSet.currentStatus,
      };
      window.location.reload();
     

      setNewEmployee({
        firstName: "",
        lastName: "",
        age: "",
        dateOfJoining: "",
        title: "",
        department: "",
        employeeType: "",
        currentStatus: true,
      });
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const validateAge = (age) => {
    return age >= 20 && age <= 70;
  };

  return (
    <div >
      <div >
        <div>
          <div >
            <div className="addemployeeheader">
              <h3 className="addemployeetitle">Add Employee</h3>
            </div>
            <div className="addform">
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
                      onChange={(e) => {
                        const age = e.target.value;
                        if (!isNaN(age) && age >= 20 && age <= 70) {
                          setAgeError("");
                        } else {
                          setAgeError("Age must be between 20 and 70");
                        }
                        setNewEmployee((currentEmployee) => ({
                          ...currentEmployee,
                          age: age,
                        }));
                      }}
                    />
                    {ageError && <p className="errormessage">{ageError}</p>}
                  </div>
                  <div className="formcontent">
                    <label>Date of Joining</label>
                    <input
                      type="date"
                      className="forminput"
                      value={newEmployeeSet.dateOfJoining}
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
                <div className="btn-container">
                  <button type="submit" className="btnaddemployee">
                    Add Employee
                  </button>
                </div>
              </form>  
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAdd;
