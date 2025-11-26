from fastapi import APIRouter
from ai.predict import predict_disease

router = APIRouter(
    prefix="/ai",
    tags=["AI Disease Predictor"]
)

@router.post("/predict")
def ai_predict(symptoms: dict):
    result = predict_disease(symptoms)
    return {
        "prediction": result,
        "message": f"Based on symptoms, likely disease is: {result}"
    }
