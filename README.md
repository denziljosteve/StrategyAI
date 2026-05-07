# 🧠 StrategyJEDI — Neural Strategic Intelligence Core

StrategyJEDI is a futuristic, AI-powered strategic consulting assistant designed to deliver McKinsey-grade analysis at hyper-speed. It synthesizes deep, multi-framework reports using advanced Large Language Models (Llama 3.3 via Groq) to provide surgical insights for complex business problems.

Developed with precision by **Denzil Josteve Fernandes**.

---

## ✨ Key Features

- **9-Dimension Analysis:** Covers External, Internal, Competitive, Growth, Business Model, Execution, Decisions, Advanced Frameworks, and a synthesized Executive Summary.
- **Deep Rationale:** Unlike generic AI tools, StrategyJEDI provides a specific "Framework Significance" and "Stance Rationale" for *every* dimension, explaining exactly why specific strategic choices were made.
- **Futuristic UI/UX:** A high-contrast, "cyber-consulting" interface featuring glassmorphism, neon HUD elements, and automatic synchronized navigation.
- **Multi-Framework Support:** Includes Porter's 5 Forces, SWOT, VRIO, Ansoff Matrix, BCG Matrix, McKinsey 7S, Blue Ocean Strategy, and more.
- **Instant Export:** Export your complete strategic intelligence report as a professionally formatted PDF.

---

## 🛠️ Tech Stack

### Frontend
- **React 18** (Vite-powered SPA)
- **Tailwind CSS** (Futuristic styling & HUD design)
- **Lucide React** (High-tech iconography)
- **Axios** (Neural core communication)
- **html2pdf.js** (Strategic report exporting)

### Backend
- **Node.js & Express**
- **Groq SDK** (Powering the Llama 3.3 70B neural engine)
- **Dotenv** (Environment management)
- **Express Rate Limit** (System stability)

---

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Groq API Key](https://console.groq.com/)

### 2. Installation

Clone the repository:
```bash
git clone https://github.com/denziljosteve/strategyjedi.git
cd strategyjedi
```

Install Dependencies:
```bash
# Install Backend dependencies
cd backend
npm install

# Install Frontend dependencies
cd ../frontend
npm install
```

### 3. Configuration

Create a `.env` file in the `backend/` directory:
```env
PORT=3001
GROQ_API_KEY=your_groq_api_key_here
```

### 4. Running the Project

Start the Backend (from `backend/` folder):
```bash
npm run dev
```

Start the Frontend (from `frontend/` folder):
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

---

## 📁 Project Structure

```text
strategyJEDI/
├── backend/            # Neural Brain & API
│   ├── index.js        # Express server & Strategic Prompt
│   └── .env            # Environment variables (Ignored by Git)
├── frontend/           # High-Tech Interface
│   ├── src/
│   │   ├── components/ # Atomic UI components
│   │   ├── App.jsx     # Strategic HUD Core
│   │   └── index.css   # Futuristic styling system
│   └── vite.config.js
└── README.md           # System Documentation
```

---

## 👨‍💻 Developer

**Denzil Josteve Fernandes**
- [Personal Terminal](https://denziljosteve.github.io/)
- [LinkedIn](https://www.linkedin.com/in/denziljosteve/)
- [GitHub Repository](https://github.com/denziljosteve)

---

## 🛡️ Security & Integrity

- **Environment Protection:** `.env` files are strictly excluded via `.gitignore` to prevent API key leakage.
- **Rate Limiting:** Built-in protection to prevent system overload during heavy strategic synthesis.

---

## 📄 License

MIT License - Built for elite strategic intelligence.
