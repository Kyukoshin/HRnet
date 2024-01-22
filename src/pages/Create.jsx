import React, { useState } from 'react';

const CreateEmployee = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    startDate: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    department: 'Sales', // Default department
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const saveEmployee = () => {
    // Implement your saveEmployee logic here
    // You can access form data using formData state
    console.log('Employee data:', formData);

    // Display a confirmation modal or perform other actions as needed
    // For simplicity, let's just log a confirmation message for now
    console.log('Employee Created!');
  };

  return (
    <div className="container">
      <h2>Create Employee</h2>
      <form id="create-employee">
        <label htmlFor="first-name">First Name</label>
        <input type="text" id="first-name" onChange={handleInputChange} value={formData.firstName} />

        <label htmlFor="last-name">Last Name</label>
        <input type="text" id="last-name" onChange={handleInputChange} value={formData.lastName} />

        <label htmlFor="date-of-birth">Date of Birth</label>
        <input id="date-of-birth" type="text" onChange={handleInputChange} value={formData.dateOfBirth} />

        <label htmlFor="start-date">Start Date</label>
        <input id="start-date" type="text" onChange={handleInputChange} value={formData.startDate} />

        <fieldset className="address">
          <legend>Address</legend>

          <label htmlFor="street">Street</label>
          <input id="street" type="text" onChange={handleInputChange} value={formData.street} />

          <label htmlFor="city">City</label>
          <input id="city" type="text" onChange={handleInputChange} value={formData.city} />

          <label htmlFor="state">State</label>
          <select name="state" id="state" onChange={handleInputChange} value={formData.state}>
            {/* Options for states */}
          </select>

          <label htmlFor="zip-code">Zip Code</label>
          <input id="zip-code" type="number" onChange={handleInputChange} value={formData.zipCode} />
        </fieldset>

        <label htmlFor="department">Department</label>
        <select name="department" id="department" onChange={handleInputChange} value={formData.department}>
          <option>Sales</option>
          <option>Marketing</option>
          <option>Engineering</option>
          <option>Human Resources</option>
          <option>Legal</option>
        </select>

        <button type="button" onClick={saveEmployee}>
          Save
        </button>
      </form>
      {/* Confirmation modal */}
      <div id="confirmation" className="modal">
        Employee Created!
      </div>
    </div>
  );
};

export default CreateEmployee;
