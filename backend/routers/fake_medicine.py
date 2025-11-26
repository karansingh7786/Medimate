from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ai.fake_medicine_detector import check_medicine

router = APIRouter(
    prefix="/ai",
    tags=["Fake Medicine"]
)

class MedicineRequest(BaseModel):
    name: str

@router.post("/fake-medicine")
def detect_fake_medicine(request: MedicineRequest):

    result = check_medicine(request.name)

    if result is None:
        raise HTTPException(status_code=404, detail="Medicine not found")

    return {
        "status": "success",
        "medicine": request.name,
        "is_fake": result["is_fake"],
        "manufacturer": result.get("manufacturer", "Unknown"),
        "alternatives": result.get("alternatives", [])
    }
