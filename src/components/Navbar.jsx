import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../secrets";
import logo from "../assets/FrenchcertABcab.png";
import { motion } from "framer-motion";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [certificationID, setCertificationID] = useState(""); // State for certification ID
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNavbarPages = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/pages/navbar`);
        setPages(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch navbar pages');
      } finally {
        setLoading(false);
      }
    };

    fetchNavbarPages();
  }, []);

  // Animation variants
  const menuItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      color: "#60a5fa", // blue-400
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  const mobileMenuVariants = {
    open: { 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: { 
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  // Handle form submission for certificate verification
  const handleVerify = (e) => {
    e.preventDefault();
    window.location.href = `/validate/${certificationID}`;
    setIsVerifyModalOpen(false); // Close the modal after navigation
  };

  return (
    <nav className="bg-white h-24 text-blue-900 font-semibold p-2 fixed w-full top-0 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center h-full object-cover">
        <Link to="/" className="h-full object-cover">
          <img src={logo} alt="Logo" className="h-full object-cover" />
        </Link>

        {/* Mobile Menu Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none text-2xl"
        >
          {isOpen ? "✕" : "☰"}
        </motion.button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6">
          <motion.li
            variants={menuItemVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <Link to="/" className="transition">
              Home
            </Link>
          </motion.li>
          <motion.li
            variants={menuItemVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <Link to="/services-gallery" className="transition">
              Services
            </Link>
          </motion.li>
          <motion.li
            variants={menuItemVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <Link to="/trainings-gallery" className="transition">
              Trainings
            </Link>
          </motion.li>
          
          {/* Dynamic Pages */}
          {loading ? (
            <motion.li
              variants={menuItemVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
            </motion.li>
          ) : error ? (
            <motion.li
              variants={menuItemVariants}
              initial="hidden"
              animate="visible"
              className="text-red-500 text-sm"
            >
              Menu Error
            </motion.li>
          ) : (
            pages.map((page) => (
              <motion.li
                key={page._id}
                variants={menuItemVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                <Link to={`/${page.slug}`} className="transition">
                  {page.title}
                </Link>
              </motion.li>
            ))
          )}

          {/* Verify Certificate Button */}
          <motion.li
            variants={menuItemVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <button 
              onClick={() => setIsVerifyModalOpen(true)} // Open modal on button click
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Verify Certificate
            </button>
          </motion.li>
        </ul>

        {/* Mobile Menu */}
        <motion.ul
          className={`md:hidden absolute top-24 right-0 w-full bg-white shadow-lg px-6 py-4 space-y-4`}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={mobileMenuVariants}
        >
          <motion.li
            variants={menuItemVariants}
            whileHover="hover"
            onClick={() => setIsOpen(false)}
          >
            <Link to="/" className="block py-2">
              Home
            </Link>
          </motion.li>
          <motion.li
            variants={menuItemVariants}
            whileHover="hover"
            onClick={() => setIsOpen(false)}
          >
            <Link to="/services-gallery" className="block py-2">
              Services
            </Link>
          </motion.li>
          <motion.li
            variants={menuItemVariants}
            whileHover="hover"
            onClick={() => setIsOpen(false)}
          >
            <Link to="/trainings-gallery" className="block py-2">
              Trainings
            </Link>
          </motion.li>
          
          {/* Dynamic Pages - Mobile */}
          {loading ? (
            <motion.li variants={menuItemVariants}>
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse my-2"></div>
            </motion.li>
          ) : error ? (
            <motion.li 
              variants={menuItemVariants}
              className="text-red-500 text-sm py-2"
            >
              Menu Error
            </motion.li>
          ) : (
            pages.map((page) => (
              <motion.li
                key={page._id}
                variants={menuItemVariants}
                whileHover="hover"
                onClick={() => setIsOpen(false)}
              >
                <Link to={`/${page.slug}`} className="transition">
                  {page.title}
                </Link>
              </motion.li>
            ))
          )}

          <motion.li
            variants={menuItemVariants}
            whileHover="hover"
            onClick={() => {
              setIsOpen(false);
              setIsVerifyModalOpen(true);
            }}
          >
            <button className="w-full text-left py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
              Verify Certificate
            </button>
          </motion.li>
        </motion.ul>
      </div>

      {/* Verify Modal */}
      {isVerifyModalOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
         

            {/* Verify Certificate Form */}
            <div className="bg-white p-6 rounded-lg shadow-lg w-80 sm:w-64">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold text-blue-800">Verify Certificate</h1>
                <button
                  onClick={() => setIsVerifyModalOpen(false)} // Close the form
                  className="text-gray-500 hover:text-gray-700">
                  &times;
                </button>
              </div>
              <form onSubmit={handleVerify} className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter Certification ID"
                  value={certificationID}
                  onChange={(e) => setCertificationID(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300">
                  Verify
                </button>
              </form>
            </div>
          </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
