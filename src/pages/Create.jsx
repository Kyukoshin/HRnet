import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/userSlice';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Header from "../components/Header/Header";
import statesData from '../data/states';

const CreateEmployee = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: new Date(),
    startDate: new Date(),
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

  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateChange = (date) => {
    setFormData((prevData) => ({ ...prevData, dateOfBirth: date }));
    setShowCalendar(false);
  };

  const handleInputClick = () => {
    setShowCalendar(true);
  };

  const [showStartDateCalendar, setShowStartDateCalendar] = useState(false);

  const handleStartDateChange = (date) => {
    setFormData((prevData) => ({ ...prevData, startDate: date }));
    setShowStartDateCalendar(false);
  };

  const handleStartDateInputClick = () => {
    setShowStartDateCalendar(true);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };
  
  const saveEmployee = () => {
    // Convert Date objects to date-only string representations before dispatching
    const serializableData = {
      firstName: capitalizeFirstLetter(formData.firstName),
      lastName: capitalizeFirstLetter(formData.lastName),
      dateOfBirth: formData.dateOfBirth.toISOString().split('T')[0],
      startDate: formData.startDate.toISOString().split('T')[0],
      street: formData.street,
      city: capitalizeFirstLetter(formData.city),
      state: formData.state, 
      zipCode: formData.zipCode,
      department: capitalizeFirstLetter(formData.department),
    };
  
    dispatch(addUser(serializableData));
  };
  

  return (

    <div className="container">
      <Header page='create' />
      <h2>Create Employee</h2>
      <form id="create-employee">
        <label htmlFor="firstName">First Name</label>
        <input type="text" id="firstName" onChange={handleInputChange} defaultValue={formData.firstName} />

        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" onChange={handleInputChange} defaultValue={formData.lastName} />

        <label htmlFor="dateOfBirth">Date of Birth</label>
        <input id="dateOfBirth" type="text" value={formData.dateOfBirth.toDateString()} onClick={handleInputClick} readOnly />
        {showCalendar && (<Calendar onChange={handleDateChange} value={formData.dateOfBirth} />)}

        <fieldset className="address">
          <legend>Address</legend>

          <label htmlFor="street">Street</label>
          <input id="street" type="text" onChange={handleInputChange} defaultValue={formData.street} />

          <label htmlFor="city">City</label>
          <input id="city" type="text" onChange={handleInputChange} defaultValue={formData.city} />

          <label htmlFor="state">State</label>
          <select name="state" id="state" onChange={handleInputChange} defaultValue={formData.state}>
            <option value="" disabled>Select a state</option>
            {statesData.map((state) => (
              <option key={state.abbreviation} value={state.abbreviation}>
                {state.name}
              </option>
            ))}
          </select>

          <label htmlFor="zipCode">Zip Code</label>
          <input id="zipCode" type="number" onChange={handleInputChange} value={formData.zipCode} />
        </fieldset>

        <label htmlFor="startDate">Start Date</label>
        <input id="startDate" type="text" value={formData.startDate.toDateString()} onClick={handleStartDateInputClick} readOnly />
        {showStartDateCalendar && (<Calendar onChange={handleStartDateChange} value={formData.startDate} />)}

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
