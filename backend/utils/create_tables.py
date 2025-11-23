from backend.database import Base, engine
import backend.models

print("Creating tables...")
Base.metadata.create_all(bind=engine)
print("Tables created successfully!")
