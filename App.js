import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Layout Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './components/auth/Login';
import NotFound from './components/common/NotFound';

// Registration Components
import RegisterDonor from './components/auth/RegisterDonor';
import RegisterHospital from './components/auth/RegisterHospital';

// Route Protection
import PrivateRoute from './components/common/PrivateRoute';
import AdminRoute from './components/common/AdminRoute';

// Donor Components
import DonorDashboard from './components/donor/Dashboard';
import DonorProfile from './components/donor/Profile';
import DonationHistory from './components/donor/DonationHistory';

// Hospital Components
import HospitalDashboard from './components/hospital/Dashboard';
import BloodRequest from './components/hospital/BloodRequest';
import RequestHistory from './components/hospital/RequestHistory';

// Blood Bank Components
import BloodBankDashboard from './components/bloodBank/Dashboard';
import BloodBankInventory from './components/bloodBank/Inventory';
import BloodBankStatistics from './components/bloodBank/Statistics';
import BloodBankRequests from './components/bloodBank/Requests';

function App() {
  return (
    <AuthProvider>
      <Router> {/* Wrap entire app with Router */}
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Navbar />
          
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />

              {/* Registration Routes */}
              <Route path="/register/donor" element={<RegisterDonor />} />
              <Route path="/register/hospital" element={<RegisterHospital />} />

              {/* Donor Protected Routes */}
              <Route element={<PrivateRoute allowedRoles={['donor']} />}>
                <Route path="/donor/dashboard" element={<DonorDashboard />} />
                <Route path="/donor/profile" element={<DonorProfile />} />
                <Route path="/donor/history" element={<DonationHistory />} />
              </Route>

              {/* Hospital Protected Routes */}
              <Route element={<PrivateRoute allowedRoles={['hospital']} />}>
                <Route path="/hospital/dashboard" element={<HospitalDashboard />} />
                <Route path="/hospital/request-blood" element={<BloodRequest />} />
                <Route path="/hospital/request-history" element={<RequestHistory />} />
              </Route>

              {/* Blood Bank Admin Routes */}
              <Route element={<AdminRoute />}>
                <Route path="/bloodbank/dashboard" element={<BloodBankDashboard />} />
                <Route path="/bloodbank/inventory" element={<BloodBankInventory />} />
                <Route path="/bloodbank/statistics" element={<BloodBankStatistics />} />
                <Route path="/bloodbank/requests" element={<BloodBankRequests />} />
              </Route>

              {/* 404 Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;