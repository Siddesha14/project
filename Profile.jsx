import React from 'react';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import BloodTypeSelector from '../common/BloodTypeSelector';

const DonorProfile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    age: '',
    sex: 'M',
    address: '',
    bloodType: ''
  });
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/api/donor/profile');
        setFormData({
          age: res.data.age,
          sex: res.data.sex,
          address: res.data.address,
          bloodType: res.data.bloodType
        });
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/donor/profile', formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to update profile:', err);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading profile...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Update Your Profile</h1>
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Profile updated successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Age
            </label>
            <input
              type="number"
              name="age"
              min="18"
              max="65"
              value={formData.age}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Gender
            </label>
            <div className="mt-2 space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="sex"
                  value="M"
                  checked={formData.sex === 'M'}
                  onChange={handleChange}
                  className="text-red-600 focus:ring-red-500"
                />
                <span className="ml-2">Male</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="sex"
                  value="Other"
                  checked={formData.sex === 'Other'}
                  onChange={handleChange}
                  className="text-red-600 focus:ring-red-500"
                  />
                  <span className="ml-2">Other</span>
                  </label>
                  </div>
                  </div>
                  
                        <div className="md:col-span-2">
                          <BloodTypeSelector
                            value={formData.bloodType}
                            onChange={(e) => setFormData({...formData, bloodType: e.target.value})}
                            required
                          />
                        </div>
                  
                        <div className="md:col-span-2">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Address
                          </label>
                          <textarea
                            name="address"
                            rows="3"
                            value={formData.address}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                          />
                        </div>
                      </div>
                  
                      <div className="mt-6">
                        <button
                          type="submit"
                          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                          Update Profile
                        </button>
                      </div>
                    </form>
                  </div>
                  );
                  };
                  
                  export default DonorProfile;