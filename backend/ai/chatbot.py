from ai.predict import predict_disease
from ai.doctor_recommender import recommend_doctor


# simple symptom keywords mapping
symptom_keywords = {
    "fever": ["fever", "temperature", "hot body"],
    "cough": ["cough", "cold", "throat"],
    "headache": ["headache", "head pain", "migraine"],
    "fatigue": ["tired", "weak", "fatigue", "exhausted"]
}

def extract_symptoms(message: str):
    message = message.lower()
    detected = {}

    for feature, keywords in symptom_keywords.items():
        detected[feature] = 0  # default

        for word in keywords:
            if word in message:
                detected[feature] = 1

    return detected

def chatbot_reply(message: str):
    symptoms = extract_symptoms(message)

    if sum(symptoms.values()) == 0:
        return "Can you describe your symptoms? (e.g., fever, cough, fatigue)"

    disease = predict_disease(symptoms)
    specialist = recommend_doctor(disease)

    reply = (
        f"Based on what you described, you may have **{disease}**.\n\n"
        f"Recommended Doctor: **{specialist}**\n\n"
        "Advice:\n"
        "- Stay hydrated\n"
        "- Take proper rest\n"
        "- Avoid self-medication\n\n"
        "Would you like to book an appointment with a doctor?"
    )

    return reply

