import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminStatistics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('/api/stats');
        setStats(res.data);
      } catch (err) {
        console.error('Failed to fetch statistics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading statistics...</div>;
  }

  // Prepare data for charts
  const bloodTypeData = {
    labels: stats.bloodTypeStats.map(item => item._id),
    datasets: [
      {
        label: 'Blood Units',
        data: stats.bloodTypeStats.map(item => item.total),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(199, 199, 199, 0.6)',
          'rgba(83, 102, 255, 0.6)'
        ],
        borderWidth: 1
      }
    ]
  };

  const inventoryData = {
    labels: stats.inventoryStatus.map(item => item.bloodType),
    datasets: [
      {
        label: 'Current Inventory',
        data: stats.inventoryStatus.map(item => item.quantity),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Blood Bank Statistics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Total Donations: {stats.totalDonations}</h2>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Total Distributions: {stats.totalDistributions}</h2>
          <h2 className="text-xl font-semibold text-gray-700">Active Donors: {stats.totalDonors}</h2>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Registered Hospitals: {stats.totalHospitals}</h2>
          <div className="h-64">
            <Pie 
              data={bloodTypeData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  title: {
                    display: true,
                    text: 'Blood Type Distribution'
                  }
                }
              }} 
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Current Inventory Levels</h2>
        <div className="h-96">
          <Bar 
            data={inventoryData} 
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                title: {
                  display: true,
                  text: 'Blood Units by Type'
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Units'
                  }
                }
              }
            }} 
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Requests</h2>
        <div className="space-y-4">
          {stats.recentRequests.map(request => (
            <div key={request._id} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{request.hospital.name}</p>
                  <p className="text-gray-600">{request.bloodType} - {request.quantity} units</p>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  request.status === 'approved' ? 'bg-green-100 text-green-800' :
                  request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  request.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(request.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminStatistics;