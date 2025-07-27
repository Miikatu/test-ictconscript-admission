#!!! This is used for test purpeses for the initial sample-data dump !!!
import json
from sqlmodel import Session
from app.models import LogEntry
from app.database import engine
from datetime import datetime
from app.database import create_db_and_tables

create_db_and_tables()

with open("../sample-data/data.json", "r") as f:
    data = json.load(f)

with Session(engine) as session:
    for entry in data:
        log = LogEntry(
            id=entry["id"],
            title=entry["title"],
            body=entry["body"],
            lat=entry.get("lat"),
            lon=entry.get("lon"),
            isoTime=entry.get("isoTime") or datetime.utcnow().isoformat()
        )
        session.add(log)
    session.commit()

print("✅ Seeded log entries into the database.")
