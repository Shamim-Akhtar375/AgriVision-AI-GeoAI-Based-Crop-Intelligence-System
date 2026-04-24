# 🌿 AgriVision AI: GeoAI-Based Crop Intelligence System

**Live Demo: [https://agri-vision-ai-geo-ai-based-crop-in-gamma.vercel.app/](https://agri-vision-ai-geo-ai-based-crop-in-gamma.vercel.app/)**

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![React](https://img.shields.io/badge/Frontend-React%2018-blue.svg)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688.svg)](https://fastapi.tiangolo.com/)
[![Vite](https://img.shields.io/badge/Build-Vite-646CFF.svg)](https://vitejs.dev/)

**AgriVision AI** is a next-generation Agricultural Decision Support System (ADSS) that leverages Geospatial AI (GeoAI), Generative AI, and Machine Learning to provide farmers with real-time field intelligence. By integrating NDVI mapping, soil moisture analysis, and yield prediction models, AgriVision empowers precision farming for a sustainable future.

---

## ✨ Key Features

### 📡 Geospatial Intelligence
*   **Interactive GIS Mapping:** Real-time field visualization using Leaflet.js with NDVI zone overlays.
*   **Zone-Based Analysis:** Identify high-risk and high-yield areas within a single field.

### 🤖 Advanced AI Simulations
*   **Hybrid Yield Prediction:** A mock CNN+LSTM architecture that simulates crop yield based on temperature, rainfall, and fertilizer inputs.
*   **Generative AI Scenarios:** Powered by Google Gemini (Mocked) to provide contextual, human-like strategy recommendations for drought and pest management.

### 📊 Precision Analytics
*   **Dynamic Dashboard:** Glassmorphic UI built with Framer Motion for high-impact data visualization.
*   **Smart Alerts:** Real-time notification system for soil health, water stress, and ROI optimization.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, TypeScript, Tailwind CSS, Framer Motion, Recharts, React-Leaflet |
| **Backend** | Python 3.10+, FastAPI, Uvicorn, Pydantic |
| **AI/ML Logic** | Simulated CNN+LSTM Models, Google Generative AI (Gen-AI) |
| **DevOps** | Vite, ESLint, PostCSS |

---

## 📦 Project Structure

```bash
AgriVision-AI/
├── backend/                # FastAPI Microservice
│   ├── main.py             # API Endpoints & ML Simulation Logic
│   └── requirements.txt    # Python Dependencies
├── frontend/               # React + TypeScript Frontend
│   ├── src/
│   │   ├── components/     # UI Components (Sidebar, Charts, Header)
│   │   ├── pages/          # View Layers (Dashboard, GIS Map, Simulator)
│   │   └── context/        # State Management
│   ├── tailwind.config.js  # Custom Design System
│   └── vite.config.ts      # Build Configuration
└── README.md               # Documentation
```

---

## 🚀 Getting Started

### Prerequisites
*   Node.js (v16+)
*   Python (v3.10+)
*   NPM or Yarn

### 1. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: .\venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```
*Backend runs at: `http://localhost:8000`*

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs at: `http://localhost:5173`*

---

## 🔌 API Reference

#### Simulate Crop Yield
```http
POST /api/v1/simulate
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `temperature` | `float` | Average seasonal temperature (°C) |
| `rainfall` | `float` | Monthly rainfall (mm) |
| `fertilizer` | `float` | Nitrogen/Phosphorus load (kg/ha) |

**Response Snippet:**
```json
{
  "predicted_yield_tons": 1056.23,
  "confidence_score": 0.94,
  "ai_insights": ["Drought warning. Activate precision drip irrigation protocol."]
}
```

---

## 🎨 UI Aesthetics
The platform features a **Glassmorphic Design System** with:
- **Translucent Sidebar:** Blurred backgrounds for a modern look.
- **Dynamic Gradients:** Visual cues for crop health status.
- **Micro-Animations:** Interactive hover states and smooth transitions.

---

## 📜 License
Distributed under the **MIT License**. See `LICENSE` for more information.

---

**Developed for the future of Precision Agriculture.** 🌾
