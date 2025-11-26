from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import date
from database import get_db
from models import User, Appointment
from schemas import AppointmentCreate
from ai.symptom_summary import summarize_symptoms
from ai.doctor_availablity import suggest_slot

router = APIRouter(
    prefix="/appointment",
    tags=["Appointment"]
)

# -----------------------------------------------------------
# 1️⃣ BOOK APPOINTMENT
# -----------------------------------------------------------
@router.post("/book")
def book_appointment(request: AppointmentCreate, db: Session = Depends(get_db)):

    # Check if patient exists
    patient = db.query(User).filter(User.id == request.patient_id).first()
    if not patient:
        raise HTTPException(404, "Patient not found")

    # Check if doctor exists
    doctor = db.query(User).filter(
        User.id == request.doctor_id,
        User.role == "doctor"
    ).first()
    if not doctor:
        raise HTTPException(404, "Doctor not found")

    # Prevent double booking
    existing = db.query(Appointment).filter(
        Appointment.doctor_id == request.doctor_id,
        Appointment.appointment_date == request.appointment_date,
        Appointment.appointment_time == request.appointment_time
    ).first()

    if existing:
        raise HTTPException(409, "This time slot is already booked")

    # Create new appointment
    new_appt = Appointment(
        patient_id=request.patient_id,
        doctor_id=request.doctor_id,
        appointment_date=request.appointment_date,
        appointment_time=request.appointment_time,
        symptoms=request.symptoms,
        status="Booked"
    )

    db.add(new_appt)
    db.commit()
    db.refresh(new_appt)

    return {
        "status": "success",
        "message": "Appointment booked successfully",
        "appointment_id": new_appt.id
    }


# -----------------------------------------------------------
# 2️⃣ PATIENT → MY APPOINTMENTS
# -----------------------------------------------------------
@router.get("/my-appointments/{patient_id}")
def get_my_appointments(patient_id: int, db: Session = Depends(get_db)):

    appointments = db.query(Appointment).filter(
        Appointment.patient_id == patient_id
    ).all()

    if not appointments:
        return {"appointments": []}

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

    return {"appointments": result}


# -----------------------------------------------------------
# 3️⃣ DOCTOR → TODAY’S APPOINTMENTS
# -----------------------------------------------------------
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

    return {"appointments": result}


# -----------------------------------------------------------
# 4️⃣ AI SUGGEST BEST SLOT FOR DOCTOR
# -----------------------------------------------------------
@router.get("/suggest-slot/{doctor_id}/{appointment_date}")
def suggest(doctor_id: int, appointment_date: str, db: Session = Depends(get_db)):

    appointments = db.query(Appointment).filter(
        Appointment.doctor_id == doctor_id,
        Appointment.appointment_date == appointment_date
    ).all()

    booked_times = [str(a.appointment_time) for a in appointments]

    best_slot = suggest_slot(booked_times)

    return {"best_slot": best_slot}


# -----------------------------------------------------------
# 5️⃣ AI SUMMARY FOR SYMPTOMS
# -----------------------------------------------------------
@router.get("/summary/{appointment_id}")
def summary(appointment_id: int, db: Session = Depends(get_db)):

    appt = db.query(Appointment).filter(Appointment.id == appointment_id).first()

    if not appt:
        raise HTTPException(404, "Appointment not found")

    summary = summarize_symptoms(appt.symptoms)

    return {"summary": summary}
