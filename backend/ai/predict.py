import pickle
import numpy as np

# Load model once
with open("ai/disease_model.pkl", "rb") as f:
    model = pickle.load(f)

feature_order = ["fever", "cough", "headache", "fatigue"]

def predict_disease(symptoms: dict):
    input_data = [symptoms.get(f, 0) for f in feature_order]
    prediction = model.predict([input_data])[0]
    return prediction
