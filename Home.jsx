// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/common/Layout';

const Home = () => {
  return (
    <Layout>
      <div className="hero-section bg-red-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">BloodBank Management System</h1>
          <p className="text-xl mb-8">Saving lives through blood donation</p>
          <div className="flex justify-center gap-4">
            <Link 
              to="/register/donor" 
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              Register as Donor
            </Link>
            <Link 
              to="/register/hospital" 
              className="bg-white text-red-600 border border-red-600 px-6 py-3 rounded-lg hover:bg-red-50 transition-colors"
            >
              Register as Hospital
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;