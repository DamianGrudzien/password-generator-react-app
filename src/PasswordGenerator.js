// src/PasswordGenerator.js

import React, { useState } from 'react';
import axios from 'axios';

import './PasswordGenerator.css';


const PasswordGenerator = () => {
  const [config, setConfig] = useState({
    word_amount: 3,
    char_amount: 2,
    number_amount: 2,
    upper_first: true,
  });

  const [generatedPassword, setGeneratedPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConfig((prevConfig) => ({
      ...prevConfig,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const generatePassword = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        'https://password-example.onrender.com/api/v1/password/',
        {
          data: config,
          headers: {
            'Content-Type': 'application/json',
            'Referrer-Policy': 'no-referrer',
            'Accept': '*/*',
            'Access-Control-Allow-Headers': null,
          },
        }
      );

      setGeneratedPassword(response.data.password);
    } catch (error) {
      console.error('Error generating password:', error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="password-generator-container">
      <h1>Password Generator</h1>
      <div className="input-group">
        <label>
          Word Amount:
          <input
            type="number"
            name="word_amount"
            value={config.word_amount}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="input-group">
        <label>
          Character Amount:
          <input
            type="number"
            name="char_amount"
            value={config.char_amount}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="input-group">
        <label>
          Number Amount:
          <input
            type="number"
            name="number_amount"
            value={config.number_amount}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="input-group">
        <label>
          Uppercase First:
          <input
            type="checkbox"
            name="upper_first"
            checked={config.upper_first}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="button-group">
        <button onClick={generatePassword} disabled={loading}>
          Generate Password
        </button>
      </div>
      {loading && <p>Generating password...</p>}
      {generatedPassword && (
        <div className="result-group">
          <h2>Generated Password:</h2>
          <p>{generatedPassword}</p>
        </div>
      )}
    </div>
  );
};

export default PasswordGenerator;
