import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import EmployeeTable from "./EmployeeTable";
import EmployeeSearch from "./EmployeeSearch";
import EmployeeAdd from "./EmployeeAdd";
import EmployeeEdit from "./EmployeeEdit";
import EmployeeFilter from "./EmployeeFilter";
import { GET_EMPLOYEES } from "../mutations/employeeQueries";

const EmployeeDirectory = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [filteredEmployeeList, setFilteredEmployeeList] = useState([]);
  const [editEmployee, setEditEmployee] = useState(null);
  const [filters, setFilters] = useState({
    age: "",
    department: "",
    title: "",
    employeeType: "",
    currentStatus: "",
  });

  const { loading, error, data } = useQuery(GET_EMPLOYEES);

  useEffect(() => {
    if (data && data.employees) {
      setEmployeeList(data.employees);
      setFilteredEmployeeList(data.employees);
    }
  }, [data]);

  useEffect(() => {
    applyFilters();
  }, [filters, employeeList]);

  const applyFilters = () => {
    let filteredEmployees = [...employeeList];

    if (filters.age !== "") {
      if (filters.age === "ascending") {
        filteredEmployees = filteredEmployees.sort((a, b) => a.age - b.age);
      } else if (filters.age === "descending") {
        filteredEmployees = filteredEmployees.sort((a, b) => b.age - a.age);
      }
    }

    if (filters.department !== "") {
      filteredEmployees = filteredEmployees.filter(
        (employee) =>
          employee.department.toLowerCase() === filters.department.toLowerCase()
      );
    }

    if (filters.title !== "") {
      filteredEmployees = filteredEmployees.filter(
        (employee) =>
          employee.title.toLowerCase() === filters.title.toLowerCase()
      );
    }

    if (filters.employeeType !== "") {
      filteredEmployees = filteredEmployees.filter(
        (employee) =>
          employee.employeeType.toLowerCase() ===
          filters.employeeType.toLowerCase()
      );
    }

    if (filters.currentStatus !== "") {
      filteredEmployees = filteredEmployees.filter(
        (employee) =>
          employee.currentStatus === (filters.currentStatus === "true")
      );
    }
    if (filters.dateOfJoining !== "") {
      if (filters.dateOfJoining === "ascending") {
        filteredEmployees = filteredEmployees.sort(
          (a, b) => new Date(a.dateOfJoining) - new Date(b.dateOfJoining)
        );
      } else if (filters.dateOfJoining === "descending") {
        filteredEmployees = filteredEmployees.sort(
          (a, b) => new Date(b.dateOfJoining) - new Date(a.dateOfJoining)
        );
      }
    }

    setFilteredEmployeeList(filteredEmployees);
  };

  const handleSearch = (text) => {
    const filteredEmployeeList = employeeList.filter(
      (employee) =>
        employee.firstName.toLowerCase().includes(text.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredEmployeeList(filteredEmployeeList);
  };

  const handleFilterChange = (name, value) => {
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const clearFilters = () => {
    setFilters({
      age: "",
      department: "",
      title: "",
      employeeType: "",
      currentStatus: "",
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return (
    <div >
      <div >
        <div className="searchrow">
          <div className="employeesearch">
            <EmployeeSearch handleSearch={handleSearch} />
          </div>
        </div>
        <div className="filterrow">
          <div className="employeefilter">
            <EmployeeFilter
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>
        <div className="clearrow">
          <div className="employeeclear">
            <button className="btnclearfilter" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        </div>
        <div className="tablecontainer">
          <div className="employeetable">
            <EmployeeTable
              employeeList={filteredEmployeeList}
              setEditEmployee={setEditEmployee}
              setEmployeeList={setEmployeeList}
            />
          </div>
        </div>
        

        <div className="editcontainer">
          <div className="employeeedit">
            {editEmployee !== null && (
              <EmployeeEdit
                editEmployee={editEmployee}
                setEmployeeList={setEmployeeList}
                setEditEmployee={setEditEmployee}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDirectory;
