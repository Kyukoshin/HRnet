import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/userSlice';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Header from "../components/Header/Header";
import statesData from '../data/states';
import Modal from '../components/Modal/Modal'

const CreateEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  //Birth date handling
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateChange = (date) => {
    setFormData((prevData) => ({ ...prevData, dateOfBirth: date }));
    setShowCalendar(false);
  };

  const handleInputClick = () => {
    setShowCalendar(true);
  };

  //Start date handling
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

  //Modals handling
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalValidOpen, setModalValidOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    navigate('/');
  };

  const openModalValid = () => {
    setModalValidOpen(true);
  };

  const closeModalValid = () => {
    setModalValidOpen(false);
  };

  const saveEmployee = () => {
    // Check if any field is empty
    const isAnyFieldEmpty = Object.values(formData).some(value => !value);
  
    if (isAnyFieldEmpty) {
      openModalValid()
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
      <Header page='create' />
      <h2>Create Employee</h2>
      <form id="create-employee">
        <label htmlFor="firstName">First Name</label>
        <input type="text" id="firstName" onChange={handleInputChange} value={formData.firstName} required />

        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" onChange={handleInputChange} value={formData.lastName} required />

        <label htmlFor="dateOfBirth">Date of Birth</label>
        <input id="dateOfBirth" type="text" value={formData.dateOfBirth.toDateString()} onClick={handleInputClick} readOnly required />
        {showCalendar && (<Calendar onChange={handleDateChange} value={formData.dateOfBirth} />)}

        <fieldset className="address">
          <legend>Address</legend>

          <label htmlFor="street">Street</label>
          <input id="street" type="text" onChange={handleInputChange} value={formData.street} required />

          <label htmlFor="city">City</label>
          <input id="city" type="text" onChange={handleInputChange} value={formData.city} required />

          <label htmlFor="state">State</label>
          <select name="state" id="state" onChange={handleInputChange} value={formData.state} required>
            <option value="" disabled>Select a state</option>
            {statesData.map((state) => (
              <option key={state.abbreviation} value={state.abbreviation}>
                {state.name}
              </option>
            ))}
          </select>

          <label htmlFor="zipCode">Zip Code</label>
          <input id="zipCode" type="number" pattern="\d{5}" onChange={handleInputChange} value={formData.zipCode} required />
        </fieldset>

        <label htmlFor="startDate">Start Date</label>
        <input id="startDate" type="text" value={formData.startDate.toDateString()} onClick={handleStartDateInputClick} readOnly required />
        {showStartDateCalendar && (<Calendar onChange={handleStartDateChange} value={formData.startDate} />)}

        <label htmlFor="department">Department</label>
        <select name="department" id="department" onChange={handleInputChange} value={formData.department} required>
          <option value="" disabled>Select a department</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
          <option value="Engineering">Engineering</option>
          <option value="Human Resources">Human Resources</option>
          <option value="Legal">Legal</option>
        </select>

        <button type="button" onClick={saveEmployee}>
          Save
        </button>
      </form>
      <div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>Création réussie</h2>
        <p>Les informations soumises sont bien enregistrées</p>
      </Modal>
      <Modal isOpen={isModalValidOpen} onClose={closeModalValid}>
        <h2>Erreur</h2>
        <p>Veuillez renseigner tous les champs</p>
      </Modal>
      </div>
    </div>
  );
};

export default CreateEmployee;
