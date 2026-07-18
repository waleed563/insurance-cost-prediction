from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import joblib

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load("model/insurance_model.pkl")
encoders = joblib.load("model/encoders.pkl")

class InsuranceInput(BaseModel):
    age: int
    sex: str
    bmi: float
    children: int
    smoker: str
    region: str

@app.post("/predict")
def predict(data: InsuranceInput):
    features = np.array([[
        data.age,
        encoders['sex'].transform([data.sex])[0],
        data.bmi,
        data.children,
        encoders['smoker'].transform([data.smoker])[0],
        encoders['region'].transform([data.region])[0],
    ]])
    log_pred = model.predict(features)[0]
    real_cost = np.expm1(log_pred)
    return {"predicted_charges": round(float(real_cost), 2)}