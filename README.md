# AgriVision AI - Precision Farming Platform

AgriVision AI is an AI-driven Agricultural Decision Support System integrating Generative AI, Machine Learning, and Geospatial Data to help modern farmers optimize yield and reduce costs.

---

## 🎯 Features

- **Responsive Dashboard:** Built with React, TailwindCSS, and Framer Motion for a premium, card-based interface.
- **Geospatial Mapping:** Field health visualization using React-Leaflet with NDVI zone mapping.
- **Yield Prediction AI:** Hybrid Mock AI simulating CNN+LSTM for accurate yield projection vs actual limits.
- **Generative AI Scenarios:** Simulate changing climate conditions and see ML-recommended structural changes for your farms.
- **Cost Optimization Engine:** Reduce overhead on water, pesticide, and fertilizer with data-driven recommendations.
- **Real-time Smarts Alerts:** Automated insights predicting drought stress, nutrient deficiency, and ROI improvement.

---

## 🚀 Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Built-in custom UI with Framer Motion, Recharts, and React-Leaflet.
- **Backend:** Python + FastAPI (Mocks complex ML logic and Gen-AI scenario generation).
- **Tooling:** PostCSS, TypeScript, ESLint.

---

## 📦 Project Structure

```
.
├── backend                   # Python FastAPI Backend
│   ├── main.py               # Main API Application
│   └── requirements.txt      # Python Dependencies
├── frontend                  # Vite + React Frontend UI
│   ├── src
│   │   ├── components        # Reusable UI (Sidebar, Header)
│   │   ├── pages             # Page Views (Dashboard)
│   │   └── App.tsx           # Main Application Container
│   ├── index.html            # Entry HTML
│   ├── package.json          # NPM Dependencies
│   └── tailwind.config.js    # Tailwind Design Tokens
└── README.md
```

---

## 🛠️ Setup Instructions

### 1. Backend (FastAPI Layer)

Run the highly parallel mock AI engine:

```bash
cd backend
python -m venv venv

# Windows
.\venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload
```
API runs at `http://localhost:8000/`.

### 2. Frontend (React Layer)

Run the next-gen Glassmorphic UI:

```bash
cd frontend
npm install
npm run dev
```
UI available at `http://localhost:5173/`.

---

## 🔗 API Endpoints

### `GET /api/v1/health`
Check the health status of the ML models and microservice.

### `POST /api/v1/simulate`
Run complex hybrid model scenario to project yield, confidence scores, and get localized AI suggestions.

**Request Body:**
```json
{
  "temperature": 27.5,
  "rainfall": 80.0,
  "fertilizer": 110.0,
  "field_size": 200.0
}
```

**Response:**
```json
{
  "predicted_yield_tons": 1056.23,
  "confidence_score": 0.94,
  "rmse": 0.152,
  "ai_insights": [
    "Drought warning. Activate precision drip irrigation protocol.",
     "Optimal growing conditions detected. Proceed with standard scheduled maintenance."
  ],
  "optimized_cost_savings_usd": 12530.40
}
```

---

*AgriVision AI is built for the precision agriculture portfolios of tomorrow.*
