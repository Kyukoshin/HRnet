import React, { useState } from 'react';

const DropdownSelector = ({ options }) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleSelectChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
  };

  return (
    <div>
      <select id="dropdown" onChange={handleInputChange} value={formData.department}>
        <option value="">Choisir</option>
        {options.map((option) => (
          <option key={option.name} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownSelector;

