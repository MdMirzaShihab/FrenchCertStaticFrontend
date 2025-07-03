import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../secrets";
import { toast } from "react-toastify";

const DynamicPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
    </div>
  );

  useEffect(() => {
    const slug = params.slug || window.location.pathname.split('/').pop();

    if (!slug) {
      setLoading(false);
      setError("Invalid page URL");
      return;
    }

    const fetchPage = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/api/pages/${slug}`);
        
        if (!response.data.success || !response.data.data) {
          throw new Error("Page not found");
        }
        
        setPage(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Page not found');
        toast.error('Failed to load page');
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [params, navigate]);

  if (loading) return <LoadingSpinner />;
  
  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-6">Page Not Found</h1>
        <p className="text-lg text-gray-700 mb-8">
          The page you requested doesn't exist or may have been moved.
        </p>
        <button 
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Return to Home
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Page Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            {page.title}
          </h1>
          {page.metaDescription && (
            <p className="text-xl text-gray-600 max-w-3xl">
              {page.metaDescription}
            </p>
          )}
        </div>
      </div>

      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div 
            className="rich-text-content"
            dangerouslySetInnerHTML={{ __html: page.content }} 
          />
        </div>
      </div>

      {/* Add some global styles for the rich text content */}
      <style jsx global>{`
        .rich-text-content {
          line-height: 1.7;
          color: #374151;
        }
        .rich-text-content h1 {
          font-size: 2.5rem;
          font-weight: 800;
          color: #111827;
          margin-top: 2.5rem;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }
        .rich-text-content h2 {
          font-size: 2rem;
          font-weight: 700;
          color: #111827;
          margin-top: 2rem;
          margin-bottom: 1rem;
          line-height: 1.3;
        }
        .rich-text-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #111827;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .rich-text-content p {
          margin-bottom: 1.5rem;
          font-size: 1.125rem;
        }
        .rich-text-content a {
          color: #3b82f6;
          text-decoration: underline;
          font-weight: 500;
        }
        .rich-text-content a:hover {
          color: #2563eb;
        }
        .rich-text-content ul, 
        .rich-text-content ol {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }
        .rich-text-content li {
          margin-bottom: 0.5rem;
        }
        .rich-text-content strong {
          font-weight: 600;
          color: #111827;
        }
        .rich-text-content em {
          font-style: italic;
        }
        .rich-text-content u {
          text-decoration: underline;
        }
        .rich-text-content blockquote {
          border-left: 4px solid #3b82f6;
          padding-left: 1.5rem;
          margin-left: 0;
          margin-bottom: 1.5rem;
          font-style: italic;
          color: #4b5563;
        }
      `}</style>
    </div>
  );
};

export default DynamicPage;