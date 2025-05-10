import React from 'react';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const HospitalDashboard = () => {
  const { user } = useAuth();
  const [hospitalData, setHospitalData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHospitalData = async () => {
      try {
        const res = await axios.get('/api/hospital/profile');
        setHospitalData(res.data);
      } catch (err) {
        console.error('Failed to fetch hospital data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitalData();
  }, [user]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Hospital Dashboard</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Hospital Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600"><span className="font-medium">Name:</span> {user?.name}</p>
            <p className="text-gray-600"><span className="font-medium">Hospital ID:</span> {hospitalData?.hospitalId}</p>
            <p className="text-gray-600"><span className="font-medium">Location:</span> {hospitalData?.location}</p>
          </div>
          <div>
            <p className="text-gray-600"><span className="font-medium">Address:</span> {hospitalData?.address}</p>
            <p className="text-gray-600"><span className="font-medium">Contact:</span> {hospitalData?.contact}</p>
            <p className="text-gray-600"><span className="font-medium">Email:</span> {user?.email}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg shadow">
            Request Blood
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg shadow">
            View Request History
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg shadow">
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;