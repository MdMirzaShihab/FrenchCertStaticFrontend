import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { BASE_URL } from '../../secrets';
import { FaArrowLeft, FaClock, FaChalkboardTeacher, FaExternalLinkAlt, FaTag } from 'react-icons/fa';

const TrainingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [training, setTraining] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTraining = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/api/trainings/public/${id}`);
        setTraining(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch training details');
      } finally {
        setLoading(false);
      }
    };

    fetchTraining();
  }, [id]);

  // Eye-friendly rich text styling
  const richTextStyles = `
    .training-content {
      line-height: 1.8;
      color: #4a5568;
      font-size: 1.05rem;
    }
    .training-content h1 {
      font-size: 2em;
      margin: 1.5em 0 0.75em;
      font-weight: 600;
      color: #2d3748;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 0.5em;
    }
    .training-content h2 {
      font-size: 1.75em;
      margin: 1.25em 0 0.5em;
      font-weight: 600;
      color: #2d3748;
    }
    .training-content h3 {
      font-size: 1.5em;
      margin: 1em 0 0.5em;
      font-weight: 600;
      color: #2d3748;
    }
    .training-content p {
      margin-bottom: 1.5em;
    }
    .training-content ul, 
    .training-content ol {
      margin-bottom: 1.5em;
      padding-left: 2em;
    }
    .training-content ul {
      list-style-type: disc;
    }
    .training-content ol {
      list-style-type: decimal;
    }
    .training-content li {
      margin-bottom: 0.75em;
    }
    .training-content a {
      color: #4299e1;
      text-decoration: none;
      border-bottom: 1px dotted #4299e1;
      transition: all 0.3s ease;
    }
    .training-content a:hover {
      color: #3182ce;
      border-bottom-style: solid;
    }
    .training-content strong {
      font-weight: 600;
      color: #2d3748;
    }
    .training-content em {
      font-style: italic;
    }
    .training-content u {
      text-decoration: underline;
    }
    .training-content img {
      max-width: 100%;
      height: auto;
      margin: 1.75em 0;
      border-radius: 0.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      border: 1px solid #e2e8f0;
    }
    .training-content blockquote {
      border-left: 4px solid #4299e1;
      padding-left: 1.5em;
      margin: 1.75em 0;
      color: #4a5568;
      font-style: italic;
      background-color: #f8fafc;
      padding: 1em;
      border-radius: 0.25rem;
    }
    .training-content pre {
      background: #f1f5f9;
      padding: 1em;
      border-radius: 0.5rem;
      overflow-x: auto;
      margin: 1.75em 0;
      border: 1px solid #e2e8f0;
    }
    .training-content code {
      font-family: monospace;
      background: #edf2f7;
      padding: 0.2em 0.4em;
      border-radius: 0.3em;
      color: #2d3748;
    }
  `;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-red-50 border-l-4 border-red-400 p-4 max-w-md rounded-lg shadow-sm">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
              <button 
                onClick={() => navigate('/trainings-gallery')}
                className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Back to Trainings
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!training) {
    return null;
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Back button */}
      <div className="fixed right-5 mt-10 z-10">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => navigate('/trainings-gallery')}
          className="flex items-center px-4 py-2 bg-white hover:bg-gray-100 rounded-lg transition-all duration-300 border border-blue-400 hover:border-blue-500 shadow-blue-300 hover:shadow-blue-400 shadow-lg hover:shadow-md"
        >
          <FaArrowLeft className="mr-2 text-gray-600" />
          <span className="text-gray-700">Back to Trainings</span>
        </motion.button>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto"
        >
          {/* Header section */}
          <motion.div variants={itemVariants} className="mb-12 text-center">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="inline-block mb-6"
            >
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center border-2 border-blue-200">
                <FaChalkboardTeacher className="w-10 h-10 text-blue-600" />
              </div>
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              {training.name}
            </h1>
            <div className="inline-flex items-center px-4 py-1 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
              <FaTag className="mr-2" />
              {training.trainingType}
            </div>
          </motion.div>

          {/* Grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description card */}
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <h2 className="text-2xl font-bold mb-4 text-blue-700">Description</h2>
                <style dangerouslySetInnerHTML={{ __html: richTextStyles }} />
                <div 
                  className="training-content"
                  dangerouslySetInnerHTML={{ __html: training.description }}
                />
              </motion.div>

              {/* Call to action card */}
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Enroll Now</h2>
                <p className="mb-6 text-blue-700">{training.callToAction}</p>
                <div className="flex flex-wrap gap-4">
                  <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center shadow-md hover:shadow-lg">
                    Register <FaExternalLinkAlt className="ml-2" />
                  </button>
                  <button className="px-6 py-3 border border-blue-300 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-sm hover:shadow-md">
                    Contact Us
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Right column */}
            <div className="space-y-8">
              {/* Details card */}
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <h2 className="text-2xl font-bold mb-4 text-blue-700">Details</h2>
                <div className="space-y-4">
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
                  
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Training Type</p>
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                      <FaTag className="mr-2" />
                      {training.trainingType}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-1">Training Method</p>
                    <div className="flex flex-wrap gap-2">
                      {training.trainingMethod.map(method => (
                        <span key={method} className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                          {method.charAt(0).toUpperCase() + method.slice(1)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Badge preview */}
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 text-center"
              >
                <h2 className="text-2xl font-bold mb-4 text-blue-700">Certificate</h2>
                <div className="inline-block p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg shadow-md transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="w-32 h-32 bg-white rounded-md flex items-center justify-center border border-gray-200">
                    <span className="text-4xl font-bold text-gray-700">📜</span>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  Earn a professional certificate upon completion
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Subtle animated background elements */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: Math.random() * 100 - 50, y: Math.random() * 100 - 50 }}
            animate={{
              opacity: [0, 0.05, 0],
              x: Math.random() * 200 - 100,
              y: Math.random() * 200 - 100,
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-1 h-1 bg-blue-200 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TrainingDetail;