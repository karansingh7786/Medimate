from fastapi import FastAPI
from database import Base, engine
from routers import auth, user

# Create all database tables
Base.metadata.create_all(bind=engine)

# FastAPI application instance
app = FastAPI()

# Include Routers
app.include_router(auth.router)
app.include_router(user.router)

@app.get("/")
def home():
    return {"message": "Medimate Backend Running!"}

