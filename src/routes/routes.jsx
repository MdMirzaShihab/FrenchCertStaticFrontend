import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";

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

import ISO9001 from "../pages/Services/ISO9001";
import ISO14001 from "../pages/Services/ISO14001";
import ISO27001 from "../pages/Services/ISO27001";
import ISO50001 from "../pages/Services/ISO50001";
import ISO22000 from "../pages/Services/ISO22000";
import FSSC22000 from "../pages/Services/FSSC22000";
import ISO45001 from "../pages/Services/ISO45001";
import IATF16949 from "../pages/Services/IATF16949";
import EN9100_EN9120 from "../pages/Services/EN9100_EN9120";
import CertificationCardList from "../pages/Services/CertificationCardList";
import CertificationDetail from "../pages/Services/CertificationDetail";

const AppRoutes = () => {
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
        <Route path="iso9001" element={<ISO9001 />} />
        <Route path="iso14001" element={<ISO14001 />} />
        <Route path="iso27001" element={<ISO27001 />} />
        <Route path="iso50001" element={<ISO50001 />} />
        <Route path="iso22000" element={<ISO22000 />} />
        <Route path="fssc22000" element={<FSSC22000 />} />
        <Route path="iso45001" element={<ISO45001 />} />
        <Route path="iatf16949" element={<IATF16949 />} />
        <Route path="en9100-en9120" element={<EN9100_EN9120 />} />
        <Route path="certification-cards" element={<CertificationCardList />} />
        <Route
          path="certification-cards/:id"
          element={<CertificationDetail />}
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
