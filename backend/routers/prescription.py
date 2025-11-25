from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Appointment, Prescription
from schemas import PrescriptionCreate
from utils.pdf_generator import generate_pdf
#from utils.email_sender import send_prescription_email

router = APIRouter(
    prefix="/prescription",
    tags=["Prescription"]
)

@router.post("/add")
async def add_prescription(request: PrescriptionCreate, db: Session = Depends(get_db)):

    # 1️⃣ Check appointment exists
    appointment = db.query(Appointment).filter(
        Appointment.id == request.appointment_id
    ).first()

    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")

    # 2️⃣ Create Prescription entry
    new_prescription = Prescription(
        record_id=None,  # If you add medical record later, update this
        medication=request.medication,
        dosage=request.dosage,
        instructions=request.instructions
    )

    db.add(new_prescription)
    db.commit()
    db.refresh(new_prescription)

    # 3️⃣ Generate the PDF using our new template
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
        "message": "Prescription generated and emailed to patient",
        "pdf_path": pdf_path
    }
