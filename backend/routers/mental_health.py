from fastapi import APIRouter
from ai.mental_health import analyze_mental_health

router = APIRouter(prefix="/mental-health", tags=["Mental Health AI"])

@router.post("/analyze")
def analyze(text: dict):
    user_input = text.get("text", "")
    result = analyze_mental_health(user_input)
    return {"analysis": result}
