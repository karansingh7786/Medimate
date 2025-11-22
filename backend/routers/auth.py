from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from schemas import UserCreate, UserLogin
from models import User
from utils.hashing import Hash

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

@router.post("/signup")
def signup(request: UserCreate, db: Session = Depends(get_db)):

    # Check email exists
    existing = db.query(User).filter(User.email == request.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already exists")

    # Create new user
    new_user = User(
        name=request.name,
        email=request.email,
        password=Hash.bcrypt(request.password),
        role=request.role
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"status": "success", "user_id": new_user.id}


@router.post("/login")
def login(request: UserLogin, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.email == request.email).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if not Hash.verify(user.password, request.password):
        raise HTTPException(status_code=400, detail="Incorrect password")

    return {
        "status": "success",
        "user_id": user.id,
        "role": user.role
    }
