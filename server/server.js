const express = require('express');
const multer = require('multer');
const fs = require('fs');
const mammoth = require('mammoth');
const officeparser = require('officeparser'); 
const pdfParse = require('pdf-parse'); 
const cors = require('cors');
const app = express();

 const corsOptions = {
    origin: 'http://localhost:5173',
 };

app.use(cors(corsOptions));


const upload = multer({ dest: 'uploads/' });

// Function to extract text from a .pdf file
const extractTextFromPDF = async (filePath) => {
    const fileBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(fileBuffer);
    return pdfData.text;
};

// Function to extract text from a .doc file
const extractTextFromDoc = (filePath) => {
    return new Promise((resolve, reject) => {
        officeparser.parseWord(filePath, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
};

// Upload endpoint
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const filePath = req.file.path;
        const fileName = req.file.originalname;

        let extractedText = '';
        if (fileName.endsWith('.docx')) {
            const fileBuffer = fs.readFileSync(filePath);
            const result = await mammoth.extractRawText({ buffer: fileBuffer });
            extractedText = result.value;
        } else if (fileName.endsWith('.doc')) {
            extractedText = await extractTextFromDoc(filePath);
        } else if (fileName.endsWith('.pdf')) {
            extractedText = await extractTextFromPDF(filePath);
        } else {
            fs.unlinkSync(filePath); // Clean up the uploaded file
            return res.status(400).json({ message: 'Only .docx, .doc, and .pdf files are supported.' });
        }

        console.log('Extracted Text:', extractedText);
        fs.unlinkSync(filePath);
        res.json({ extractedText });
    } catch (error) {
        console.error('Error processing the file:', error);
        res.status(500).json({ message: 'An error occurred.', error: error.message });
    }
});
app.listen(3000, () => {
    console.log('Server is running on 3000');
})