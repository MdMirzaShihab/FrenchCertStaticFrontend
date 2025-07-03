import { useEffect } from "react";
import coverImg from "../assets/Cover.webp";

const Hero = () => {
  useEffect(() => {
    // Animation effect for the heading
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let interval = null;
    
    const h1 = document.querySelector(".certification-heading");
    if (h1) {
      let iteration = 0;
      
      clearInterval(interval);
      
      interval = setInterval(() => {
        h1.innerText = h1.innerText
          .split("")
          .map((letter, index) => {
            if(index < iteration) {
              return h1.dataset.value[index];
            }
            return letters[Math.floor(Math.random() * 26)]
          })
          .join("");
        
        if(iteration >= h1.dataset.value.length){ 
          clearInterval(interval);
        }
        
        iteration += 1 / 3;
      }, 30);
    }
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-gradient-to-br from-blue-50 to-gray-50 overflow-hidden">
      <div className="relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
          <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        </div>

        <div className="container mx-auto px-6 pt-24 md:px-12 lg:pt-32 lg:px-7 relative z-10">
          <div className="flex items-center flex-wrap px-2 md:px-0">
            <div className="relative lg:w-7/12 lg:py-24 xl:py-32">
              <div className="flex flex-col justify-center items-center lg:items-start py-6 space-y-6">
                <h1 
                  className="certification-heading text-5xl md:text-7xl font-bold leading-tight text-center lg:text-left bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-900"
                  data-value="FRENCH CERT"
                >
                  FRENCH CERT
                </h1>
                
                <p className="mt-4 text-xl md:text-2xl text-gray-600 font-medium max-w-lg">
                  Your trusted partner for <span className="text-blue-600 font-semibold animate-pulse">ISO certifications</span> and professional accreditations
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                    Explore Certifications
                  </button>
                  <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md border border-blue-200 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105">
                    Speak to an Expert
                  </button>
                </div>
                
                {/* Trust indicators */}
                <div className="flex flex-wrap items-center gap-6 mt-12">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-600">100% Approval</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-600">Fast Processing</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="ml-auto lg:w-5/12 hidden lg:block relative">
              <div className="relative">
                <img
                  src={coverImg}
                  alt="Professional Certification"
                  className="w-full h-auto object-cover rounded-2xl transform transition-all duration-1000 hover:scale-105"
                />
                {/* Floating badges animation */}
                <div className="absolute -top-10 -left-10 w-24 h-24 bg-white rounded-xl shadow-xl flex items-center justify-center animate-float">
                  <span className="text-xs font-bold text-blue-600">ISO 9001</span>
                </div>
                <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-white rounded-xl shadow-xl flex items-center justify-center animate-float animation-delay-2000">
                  <span className="text-xs font-bold text-blue-600">ISO 27001</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;