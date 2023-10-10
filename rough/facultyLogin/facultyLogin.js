import React, { useState } from 'react';
import axios from 'axios';
import validator from 'validator';
import config from '../../config';
import Cookies from 'js-cookie';

function LoginForm() {
  const [formData, setFormData] = useState({
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
    try {
      // Send registration data to the backend (replace 'your-backend-api-url' with your actual backend API URL)
      const response = await axios.post(backendUrl + 'faculty/login', {
        email: formData.email,
        password: formData.password,
      });

      const jwtToken = response.data.token;

      console.log(jwtToken);

      // Set the JWT token as a cookie
      // document.cookie = `jwt=${jwtToken}; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;

      Cookies.set('jwt', jwtToken, { 
        expires: 1, // Expires in 1 day
        httpOnly: true, // Set as HTTP-only
      });

      setSuccessMessage('Login successful!');
      setErrors({});
    } catch (error) {
      console.error('Login failed:', error);
      setErrors({ registration: 'Login failed. Please try again later.' });
    }
  };

  return (
    <div>
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
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
        {errors.registration && <p className="error">{errors.registration}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
