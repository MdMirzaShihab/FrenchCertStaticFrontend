import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaFilter, FaTimes, FaClock, FaChalkboardTeacher } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { BASE_URL } from "../../secrets";

const TrainingsGallery = () => {
  const [state, setState] = useState({
    trainings: [],
    loading: true,
    searchTerm: '',
    currentPage: 1,
    totalPages: 1,
    trainingTypes: [],
    trainingMethods: ["online", "in-person", "hybrid"],
    selectedType: '',
    selectedMethod: '',
    error: null,
    showFilters: false
  });

  const { 
    trainings, 
    loading, 
    searchTerm, 
    currentPage, 
    totalPages, 
    trainingTypes, 
    trainingMethods,
    selectedType,
    selectedMethod,
    error,
    showFilters
  } = state;

  const navigate = useNavigate();

  // Fetch trainings using the public endpoint
  const fetchTrainings = useCallback(async (page = 1) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const params = {
        page,
        limit: 9, // Optimized for 3x3 grid
        ...(searchTerm && { search: searchTerm }),
        ...(selectedType && { type: selectedType }),
        ...(selectedMethod && { method: selectedMethod })
      };

      const response = await axios.get(`${BASE_URL}/api/trainings/public/list`, { params });
      
      setState(prev => ({
        ...prev,
        trainings: response.data.data.trainings,
        totalPages: response.data.data.pages,
        currentPage: page,
        loading: false
      }));
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to fetch trainings';
      setState(prev => ({ ...prev, loading: false, error: errorMsg }));
    }
  }, [searchTerm, selectedType, selectedMethod]);

  // Fetch training types
  const fetchTrainingTypes = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/trainings/types/list`);
      setState(prev => ({
        ...prev,
        trainingTypes: response.data.data
      }));
    } catch (err) {
      console.error('Failed to fetch training types:', err);
    }
  }, []);

  useEffect(() => {
    fetchTrainingTypes();
  }, [fetchTrainingTypes]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTrainings(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [fetchTrainings]);

  const handleResetFilters = () => {
    setState(prev => ({
      ...prev,
      searchTerm: '',
      selectedType: '',
      selectedMethod: '',
      currentPage: 1,
      showFilters: false
    }));
  };

  const toggleFilters = () => {
    setState(prev => ({ ...prev, showFilters: !prev.showFilters }));
  };

  const handleViewDetails = (id) => {
    navigate(`/training-detail/${id}`);
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      scale: 1.03,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
    </div>
  );

  const EmptyState = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-md mx-auto"
    >
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 mb-4">
        <FaChalkboardTeacher className="w-10 h-10 text-blue-500" />
      </div>
      <h3 className="mt-2 text-xl font-bold text-gray-900">No trainings found</h3>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700">Training Programs</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional development programs to enhance your skills and career
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                placeholder="Search trainings..."
                value={searchTerm}
                onChange={(e) => setState(prev => ({ ...prev, searchTerm: e.target.value }))}
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Training Type</label>
                    <select
                      className="block w-full pl-4 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-xl border"
                      value={selectedType}
                      onChange={(e) => setState(prev => ({ ...prev, selectedType: e.target.value }))}
                    >
                      <option value="">All Types</option>
                      {trainingTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Training Method</label>
                    <select
                      className="block w-full pl-4 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-xl border"
                      value={selectedMethod}
                      onChange={(e) => setState(prev => ({ ...prev, selectedMethod: e.target.value }))}
                    >
                      <option value="">All Methods</option>
                      {trainingMethods.map((method) => (
                        <option key={method} value={method}>
                          {method.charAt(0).toUpperCase() + method.slice(1)}
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

        {/* Content */}
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        ) : trainings.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {trainings.map((training) => (
                <motion.div
                  key={training._id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  onClick={() => handleViewDetails(training._id)}
                  className="group relative bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-dashed border-gray-300 hover:border-solid hover:border-blue-500 overflow-hidden"
                >
                  {/* Decorative icon */}
                  <div className="absolute -right-6 -top-6 text-blue-100 group-hover:text-blue-200 transition-colors duration-300">
                    <svg className="h-24 w-24" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {training.name}
                    </h3>
                    <div className="flex items-center mb-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {training.trainingType}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {training.shortDescription}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {training.trainingMethod.map(method => (
                        <span key={method} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {method.charAt(0).toUpperCase() + method.slice(1)}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center">
  <FaClock className="text-blue-500 mr-3" />
  <div>
    <p className="text-sm text-gray-600">Duration</p>
    <p className="font-medium text-gray-800">
      {training.durationInHours} hours
      {training.durationInHours >= 8 && (
        <span className="text-gray-600 ml-1">
          ({parseFloat((training.durationInHours / 8).toFixed(1))} days)
        </span>
      )}
    </p>
  </div>
</div>
                    <div className="mt-4 flex items-center text-blue-600 font-medium group-hover:text-blue-800 transition-colors duration-300">
                      View details
                      <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    disabled={currentPage === 1}
                    onClick={() => fetchTrainings(currentPage - 1)}
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
                        onClick={() => fetchTrainings(pageNum)}
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
                    onClick={() => fetchTrainings(currentPage + 1)}
                    className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-blue-600 shadow hover:bg-gray-50'}`}
                  >
                    Next
                  </motion.button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TrainingsGallery;