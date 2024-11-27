// InputField.js
import React from 'react';

const InputField = ({ label, type, name, value, onChange, required }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-lg font-medium text-black">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
};

export default InputField;
