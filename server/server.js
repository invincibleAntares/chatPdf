require('dotenv').config();
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const pdfParse = require('pdf-parse');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Middleware Configuration
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// File Upload Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads');
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.pdf') {
      return cb(new Error('Only PDF files are allowed'));
    }
    cb(null, true);
  },
});

// Text Extraction Function
const extractTextFromPDF = async (filePath) => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);
    return pdfData.text;
  } finally {
    fs.unlinkSync(filePath); // Clean up uploaded file
  }
};

// Store extracted context globally for simplicity
let globalContext = '';

// Upload Endpoint
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const extractedText = await extractTextFromPDF(req.file.path);
    globalContext = extractedText; // Store extracted text globally

    res.json({
      filename: req.file.filename,
      extractedText,
      pdfUrl: `/uploads/${req.file.filename}`,
    });
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({
      error: error.message || 'Failed to process PDF file',
    });
  }
});

// Chat Endpoint with Gemini
app.post('/chat', async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!globalContext) {
      return res
        .status(400)
        .json({ error: 'No context available. Upload a PDF first.' });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", });
    const prompt = `Using the provided context and your data also 
            the context is just the extacted text from a pdf so it may not be perfect,so you have answer based upon both the context and the data you have , 
    , answer the following question you dont have to limited just to context :\n\nContext:\n"${globalContext}"\n\nQuestion: "${question}"`;

    const result = await model.generateContent(prompt);
    const response = result.response;

    res.json({ answer: response.text() });
  } catch (error) {
    console.error('Chat Error:', error);
    res.status(500).json({
      error: 'Failed to generate response',
      details: error.message,
    });
  }
});


// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
