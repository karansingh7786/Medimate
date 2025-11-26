import json
import os

# Get absolute path of current file
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Build correct path
DATA_PATH = os.path.join(BASE_DIR, "medicine_data.json")

# Load data
with open(DATA_PATH, "r") as f:
    MEDICINE_DATA = json.load(f)

def check_medicine(name: str):
    name = name.lower().strip()

    for med in MEDICINE_DATA:
        if med["name"].lower() == name:
            return med

    return None
