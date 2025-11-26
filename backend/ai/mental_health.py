import re

def analyze_mental_health(text: str):
    text = text.lower()

    depression_keywords = ["sad", "hopeless", "tired", "worthless", "sleep", "lost interest", "cry"]
    anxiety_keywords = ["stress", "panic", "worry", "fear", "nervous", "pressure"]
    stress_keywords = ["overload", "tension", "angry", "burnout", "irritated"]

    score = {"depression": 0, "anxiety": 0, "stress": 0}

    for word in depression_keywords:
        if word in text:
            score["depression"] += 1

    for word in anxiety_keywords:
        if word in text:
            score["anxiety"] += 1

    for word in stress_keywords:
        if word in text:
            score["stress"] += 1

    result = max(score, key=score.get)

    if score[result] == 0:
        return "No mental health issues detected. Stay positive 💙"

    return f"Possible {result.capitalize()} detected. Please consult a specialist."
