import React, { useState } from 'react';
import api from './utils/api'; // Import the configured Axios instance

function App() {
  const [file, setFile] = useState(null); // State to hold the selected file
  const [extractedText, setExtractedText] = useState(''); // State to hold extracted text

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setExtractedText(response.data.extractedText); // Update state with extracted text
      console.log(response.data.extractedText);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">File Upload and Text Extraction</h1>
      
      <div className="mb-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="border rounded p-2"
        />
      </div>

      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Upload
      </button>

      {extractedText && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h2 className="font-bold text-xl mb-2">Extracted Text:</h2>
          <pre className="whitespace-pre-wrap">{extractedText}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
