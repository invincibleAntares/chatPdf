
# 📄 ChatPDF
> 🤖 Your AI-powered PDF conversation companion

![License](https://img.shields.io/badge/License-MIT-green)
![React](https://img.shields.io/badge/React-18.3.1-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-6.0.5-purple?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0.0-38B2AC?logo=tailwind-css)

## 📋 Table of Contents
- [✨ Features](#features)
- [🛠️ Tech Stack](#tech-stack)
- [📦 Installation](#installation)
- [🚀 Usage](#usage)
- [👥 Contributing](#contributing)
- [📝 License](#license)

## ✨ Features

- 📤 **Smart Upload System**
  - Drag & drop PDF files
  - Automatic text recognition and extraction
  - Support for multiple file formats

- 💬 **Interactive Chat Interface**
  - Real-time conversations about your documents
  - AI-powered responses using Google's Generative AI
  - Context-aware question answering

- 🔄 **Collaboration Tools**
  - Save and share document summaries
  - Real-time collaboration features
  - Seamless document navigation

## 🛠️ Tech Stack

### Frontend
- ⚛️ React 18
- 🏃‍♂️ Vite
- 🎨 TailwindCSS
- 🎭 Framer Motion
- 📑 React PDF Viewer

### Backend
- 🟢 Node.js
- 🚂 Express
- 🤖 Google Generative AI
- 📄 PDF Parse

## 📦 Installation

1. **Clone the repository**
```bash
git clone https://github.com/invincibleantares/chatpdf.git
cd chatpdf
```

2. **Install dependencies**
```bash
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

3. **Set up environment variables**
```bash
# In client directory
echo "VITE_API_BASE_URL=http://localhost:3000" > .env

# In server directory
echo "PORT=3000" > .env
```

## 🚀 Usage

1. **Start the development server**
```bash
# Start backend server
cd server
npm run dev

# Start frontend development server
cd client
npm run dev
```

2. **Access the application**
- Open your browser and navigate to `http://localhost:5173`
- Upload a PDF file using the dashboard
- Start chatting with your document!

## 💻 Development

```bash
# Run linting
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## 👥 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

### 🌟 Acknowledgements
- Google Generative AI for powering the chat functionality
- React PDF Viewer for PDF rendering capabilities
- All contributors who have helped shape this project

```
