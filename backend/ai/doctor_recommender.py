disease_doctor_map = {
    "Flu": "General Physician",
    "Common Cold": "General Physician",
    "Migraine": "Neurologist",
    "Covid": "General Physician",
    "Pneumonia": "Pulmonologist",
    "Dengue": "General Physician",
    "Malaria": "General Physician",
    "Anxiety": "Psychologist",
    "Depression": "Psychiatrist",
    "Skin Infection": "Dermatologist",
    "Food Poisoning": "Gastroenterologist",
}

def recommend_doctor(disease: str):
    return disease_doctor_map.get(disease, "General Physician")
