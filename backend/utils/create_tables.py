from backend.database import Base, engine

print("Creating tables...")
Base.metadata.create_all(bind=engine)
print("Tables created successfully!")
from backend.models import Prescription
Prescription.__table__.create(bind=engine, checkfirst=True)
print("Prescription table created successfully!")