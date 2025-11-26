from fastapi import FastAPI
from database import Base, engine
from routers import auth, user ,appointment , prescription
from routers import ai, chatbot,fake_medicine,mental_health




#from routers import appointment


# Create all database tables
Base.metadata.create_all(bind=engine)

# FastAPI application instance
app = FastAPI()

# Include Routers
app.include_router(auth.router)
app.include_router(user.router)
app.include_router(appointment.router)
app.include_router(prescription.router)
app.include_router(ai.router)
app.include_router(chatbot.router)
app.include_router(fake_medicine.router)
app.include_router(mental_health.router)
@app.get("/")
def home():
    return {"message": "Medimate Backend Running!"}