def summarize_symptoms(symptoms: str) -> str:
    """
    Very simple AI-like symptom summarizer
    """

    if not symptoms:
        return "No symptoms provided."

    symptoms = symptoms.lower()

    if "fever" in symptoms and "cough" in symptoms:
        return "Possible viral infection. Drink fluids and rest."

    if "headache" in symptoms:
        return "Likely headache/migraine. Avoid screen time."

    if "stomach" in symptoms or "vomit" in symptoms:
        return "Possible gastric issue."

    return "General symptoms recorded. Doctor will review."
