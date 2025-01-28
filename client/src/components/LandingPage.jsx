import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegFilePdf, FaRegComments, FaShare, FaFileUpload } from 'react-icons/fa';
import { HiOutlineSparkles } from 'react-icons/hi';

function LandingPage() {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 text-white">
      {/* Top Bar */}
      <nav className="w-full px-6 py-4 fixed top-0 bg-white/10 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FaRegFilePdf className="text-2xl text-orange-500" />
            <span className="text-xl font-bold">ChatPDF</span>
          </div>
          <button
            onClick={handleGetStarted}
            className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center h-screen pt-16">
        <div className="text-center max-w-4xl px-4">
          <div className="inline-flex items-center bg-white/10 px-6 py-2 rounded-full mb-6 space-x-2">
            <HiOutlineSparkles className="text-orange-500 text-xl" />
            <span>AI-Powered Document Analysis</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Transform Your Documents with
            <span className="text-orange-500"> AI Magic</span>
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Upload, summarize, and interact with your PDFs like never before. Get instant insights and answers from your documents.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/30"
          >
            Start Exploring Now
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white text-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Powerful Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 bg-gradient-to-b from-white to-purple-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <FaFileUpload className="text-3xl text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Smart Upload</h3>
              <p className="text-gray-600">
                Drag & drop your PDFs and documents. We support multiple formats with automatic text recognition.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 bg-gradient-to-b from-white to-blue-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <FaRegComments className="text-3xl text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Interactive Chat</h3>
              <p className="text-gray-600">
                Ask questions, get instant answers, and explore your documents through natural conversation.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 bg-gradient-to-b from-white to-orange-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <FaShare className="text-3xl text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Collaborate & Share</h3>
              <p className="text-gray-600">
                Save your summaries, export highlights, and collaborate with team members in real-time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;