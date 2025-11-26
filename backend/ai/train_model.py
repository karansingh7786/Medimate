import pandas as pd
import pickle
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

# Dummy dataset
data = {
    "fever": [1, 0, 1, 0, 1],
    "cough": [1, 1, 0, 0, 1],
    "headache": [0, 1, 1, 0, 1],
    "fatigue": [1, 0, 1, 1, 0],
    "disease": ["Flu", "Common Cold", "Migraine", "Fatigue", "Flu"]
}

df = pd.DataFrame(data)

X = df.drop("disease", axis=1)
y = df["disease"]

# Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Save model correctly
with open("ai/disease_model.pkl", "wb") as f:
    pickle.dump(model, f)

print("Model training complete! disease_model.pkl saved.")
