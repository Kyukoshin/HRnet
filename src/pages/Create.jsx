import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/userSlice';
import { Helmet } from "react-helmet";

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import Header from "../components/Header/Header";
import Modal from '../components/Modal/Modal'

import statesData from '../data/states';
import departments from '../data/department'

const CreateEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRefs = useRef({});


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
    //console.log(formData)
  };

  // Birth date handling
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateChange = (date) => {
    setFormData((prevData) => ({ ...prevData, dateOfBirth: date }));
    setShowCalendar(false);
  };

  const handleInputClick = () => {
    setShowCalendar(true);
  };

  // Start date handling
  const [showStartDateCalendar, setShowStartDateCalendar] = useState(false);

  const handleStartDateChange = (date) => {
    setFormData((prevData) => ({ ...prevData, startDate: date }));
    setShowStartDateCalendar(false);
  };

  const handleStartDateInputClick = () => {
    setShowStartDateCalendar(true);
  };

  //Text formating
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  // Modals handling
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    navigate('/');
  };

  // Empty fields handling
  const [emptyFields, setEmptyFields] = useState([]);

  const highLightEmptyFields = () => {
    const emptyFieldsArray = Object.entries(formData)
      .filter(([key, value]) => !value)
      .map(([key]) => key);

    setEmptyFields(emptyFieldsArray);
    //console.log(emptyFieldsArray)

    // Update styles using refs
    emptyFieldsArray.forEach((field) => {
      if (inputRefs.current[field]) {
        inputRefs.current[field].style.borderColor = 'red';
      }
    });
  }

  // Highlighting empty fields
  useEffect(() => {

    emptyFields.forEach((field) => {
      if (inputRefs.current[field]) {
        inputRefs.current[field].style.borderColor = 'red';
      }
    });
  }, [emptyFields]);

  // Create validation messages for form fields
  const validateField = (field, value) => {
    switch (field) {
      case 'firstName':
      case 'lastName':
      case 'street':
      case 'city':
      case 'state':
      case 'department':
        return !value ? 'This field is required.' : '';

      case 'dateOfBirth':
      case 'startDate':
        return !value || !(value instanceof Date) ? 'Invalid date.' : '';

      case 'zipCode':
        return !value || !/^\d{5}$/.test(value) ? 'Invalid ZIP code (should be 5 digits).' : '';

      default:
        return '';
    }
  };

  // Check if specific field is empty
  const isFieldEmpty = (field) => {
    return emptyFields.includes(field) && !formData[field];
  };

  // Form submit logic
  const saveEmployee = () => {
    // Check if any field is empty
    const isAnyFieldEmpty = Object.values(formData).some(value => !value);

    if (isAnyFieldEmpty) {
      highLightEmptyFields()
      return; // Prevent form submission if any field is empty
    }

    // Convert field formats, and dates to date-only string before saving
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
    openModal()
    dispatch(addUser(serializableData))
  };

  return (
    <div className="container">
      <Helmet>
        <meta name="description" content="Page to create new employees to be added to the employees file" />
      </Helmet>
      <Header page="create" />
      <h1>Create Employee</h1>
      <form id="create-employee">

        <fieldset>
        <legend>Personnal info</legend>

          {/* First Name */}
          <label htmlFor="firstName" >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            onChange={handleInputChange}
            value={formData.firstName}
            style={{ borderColor: isFieldEmpty('firstName') ? 'red' : 'inherit' }}
            ref={(input) => (inputRefs.current['firstName'] = input)}
            required
          />
          {isFieldEmpty('firstName') && (
            <div className="validation-message" style={{ color: 'red' }}>
              {validateField('firstName', formData.firstName)}
            </div>
          )}

          {/* Last Name */}
          <label htmlFor="lastName" >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            onChange={handleInputChange}
            value={formData.lastName}
            style={{ borderColor: isFieldEmpty('lastName') ? 'red' : 'inherit' }}
            ref={(input) => (inputRefs.current['lastName'] = input)}
            required
          />
          {isFieldEmpty('lastName') && (
            <div className="validation-message" style={{ color: 'red' }}>
              {validateField('lastName', formData.lastName)}
            </div>
          )}

          {/* Date of Birth */}
          <label htmlFor="dateOfBirth" >
            Date of Birth
          </label>
          <input
            id="dateOfBirth"
            type="text"
            value={formData.dateOfBirth instanceof Date ? formData.dateOfBirth.toDateString() : ''}
            onClick={handleInputClick}
            style={{ borderColor: isFieldEmpty('dateOfBirth') ? 'red' : 'inherit' }}
            readOnly
            required
          />
          {showCalendar && (<Calendar onChange={handleDateChange} value={formData.dateOfBirth} />)}
          {isFieldEmpty('dateOfBirth') && (
            <div className="validation-message" style={{ color: 'red' }}>
              {validateField('dateOfBirth', formData.dateOfBirth)}
            </div>
          )}

          {/* Street */}
          <label htmlFor="street">
            Street
          </label>
          <input
            id="street"
            type="text"
            onChange={handleInputChange}
            value={formData.street}
            style={{ borderColor: isFieldEmpty('street') ? 'red' : 'inherit' }}
            ref={(input) => (inputRefs.current['street'] = input)}
            required
          />
          {isFieldEmpty('street') && (
            <div className="validation-message" style={{ color: 'red' }}>
              {validateField('street', formData.street)}
            </div>
          )}

          {/* City */}
          <label htmlFor="city" >
            City
          </label>
          <input
            id="city"
            type="text"
            onChange={handleInputChange}
            value={formData.city}
            style={{ borderColor: isFieldEmpty('city') ? 'red' : 'inherit' }}
            ref={(input) => (inputRefs.current['city'] = input)}
            required
          />
          {isFieldEmpty('city') && (
            <div className="validation-message" style={{ color: 'red' }}>
              {validateField('city', formData.city)}
            </div>
          )}

          {/* State */}
          <label htmlFor="state" >
            State
          </label>
          <select
            name="state"
            id="state"
            onChange={handleInputChange}
            value={formData.state}
            style={{ borderColor: isFieldEmpty('state') ? 'red' : 'inherit' }}
            ref={(input) => (inputRefs.current['state'] = input)}
            required
          >
            <option value="" disabled>
              Select a state
            </option>
            {statesData.map((state) => (
              <option key={state.abbreviation} value={state.abbreviation}>
                {state.name}
              </option>
            ))}
          </select>
          {isFieldEmpty('state') && (
            <div className="validation-message" style={{ color: 'red' }}>
              {validateField('state', formData.state)}
            </div>
          )}

          {/* Zip Code */}
          <label htmlFor="zipCode" >
            Zip Code
          </label>
          <input
            id="zipCode"
            type="number"
            pattern="\d{5}"
            onChange={handleInputChange}
            value={formData.zipCode}
            style={{ borderColor: isFieldEmpty('zipCode') ? 'red' : 'inherit' }}
            ref={(input) => (inputRefs.current['zipCode'] = input)}
            required
          />
          {isFieldEmpty('zipCode') && (
            <div className="validation-message" style={{ color: 'red' }}>
              {validateField('zipCode', formData.zipCode)}
            </div>
          )}
        </fieldset><br />

        <fieldset>
        <legend>Job info</legend>


          {/* Start Date */}
          <label htmlFor="startDate" >
            Start Date
          </label>
          <input
            id="startDate"
            type="text"
            value={formData.startDate instanceof Date ? formData.startDate.toDateString() : ''}
            onClick={handleStartDateInputClick}
            
            readOnly
            style={{ borderColor: isFieldEmpty('startDate') ? 'red' : 'inherit' }}
            ref={(input) => (inputRefs.current['startDate'] = input)}
            required
          />
          {showStartDateCalendar && (<Calendar onChange={handleStartDateChange} value={formData.startDate} />)}
          {isFieldEmpty('startDate') && (
            <div className="validation-message" style={{ color: 'red' }}>
              {validateField('startDate', formData.startDate)}
            </div>
          )}

          {/* Department */}
          <label htmlFor="department" >
            Department
          </label>
          <select
            name="department"
            id="department"
            onChange={handleInputChange}
            value={formData.department}
            style={{ borderColor: isFieldEmpty('department') ? 'red' : 'inherit' }}
            ref={(input) => (inputRefs.current['department'] = input)}
            required
          >
            <option value="" disabled>
              Select a department
            </option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Engineering">Engineering</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Legal">Legal</option>
          </select>
          {isFieldEmpty('department') && (
            <div className="validation-message" style={{ color: 'red' }}>
              {validateField('department', formData.department)}
            </div>
          )}
        </fieldset>
        <br />


        <button type="button" onClick={saveEmployee} className="submitButton">
          Create employee
        </button>
      </form>
      <div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h2>Création réussie</h2>
          <p>Les informations soumises sont bien enregistrées</p>
        </Modal>
      </div>
    </div>
  );
};

export default CreateEmployee;
