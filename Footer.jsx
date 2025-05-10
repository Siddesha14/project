// src/components/common/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold mb-2">BloodBank</h3>
            <p>Saving lives through blood donation</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold mb-2">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/about" className="hover:text-red-400">About</a></li>
                <li><a href="/contact" className="hover:text-red-400">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2">Legal</h4>
              <ul className="space-y-2">
                <li><a href="/privacy" className="hover:text-red-400">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-red-400">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p>© {new Date().getFullYear()} BloodBank. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;