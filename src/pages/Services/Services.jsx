import React from 'react';
import { servicesData } from '../../constants/staticData';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const navigate = useNavigate();

  const handleServiceClick = (serviceName) => {
    const routePath = serviceName.toLowerCase()
      .replace(/\s+/g, '')
      .replace(/\//g, '-')
      .replace(/\./g, '')
      .replace(/\s*\/\s*/g, '-');
    navigate(`/${routePath}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Our Certification Services
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Internationally recognized standards to help your organization excel
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((service) => (
            <div 
              key={service.serviceID}
              onClick={() => handleServiceClick(service.serviceName)}
              className="group relative bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer border-2 border-dashed border-gray-300 hover:border-solid hover:border-blue-500 overflow-hidden"
            >
              {/* Service Icon Placeholder - You can replace with actual icons */}
              <div className="absolute -right-6 -top-6 text-blue-100 group-hover:text-blue-200 transition-colors duration-300">
                <svg className="h-24 w-24" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                </svg>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {service.serviceName}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {service.serviceDescription}
                </p>
                <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-800 transition-colors duration-300">
                  Learn more
                  <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Need help choosing the right certification?
          </h2>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300">
            Contact Our Experts
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;