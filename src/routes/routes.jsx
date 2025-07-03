import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../secrets";

import HomePage from "../pages/HomePage";
import ValidateCertificate from "../pages/ValidateCertificate";
import CompanyLogin from "../pages/Company Profile/CompanyLogin";
import CompanyDetails from "../pages/Company Profile/CompanyDetails";
import Career from "../pages/Career";
import Services from "../pages/Services/Services";
import About from "../pages/AboutUs/AboutUs";
import Contact from "../pages/Contact/Contact";
import JoinUs from "../pages/JoinUs/JoinUs";
import Process from "../pages/Processes/Processes";
import Accreditations from "../pages/Accreditations/Accreditations";
import ServicesGallery from "../pages/Services/ServicesGallery";
import ServiceDetail from "../pages/Services/ServiceDetail";
import TrainingsGallery from "../pages/Trainings/TrainingsGallery";
import TrainingDetail from "../pages/Trainings/TrainingDetail";
import DynamicPage from "../pages/DynamicPage";

const AppRoutes = () => {
  const [dynamicRoutes, setDynamicRoutes] = useState([]);
  const [loading, setLoading] = useState(true);

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
    </div>
  );


  useEffect(() => {
    const fetchNavbarPages = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/pages/navbar`);
        setDynamicRoutes(response.data.data);
      } catch (err) {
        console.error('Failed to fetch navbar pages:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNavbarPages();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <Routes>
      {/* Public routes with main layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route
          path="validate/:certificationID"
          element={<ValidateCertificate />}
        />
        <Route path="login" element={<CompanyLogin />} />
        <Route path="company-details/:companyID" element={<CompanyDetails />} />
        <Route path="accreditations" element={<Accreditations />} />
        <Route path="career" element={<Career />} />
        <Route path="services" element={<Services />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="join-us" element={<JoinUs />} />
        <Route path="process" element={<Process />} />

        {/* Service pages */}
        <Route path="/services-gallery" element={<ServicesGallery />} />
        <Route path="/service-detail/:id" element={<ServiceDetail />} />

        {/* Training pages */}
        <Route path="/trainings-gallery" element={<TrainingsGallery />} />
        <Route path="/training-detail/:id" element={<TrainingDetail />} />

        {/* Dynamic pages from backend */}
        {dynamicRoutes.map((page) => (
  <Route 
    key={page._id} 
    path={`/${page.slug}`}
    element={<DynamicPage />} 
  />
))}
      </Route>
    </Routes>
  );
};

export default AppRoutes;