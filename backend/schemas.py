from pydantic import BaseModel
from datetime import date, time

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    role: str

class UserLogin(BaseModel):
    email: str
    password: str

class ShowUser(BaseModel):
    id: int
    name: str
    email: str
    role: str

    class Config:
        orm_mode = True

class AppointmentCreate(BaseModel):
    patient_id: int
    doctor_id: int
    appointment_date: date
    appointment_time: time
    symptoms: str | None = None

class PrescriptionCreate(BaseModel):
    appointment_id: int
    diagnosis: str
    treatment: str
    medication: str
    dosage: str
    instructions: str
