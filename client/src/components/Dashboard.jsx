import React, { useState, useRef, useEffect } from 'react';
import api from '../utils/api';

function Dashboard() {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadError('');
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadError('Please select a PDF file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setExtractedText(response.data.extractedText);
      setChatHistory([]);
      setUploadError('');

    } catch (error) {
      console.error('Upload Error:', error);
      setUploadError(error.response?.data?.error || 'Failed to upload PDF');
    }
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim() || !extractedText) return;

    const newQuestion = userInput.trim();
    setUserInput('');
    setIsLoading(true);
    
    // Add user question to chat
    setChatHistory(prev => [...prev, 
      { type: 'user', content: newQuestion }
    ]);

    try {
      const response = await api.post('/chat', {
        question: newQuestion,
        context: extractedText
      });

      setChatHistory(prev => [...prev,
        { type: 'ai', content: response.data.answer }
      ]);

    } catch (error) {
      console.error('Chat Error:', error);
      setChatHistory(prev => [...prev,
        { type: 'error', content: 'Failed to get response. Please try again.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          PDF Chat Assistant
        </h1>

        {/* File Upload Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <input
              type="file"
              onChange={handleFileChange}
              accept="application/pdf"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <button
              onClick={handleUpload}
              className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Upload PDF
            </button>
          </div>
          {uploadError && (
            <p className="text-red-500 mt-2 text-sm">{uploadError}</p>
          )}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* PDF Text Display */}
          <div className="bg-white rounded-lg shadow-md p-6 h-[70vh] flex flex-col">
            <h2 className="text-xl font-semibold mb-4">PDF Content</h2>
            <div className="flex-1 overflow-y-auto prose max-w-none">
              {extractedText ? (
                <pre className="whitespace-pre-wrap text-gray-700">
                  {extractedText}
                </pre>
              ) : (
                <p className="text-gray-400 italic">
                  Upload a PDF to view extracted content
                </p>
              )}
            </div>
          </div>

          {/* Chat Interface */}
          <div className="bg-white rounded-lg shadow-md p-6 h-[70vh] flex flex-col">
            <h2 className="text-xl font-semibold mb-4">Chat Assistant</h2>
            
            <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
              {chatHistory.map((message, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    message.type === 'user' 
                      ? 'bg-blue-50 ml-6' 
                      : message.type === 'error'
                      ? 'bg-red-50'
                      : 'bg-green-50 mr-6'
                  }`}
                >
                  <div className="text-sm font-medium text-gray-500 mb-1">
                    {message.type === 'user' ? 'You' : 
                     message.type === 'error' ? 'Error' : 'Assistant'}
                  </div>
                  <div className="text-gray-800 whitespace-pre-wrap">
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="p-4 bg-gray-50 rounded-lg mr-6 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleChatSubmit} className="mt-auto">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Ask about the PDF..."
                  className="flex-1 p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={!extractedText || isLoading}
                />
                <button
                  type="submit"
                  disabled={!extractedText || isLoading}
                  className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Sending...' : 'Send'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;