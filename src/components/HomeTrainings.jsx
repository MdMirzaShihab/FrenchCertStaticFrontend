import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import axios from "axios";
import { BASE_URL } from "../secrets";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaChalkboardTeacher, FaArrowRight } from "react-icons/fa";
import CompanyImage2 from "../assets/CompanyImage2.webp";

const HomeTrainings = () => {
  const [state, setState] = useState({
    featuredTrainings: [],
    loading: true,
    searchQuery: "",
    error: null,
    activeTab: "all",
    trainingTypes: []
  });

  const { featuredTrainings, loading, searchQuery, error, activeTab, trainingTypes } = state;
  const navigate = useNavigate();

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

  const fetchFeaturedTrainings = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const params = {
        limit: 8,
        ...(searchQuery && { search: searchQuery }),
        ...(activeTab !== "all" && { method: activeTab.toLowerCase() })
      };

      const response = await axios.get(
        `${BASE_URL}/api/trainings/public/list`,
        { params }
      );
      
      setState(prev => ({
        ...prev,
        featuredTrainings: response.data.data.trainings,
        loading: false
      }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || "Failed to fetch trainings"
      }));
    }
  }, [searchQuery, activeTab]);

  useEffect(() => {
    fetchTrainingTypes();
  }, [fetchTrainingTypes]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchFeaturedTrainings();
    }, 500);

    return () => clearTimeout(timer);
  }, [fetchFeaturedTrainings]);

  const handleTrainingClick = (trainingId) => {
    navigate(`/training-detail/${trainingId}`);
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

  const trainingTabs = [
    { id: "all", label: "All Trainings" },
    { id: "Online", label: "Online" },
    { id: "In-Person", label: "In-Person" },
    { id: "Hybrid", label: "Hybrid" }
  ];

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
              Professional <span className="text-yellow-300">Training</span> Programs
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-xl text-blue-100 max-w-3xl mx-auto mb-8"
            >
              Elevate your team's skills with our industry-leading training solutions
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-blue-800 font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center mx-auto"
            >
              Explore Programs <FaArrowRight className="ml-2" />
            </motion.button>
          </div>
          <motion.img
            src={CompanyImage2}
            alt="Professional Training"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        </div>

        {/* Training Content */}
        <div className="relative z-30 -mt-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-12"
          >
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search trainings..."
                  value={searchQuery}
                  onChange={(e) => setState(prev => ({ ...prev, searchQuery: e.target.value }))}
                  className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg shadow-sm"
                />
              </div>
              
              <div className="flex overflow-x-auto pb-2 md:pb-0">
                {trainingTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setState(prev => ({ ...prev, activeTab: tab.id }))}
                    className={`whitespace-nowrap px-6 py-3 rounded-xl font-medium text-sm md:text-base mr-2 last:mr-0 transition-colors duration-200 ${
                      activeTab === tab.id 
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Trainings Grid */}
          {loading ? (
            <LoadingSkeleton />
          ) : error ? (
            <ErrorMessage />
          ) : (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              >
                <AnimatePresence>
                  {featuredTrainings.map((training) => (
                    <motion.div
                      key={training._id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                      onClick={() => handleTrainingClick(training._id)}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 cursor-pointer flex flex-col h-full group"
                    >
                      {/* Training Image */}
                      <div className="relative h-48 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 z-10"></div>
                        <motion.img
                          src={CompanyImage2}
                          alt={training.name}
                          className="w-full h-full object-cover"
                          initial={{ scale: 1 }}
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        />
                        <div className="absolute bottom-4 left-4 z-20">
                          <span className="inline-block px-3 py-1 bg-blue-600 text-white text-sm font-bold rounded-full">
                            {Array.isArray(training.trainingMethod) 
                              ? training.trainingMethod[0] 
                              : training.trainingMethod}
                          </span>
                        </div>
                      </div>

                      {/* Training Content */}
                      <div className="p-6 flex-grow flex flex-col">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {training.name}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {training.shortDescription}
                        </p>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center text-sm text-gray-500">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{training.durationInHours} hours</span>
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

              {/* View All Button */}
              <motion.div 
                className="text-center mt-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <button
                  onClick={() => navigate("/trainings-gallery")}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center"
                >
                  Browse All Training Programs
                  <FaArrowRight className="ml-2" />
                </button>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeTrainings;