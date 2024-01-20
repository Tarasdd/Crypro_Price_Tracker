import React, { useState } from "react";
import "../Input/Input.css"

const Input = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="input-container">
      <input 
        className="input-field"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search Crypto..."
      />
    </div>
  )
};

export default Input;