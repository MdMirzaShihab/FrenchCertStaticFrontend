import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaFilter, FaTimes, FaCertificate } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { BASE_URL } from "../secrets";
import CompanyImage1 from "../assets/CompanyImage1.webp";
import { FaArrowRight } from "react-icons/fa6";

const HomeServices = () => {
  const [state, setState] = useState({
    certifications: [],
    loading: true,
    searchQuery: '',
    currentPage: 1,
    totalPages: 1,
    certificationTypes: [],
    selectedType: '',
    error: null,
    showFilters: false
  });

  const { 
    certifications, 
    loading, 
    searchQuery, 
    currentPage, 
    totalPages, 
    certificationTypes, 
    selectedType,
    error,
    showFilters
  } = state;

  const navigate = useNavigate();

  // Fetch certifications using the public endpoint
  const fetchCertifications = useCallback(async (page = 1) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const params = {
        page,
        limit: 8,
        ...(searchQuery && { search: searchQuery }),
        ...(selectedType && { type: selectedType })
      };

      const response = await axios.get(`${BASE_URL}/api/certifications/public/list`, { params });
      
      setState(prev => ({
        ...prev,
        certifications: response.data.data.certifications,
        totalPages: response.data.data.pages,
        currentPage: page,
        loading: false
      }));
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to fetch certifications';
      setState(prev => ({ ...prev, loading: false, error: errorMsg }));
    }
  }, [searchQuery, selectedType]);

  // Fetch certification types
  const fetchCertificationTypes = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/certifications/types/list`);
      setState(prev => ({
        ...prev,
        certificationTypes: response.data.data
      }));
    } catch (err) {
      console.error('Failed to fetch certification types:', err);
    }
  }, []);

  useEffect(() => {
    fetchCertificationTypes();
  }, [fetchCertificationTypes]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCertifications(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [fetchCertifications]);

  const handleResetFilters = () => {
    setState(prev => ({
      ...prev,
      searchQuery: '',
      selectedType: '',
      currentPage: 1,
      showFilters: false
    }));
  };

  const toggleFilters = () => {
    setState(prev => ({ ...prev, showFilters: !prev.showFilters }));
  };

  const handleServiceClick = (certificationId) => {
    navigate(`/service-detail/${certificationId}`);
  };

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="h-96 bg-gray-200 rounded-2xl animate-pulse"></div>
      ))}
    </div>
  );

  const ErrorMessage = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg max-w-2xl mx-auto"
    >
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      </div>
    </motion.div>
  );

  const EmptyState = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-md mx-auto"
    >
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 mb-4">
        <FaCertificate className="w-10 h-10 text-blue-500" />
      </div>
      <h3 className="mt-2 text-xl font-bold text-gray-900">No certifications found</h3>
      <p className="mt-2 text-gray-600">
        Try adjusting your search or filter criteria
      </p>
      <div className="mt-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleResetFilters}
          className="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-sm font-medium rounded-xl text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Reset Filters
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section with Image */}
        <div className="relative mb-16 rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-600/80 z-10"></div>
          <div className="relative z-20 py-24 px-8 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              Professional <span className="text-yellow-300">Certification</span> Services
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-xl text-blue-100 max-w-3xl mx-auto mb-8"
            >
              Globally recognized certifications to elevate your business standards
            </motion.p>
          </div>
          <motion.img
            src={CompanyImage1}
            alt="Professional Certification Services"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        </div>

        {/* Search and Filter Bar */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                placeholder="Search certifications..."
                value={searchQuery}
                onChange={(e) => setState(prev => ({ ...prev, searchQuery: e.target.value }))}
              />
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleFilters}
              className={`inline-flex items-center justify-center px-6 py-3 border rounded-xl text-lg font-medium ${showFilters ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
            >
              <FaFilter className="mr-2" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </motion.button>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 pt-6 border-t border-gray-200"
              >
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Certification Type</label>
                    <select
                      className="block w-full pl-4 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-xl border"
                      value={selectedType}
                      onChange={(e) => setState(prev => ({ ...prev, selectedType: e.target.value }))}
                    >
                      <option value="">All Types</option>
                      {certificationTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleResetFilters}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-lg font-medium rounded-xl text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <FaTimes className="mr-2" />
                    Reset Filters
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Certifications Grid */}
        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <ErrorMessage />
        ) : certifications.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              <AnimatePresence>
                {certifications.map((cert) => (
                  <motion.div
                    key={cert._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    onClick={() => handleServiceClick(cert._id)}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 cursor-pointer flex flex-col h-full group"
                  >
                    {/* Certification Image */}
                    <div className="relative h-48 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 z-10"></div>
                      <motion.img
                        src={CompanyImage1}
                        alt={cert.name}
                        className="w-full h-full object-cover"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      />
                      <div className="absolute bottom-4 left-4 z-20">
                        <span className="inline-block px-3 py-1 bg-blue-600 text-white text-sm font-bold rounded-full">
                          {cert.certificationType}
                        </span>
                      </div>
                    </div>

                    {/* Certification Content */}
                    <div className="p-6 flex-grow flex flex-col">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {cert.name}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {cert.shortDescription}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{cert.durationInMonths} months</span>
                        </div>
                        <button className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors flex items-center">
                          Details <FaArrowRight className="ml-1" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    disabled={currentPage === 1}
                    onClick={() => fetchCertifications(currentPage - 1)}
                    className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-blue-600 shadow hover:bg-gray-50'}`}
                  >
                    Previous
                  </motion.button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <motion.button
                        key={pageNum}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => fetchCertifications(pageNum)}
                        className={`px-4 py-2 rounded-lg ${currentPage === pageNum ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-blue-600 shadow hover:bg-gray-50'}`}
                      >
                        {pageNum}
                      </motion.button>
                    );
                  })}
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    disabled={currentPage === totalPages}
                    onClick={() => fetchCertifications(currentPage + 1)}
                    className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-blue-600 shadow hover:bg-gray-50'}`}
                  >
                    Next
                  </motion.button>
                </div>
              </div>
            )}

            {/* View All Button */}
            <motion.div 
              className="text-center mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <button
                onClick={() => navigate("/services-gallery")}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center"
              >
                Browse All Certification Services
                <FaArrowRight className="ml-2" />
              </button>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomeServices;