import React from 'react';

const EmployeeFilter = ({ filters, onFilterChange }) => {
    const departments = ['IT', 'Marketing', 'HR', 'Engineering'];
    const jobTitles = ['Employee', 'Manager', 'Director', 'VP'];
    const employeeTypes = ['FullTime', 'PartTime', 'Contract', 'Seasonal'];
    const ageOptions = ['Ascending', 'Descending'];
    const dateOfJoiningOptions = ['Ascending', 'Descending'];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        onFilterChange(name, value);
    };

    return (
        <div className='filtercontainer'>
            <h3 className='filterheader'>Filter Options</h3>
            <div className='filters'>
                <div className='filter'>
                    <label htmlFor="age">Age:</label>
                    <select
                        className="form-select"
                        id="age"
                        name="age"
                        value={filters.age || ''}
                        onChange={handleInputChange}
                    >
                        <option value="">Default</option>
                        {ageOptions.map((option) => (
                            <option key={option} value={option.toLowerCase()}>{option}</option>
                        ))}
                    </select>
                </div>
                <div className="filter">
                    <label htmlFor="department">Department:</label>
                    <select
                        className="form-select"
                        id="department"
                        name="department"
                        value={filters.department || ''}
                        onChange={handleInputChange}
                    >
                        <option value="">All Departments</option>
                        {departments.map((department) => (
                            <option key={department} value={department}>{department}</option>
                        ))}
                    </select>
                </div>
                <div className="filter">
                    <label htmlFor="title">Job Title:</label>
                    <select
                        className="form-select"
                        id="title"
                        name="title"
                        value={filters.title || ''}
                        onChange={handleInputChange}
                    >
                        <option value="">All Job Titles</option>
                        {jobTitles.map((title) => (
                            <option key={title} value={title}>{title}</option>
                        ))}
                    </select>
                </div>
                <div className="filter">
                    <label htmlFor="employeeType">Employee Type:</label>
                    <select
                        className="form-select"
                        id="employeeType"
                        name="employeeType"
                        value={filters.employeeType || ''}
                        onChange={handleInputChange}
                    >
                        <option value="">All Types</option>
                        {employeeTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="filters">
                <div className="filter">
                    <label htmlFor="currentStatus">Status:</label>
                    <select
                        className="form-select"
                        id="currentStatus"
                        name="currentStatus"
                        value={filters.currentStatus || ''}
                        onChange={handleInputChange}
                    >
                        <option value="">All Statuses</option>
                        <option value="true">Working</option>
                        <option value="false">Not Working</option>
                    </select>
                </div>
                <div className="filter">
                    <label htmlFor="dateOfJoining">Date of Joining:</label>
                    <select
                        className="form-select"
                        id="dateOfJoining"
                        name="dateOfJoining"
                        value={filters.dateOfJoining || ''}
                        onChange={handleInputChange}
                    >
                        <option value="">Default</option>
                        {dateOfJoiningOptions.map((option) => (
                            <option key={option} value={option.toLowerCase()}>{option}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default EmployeeFilter;
