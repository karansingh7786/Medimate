from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db

from models import User

router = APIRouter(
    prefix="/user",
    tags=["Users"]
)

@router.get("/get-doctors")
def get_doctors(db: Session = Depends(get_db)):
    doctors = db.query(User).filter(User.role == "doctor").all()

    # Convert SQLAlchemy objects to safe dict
    return [
        {
            "id": d.id,
            "name": d.name,
            "email": d.email,
            "role": d.role
        }
        for d in doctors
    ]
