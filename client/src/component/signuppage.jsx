import React, { useState, useContext } from 'react';
import { Mycontext } from '../context/context';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: ''
  });

  const { user, updateUser } = useContext(Mycontext); // Corrected function name

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
    console.log('User Data:', formData);

    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' }
      });

      const findedone = await response.json();

      updateUser(findedone);
      console.log('Updated User:', findedone);

      setSubmittedData(formData);
      setFormData({ name: '', phone: '', password: '' });
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
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
          Sign Up
        </button>

        {submittedData && (
          <div className="mt-4 text-sm text-gray-700">
            <p><strong>Name:</strong> {submittedData.name}</p>
            <p><strong>Phone:</strong> {submittedData.phone}</p>
            <p><strong>Password:</strong> {submittedData.password}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default SignupForm;