import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../secrets";

const ValidateCertificate = () => {
  const { certificationID } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Function to format date as dd/mm/yy
  const formatDate = (dateString) => {
    if (!dateString || dateString === "N/A") return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A";
    
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        setLoading(true);
        setError("");
        setSuccess("");
        
        const response = await axios.get(
          `${BASE_URL}/api/company-certifications/verify/${certificationID}`
        );
        
        if (response.data.success) {
          setData(response.data.data);
          setSuccess("Certificate verified successfully!");
        } else {
          setError("Certificate not found. Please check the ID and try again.");
        }
      } catch (err) {
        setError(
          err.response?.data?.message || 
          "Failed to verify certificate. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [certificationID]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-green-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying certificate...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-green-50 p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full">
        <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">
          Certificate Details
        </h1>

        {/* Display Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-green-600 font-semibold text-center">{success}</p>
          </div>
        )}

        {/* Display Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
            <p className="text-red-500 text-center">{error}</p>
          </div>
        )}

        {/* Display Company Details in Table Format */}
        {data && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">
              Company Details
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="w-1/3 px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                      Field
                    </th>
                    <th className="w-2/3 px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">
                      Company Name
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-700">
                      {data.company.name || ""}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">
                      Status
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <span 
                        className={`px-2 py-1 rounded-full text-sm ${
                          data.company.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {data.company.status || ""}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">
                      Company Address
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {data.company.address || ""}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">
                      Scope
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {data.company.scope || ""}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">
                      Company Origin
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {data.company.origin || ""}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">
                      Site 2:
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {/* Empty as not in API */}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">
                      Scope 2:
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {/* Empty as not in API */}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Display Certification Details in Table Format */}
        {data && (
          <div>
            <h2 className="text-2xl font-bold text-blue-800 mb-4">
              Certification Details
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="w-1/3 px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                      Field
                    </th>
                    <th className="w-2/3 px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">
                      Certification Number
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {data.certificate.id || ""}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">
                      Scheme
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {data.certificate.scheme || ""}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">
                      Validity Period
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {data.certificate.validityPeriod || ""}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">
                      Issue Date
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {formatDate(data.certificate.issueDate)}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">
                      First Surveillance Date
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {formatDate(data.certificate.firstSurveillanceDate)}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">
                      Second Surveillance Date
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {formatDate(data.certificate.secondSurveillanceDate)}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">
                      Expiry Date
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {formatDate(data.certificate.expiryDate)}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">
                      Accreditation
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                    AB-CAB
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ValidateCertificate;