import React from 'react'
import { useNavigate } from 'react-router-dom';
function LandingPage() {
    const navigate = useNavigate();
    const handleGetStarted = () => {
      navigate('/dashboard');
    };
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 text-white">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-5xl font-bold mb-4">Welcome to ChatPdf</h1>
          <p className="text-xl mb-8">Your AI-powered PDF and Document Summarizer</p>
          <button
            onClick={handleGetStarted}
            className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
           >
            Get Started
          </button>
        </div>
  
        {/* Features Section */}
        <div className="bg-white text-gray-800 py-16">
          <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            {/* Feature 1 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold mb-4">Upload & Summarize</h3>
              <p className="text-gray-600">
                Upload your PDFs and documents, and get concise summaries instantly.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold mb-4">Chat with PDF</h3>
              <p className="text-gray-600">
                Interact with your documents by asking questions and getting answers.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold mb-4">Save & Share</h3>
              <p className="text-gray-600">
                Save your summaries and share them with others effortlessly.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default LandingPage