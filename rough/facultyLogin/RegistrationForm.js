import React, { useState } from 'react';
import axios from 'axios';
import validator from 'validator';
import config from '../../config';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const backendUrl = config.backendUrl; 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email
    if (!validator.isEmail(formData.email)) {
      setErrors({ email: 'Invalid email address' });
      return;
    }

    // Validate password (at least 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character)
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setErrors({
        password: 'Password must be at least 8 characters and contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character',
      });
      return;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      return;
    }

    try {
      // Send registration data to the backend (replace 'your-backend-api-url' with your actual backend API URL)
      await axios.post(backendUrl+'faculty/addNewFaculty', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      setSuccessMessage('Registration successful!');
      setErrors({});
    } catch (error) {
      console.error('Registration failed:', error);
      setErrors({ registration: 'Registration failed. Please try again later.' });
    }
  };

  return (
    <div>
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </div>
        {errors.registration && <p className="error">{errors.registration}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegistrationForm;
