from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from datetime import date, time
from models import User, Appointment
from schemas import AppointmentCreate

router = APIRouter(
    prefix="/appointment",
    tags=["Appointment"]
)

@router.post("/book")
def book_appointment(request: AppointmentCreate, db: Session = Depends(get_db)):

    # 1️⃣ Check if patient exists
    patient = db.query(User).filter(User.id == request.patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")

    # 2️⃣ Check if doctor exists
    doctor = db.query(User).filter(User.id == request.doctor_id, User.role == "doctor").first()
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found or not a doctor")

    # 3️⃣ Prevent double booking (same doctor, date, time)
    existing = db.query(Appointment).filter(
        Appointment.doctor_id == request.doctor_id,
        Appointment.appointment_date == request.appointment_date,
        Appointment.appointment_time == request.appointment_time
    ).first()

    if existing:
        raise HTTPException(status_code=409, detail="This time slot is already booked")

    # 4️⃣ Create new appointment
    new_appointment = Appointment(
        patient_id=request.patient_id,
        doctor_id=request.doctor_id,
        appointment_date=request.appointment_date,
        appointment_time=request.appointment_time,
        symptoms=request.symptoms,
        status="Booked"
    )

    db.add(new_appointment)
    db.commit()
    db.refresh(new_appointment)

    return {
        "status": "success",
        "message": "Appointment booked successfully",
        "appointment_id": new_appointment.id
    }

@router.get("/my-appointments/{patient_id}")
def get_my_appointments(patient_id: int, db: Session = Depends(get_db)):
    appointments = db.query(Appointment).filter(
        Appointment.patient_id == patient_id
    ).all()

    if not appointments:
        return {"status": "success", "appointments": []}

    result = []

    for appt in appointments:
        result.append({
            "appointment_id": appt.id,
            "doctor_name": appt.doctor.name,
            "date": appt.appointment_date,
            "time": appt.appointment_time,
            "symptoms": appt.symptoms,
            "status": appt.status
        })

    return {"status": "success", "appointments": result}
@router.get("/today-appointments/{doctor_id}")
def today_appointments(doctor_id: int, db: Session = Depends(get_db)):

    today = date.today()

    appointments = db.query(Appointment).filter(
        Appointment.doctor_id == doctor_id,
        Appointment.appointment_date == today
    ).all()

    result = []

    for appt in appointments:
        result.append({
            "appointment_id": appt.id,
            "patient_name": appt.patient.name,
            "time": appt.appointment_time,
            "symptoms": appt.symptoms
        })

    return {"status": "success", "appointments": result}
