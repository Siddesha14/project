const About = () => {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">About BloodBank</h1>
          
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              At BloodBank, our mission is to bridge the gap between blood donors and those in need. 
              We strive to create a reliable and efficient system that ensures hospitals always have 
              access to the blood types they require for life-saving procedures.
            </p>
            <p className="text-gray-600">
              Through our platform, we connect donors, hospitals, and blood banks to streamline the 
              donation process and make blood available when and where it's needed most.
            </p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">How It Works</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-red-100 p-2 rounded-full mr-4">
                    <span className="text-red-600 font-bold">1</span>
                  </div>
                  <p className="text-gray-600">Donors register and provide their blood type information</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-red-100 p-2 rounded-full mr-4">
                    <span className="text-red-600 font-bold">2</span>
                  </div>
                  <p className="text-gray-600">Hospitals request specific blood types when needed</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-red-100 p-2 rounded-full mr-4">
                    <span className="text-red-600 font-bold">3</span>
                  </div>
                  <p className="text-gray-600">Blood banks manage inventory and coordinate distribution</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-red-100 p-2 rounded-full mr-4">
                    <span className="text-red-600 font-bold">4</span>
                  </div>
                  <p className="text-gray-600">Lives are saved through this collaborative effort</p>
                </li>
              </ul>
            </div>
  
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Blood Donation Facts</h2>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 rounded-lg">
                  <p className="font-medium text-gray-800">One donation can save up to three lives</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <p className="font-medium text-gray-800">Blood is needed every 2 seconds</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <p className="font-medium text-gray-800">Only 37% of the population is eligible to donate</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <p className="font-medium text-gray-800">Blood cannot be manufactured - it only comes from donors</p>
                </div>
              </div>
            </div>
          </div>
  
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Team</h2>
            <p className="text-gray-600 mb-6">
              BloodBank was founded by a team of healthcare professionals and technology experts who 
              recognized the need for a more efficient blood management system. Our diverse team brings 
              together decades of experience in medicine, software development, and logistics.
            </p>
            <p className="text-gray-600">
              We're committed to continuous improvement of our platform to better serve donors, hospitals, 
              and most importantly, the patients who depend on timely access to blood products.
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default About;