import React, { useState, useContext } from 'react';
import { Mycontext } from '../context/context';
import { useNavigate } from 'react-router-dom';

// Inside your component

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { updateUser } = useContext(Mycontext);
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login Data:', formData);
  
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' }
      });
  
      const user = await response.json();
  
      if (!response.ok || !user || !user.name) {
        console.error('Login failed:', user);
        alert("Invalid email or password!");
        return;
      }
  
      updateUser(user);
      setSubmittedData(formData);
      setFormData({ email: '', password: '' });
  
      console.log('Logged in User:', user);
  
      navigate('/');
    } catch (error) {
      console.error('Error during login:', error);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
        >
          Login
        </button>

        {submittedData && (
          <div className="mt-4 text-sm text-gray-700">
            <p><strong>Email:</strong> {submittedData.email}</p>
            <p><strong>Password:</strong> {submittedData.password}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
