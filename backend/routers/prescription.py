from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Appointment, Prescription
from schemas import PrescriptionCreate
from utils.pdf_generator import generate_pdf
from ai.symptom_summary import summarize_symptoms

router = APIRouter(
    prefix="/prescription",
    tags=["Prescription"]
)

# ------------------------------------------------------------
# 1️⃣ Add Prescription  (Doctor Adds Prescription)
# ------------------------------------------------------------
@router.post("/add")
async def add_prescription(request: PrescriptionCreate, db: Session = Depends(get_db)):

    # 1. Check appointment exists
    appointment = db.query(Appointment).filter(
        Appointment.id == request.appointment_id
    ).first()

    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")

    # 2. Create Prescription
    new_prescription = Prescription(
        appointment_id=request.appointment_id,
        diagnosis=request.diagnosis,
        treatment=request.treatment,
        medication=request.medication,
        dosage=request.dosage,
        instructions=request.instructions
    )

    db.add(new_prescription)
    db.commit()
    db.refresh(new_prescription)

    # 3. Generate PDF
    pdf_path = generate_pdf(
        appointment_id=appointment.id,
        patient_name=appointment.patient.name,
        doctor_name=appointment.doctor.name,
        diagnosis=request.diagnosis,
        treatment=request.treatment,
        medication=request.medication,
        dosage=request.dosage,
        instructions=request.instructions
    )

    return {
        "status": "success",
        "message": "Prescription created successfully!",
        "prescription_id": new_prescription.id,
        "pdf_path": pdf_path
    }


# ------------------------------------------------------------
# 2️⃣ Get Prescription By Appointment
# ------------------------------------------------------------
@router.get("/get/{appointment_id}")
def get_prescription(appointment_id: int, db: Session = Depends(get_db)):

    presc = db.query(Prescription).filter(
        Prescription.appointment_id == appointment_id
    ).first()

    if not presc:
        raise HTTPException(404, "No prescription found")

    return {
        "appointment_id": presc.appointment_id,
        "diagnosis": presc.diagnosis,
        "treatment": presc.treatment,
        "medication": presc.medication,
        "dosage": presc.dosage,
        "instructions": presc.instructions
    }


# ------------------------------------------------------------
# 3️⃣ AI Summary of Symptoms
# ------------------------------------------------------------
@router.get("/summary/{appointment_id}")
def summary(appointment_id: int, db: Session = Depends(get_db)):

    appt = db.query(Appointment).filter(Appointment.id == appointment_id).first()

    if not appt:
        raise HTTPException(404, "Appointment not found")

    summary = summarize_symptoms(appt.symptoms)

    return {"summary": summary}
