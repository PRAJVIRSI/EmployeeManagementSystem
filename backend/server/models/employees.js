const mongoose = require('mongoose');

// Define the allowed values for title, department, and employeeType
const allowedTitles = ['Employee', 'Manager', 'Director', 'VP'];
const allowedDepartments = ['IT', 'Marketing', 'HR', 'Engineering'];
const allowedEmployeeTypes = ['FullTime', 'PartTime', 'Contract', 'Seasonal'];

// Define the schema for the Employee model
const employeeSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    dateOfJoining: { type: Date, required: true },
    title: { type: String, enum: allowedTitles, required: true },
    department: { type: String, enum: allowedDepartments, required: true },
    employeeType: { type: String, enum: allowedEmployeeTypes, required: true },
    currentStatus: { type: Boolean, default: true },
});

// Define and export the Employee model
module.exports = mongoose.model('Employee', employeeSchema);
