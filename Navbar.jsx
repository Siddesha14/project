// src/components/common/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-red-600">
          BloodBank
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/login" className="text-gray-700 hover:text-red-600">
            Login
          </Link>
          <Link 
            to="/register/donor" 
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;