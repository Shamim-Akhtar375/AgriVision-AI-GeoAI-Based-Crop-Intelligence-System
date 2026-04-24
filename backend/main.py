from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random
import google.generativeai as genai
import json

genai.configure(api_key="AIzaSyDFyDZg-nUKia7tUqGUS8VMjQn803NQE4w")
gemini_model = genai.GenerativeModel('gemini-1.5-flash')

app = FastAPI(title="AgriVision AI API", description="AI layer for Agricultural Decision Support System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ScenarioRequest(BaseModel):
    temperature: float
    rainfall: float
    fertilizer: float
    field_size: float

class GeospatialRequest(BaseModel):
    latitude: float
    longitude: float

@app.get("/")
def read_root():
    return {"message": "AgriVision AI API is running."}

@app.get("/api/v1/health")
def check_health():
    return {"status": "healthy", "model_version": "v1.2.4-ai-hybrid"}

@app.post("/api/v1/scenario")
async def run_scenario_simulation(request: ScenarioRequest):
    # Simulated Physics-based Model
    # Yield calculation logic: 
    # - Ideal temp: 25-30C
    # - Ideal rainfall: 100-150mm
    # - Ideal fertilizer: 150kg/ha
    
    temp_factor = 1.0 - (abs(request.temperature - 27) / 20)
    rain_factor = 1.0 - (abs(request.rainfall - 120) / 100)
    fert_factor = 0.5 + (request.fertilizer / 300)
    
    base_yield = 5.0 # Tons per hectare
    predicted_yield = base_yield * temp_factor * rain_factor * fert_factor * (request.field_size / 200)
    
    cost_per_ha = 500 + (request.fertilizer * 2.5)
    estimated_cost = cost_per_ha * (request.field_size / 200)
    
    efficiency_score = (predicted_yield * 1000) / (estimated_cost + 1) * 10
    risk_level = "High" if request.temperature > 38 or request.rainfall < 20 else "Moderate" if request.temperature > 32 or request.rainfall < 50 else "Low"
    
    prompt = f"""
    Act as an expert Agricultural AI. Based on these parameters:
    - Temperature: {request.temperature}C
    - Rainfall: {request.rainfall}mm
    - Fertilizer: {request.fertilizer}kg/ha
    - Field Size: {request.field_size}ha
    
    Predicted Yield: {predicted_yield:.2f} Tons
    Risk Level: {risk_level}
    
    Provide a concise, professional 1-sentence agricultural insight and a short recommendation.
    Format as JSON: {{"insight": "...", "recommendation": "..."}}
    """
    
    try:
        response = gemini_model.generate_content(prompt)
        ai_data = json.loads(response.text.replace('```json', '').replace('```', ''))
    except:
        ai_data = {
            "insight": "Parameters suggest stable growth conditions with minor heat stress.",
            "recommendation": "Consider increasing irrigation to offset temperature peaks."
        }
    
    return {
        "predicted_yield": round(predicted_yield, 2),
        "estimated_cost": round(estimated_cost, 2),
        "efficiency_score": min(100, round(efficiency_score, 1)),
        "risk_level": risk_level,
        "ai_insight": ai_data["insight"],
        "ai_recommendation": ai_data["recommendation"]
    }

@app.post("/api/v1/simulate")
def simulate_geospatial(request: GeospatialRequest):
    lat_seed = abs(int(request.latitude * 100)) % 100
    lng_seed = abs(int(request.longitude * 100)) % 100
    
    health_score = 60 + (lat_seed % 40)
    soil_moisture = 20 + (lng_seed % 60)
    temperature = 22 + (lat_seed % 10)
    rainfall = 40 + (lng_seed % 100)
    predicted_yield = 4 + (health_score / 20)
    
    insights = [
        "Nitrogen levels are optimal in this sector. Maintain current fertilization schedule.",
        "Detected slight water stress. Increase irrigation frequency by 10%.",
        "Pest activity predicted in 48 hours. Consider preventive organic spray.",
        "Soil temperature is perfect for seed germination in this zone.",
        "NDVI scan shows robust biomass growth. Projected harvest in 3 weeks."
    ]
    
    ai_insight = random.choice(insights)
    
    return {
        "predicted_yield": round(predicted_yield, 2),
        "soil_moisture": soil_moisture,
        "temperature": temperature,
        "rainfall": rainfall,
        "health_score": health_score,
        "ai_insight": ai_insight
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
