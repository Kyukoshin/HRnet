import React, { useState } from 'react';

import Header from "../components/Header/Header";
import statesData from '../data/states';

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
    department: '',
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const saveEmployee = () => {
    console.log('Employee data:', formData);
    console.log('Employee Created!');
  };

  return (

    <div className="container">
      <Header page='create' />
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
            <option value="" disabled>Select a state</option>
            {statesData.map((state) => (
              <option key={state.abbreviation} value={state.abbreviation}>
                {state.name}
              </option>
            ))}
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
