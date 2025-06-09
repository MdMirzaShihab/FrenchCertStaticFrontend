import React from 'react';
import { FaAward, FaUsers, FaGlobe, FaHandshake } from 'react-icons/fa';
import { accreditationData } from '../../constants/staticData';
import CompanyImage from "../../assets/CompanyImage.jpg";

const About = () => {
  const features = [
    {
      icon: <FaAward className="h-8 w-8 text-red-500" />,
      title: "Certification Excellence",
      description: "We provide internationally recognized certifications that help organizations demonstrate their commitment to quality."
    },
    {
      icon: <FaUsers className="h-8 w-8 text-red-500" />,
      title: "Expert Team",
      description: "Our team consists of experienced professionals with deep industry knowledge and technical expertise."
    },
    {
      icon: <FaGlobe className="h-8 w-8 text-red-500" />,
      title: "Global Reach",
      description: "We serve clients across multiple industries worldwide, helping them achieve international standards."
    },
    {
      icon: <FaHandshake className="h-8 w-8 text-red-500" />,
      title: "Partnership Approach",
      description: "We work collaboratively with our clients to understand their unique needs and provide tailored solutions."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-blue-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            About French Cert UK
          </h1>
          <p className="mt-5 max-w-3xl mx-auto text-xl text-gray-600">
            Empowering organizations through certification, training, and accreditation services.
          </p>
        </div>

        {/* Company Overview */}
        <div className="bg-white p-8 rounded-lg shadow-lg mb-16">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="mb-8 lg:mb-0">
              <h2 className="text-3xl font-bold text-red-500 mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">
                Founded in 2010, French Cert UK has grown to become a trusted name in certification services. 
                We started with a simple mission: to help organizations achieve excellence through internationally 
                recognized standards.
              </p>
              <p className="text-gray-700 mb-4">
                Over the years, we've expanded our services to meet the growing needs of our clients across 
                various industries, from manufacturing to healthcare, IT to food safety.
              </p>
              <p className="text-gray-700">
                Today, we're proud to have certified lots of organizations, helping them improve their 
                processes, gain competitive advantage, and access new markets.
              </p>
            </div>
            <div className="relative h-64 lg:h-auto">
  <img
    src={CompanyImage}
    alt="Company Overview"
    className="w-full h-full object-cover rounded-lg shadow-md"
  />
</div>

          </div>
        </div>

        {/* Key Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-red-500 mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="mx-auto h-12 w-12 mb-4 flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-blue-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Accreditation Section */}
        <div className="bg-blue-900 text-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-red-400 mb-6">Our Accreditations</h2>
          <p className="text-gray-300 mb-6">
            We are proud to be accredited by leading international bodies, ensuring our certifications 
            are recognized and respected worldwide.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {accreditationData.map((accreditation) => (
              <div key={accreditation.accreditationID} className="bg-white bg-opacity-10 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-red-400 mb-3">{accreditation.accreditationName}</h3>
                <p className="text-gray-300">{accreditation.accreditationDescription}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;