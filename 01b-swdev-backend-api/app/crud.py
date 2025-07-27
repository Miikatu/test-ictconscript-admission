from sqlmodel import Session, select
from app.models import LogEntry
from app.database import engine
from datetime import datetime

def get_entries():
    with Session(engine) as session:
        return session.exec(select(LogEntry).order_by(LogEntry.id.desc())).all()

def get_entry(entry_id: int):
    with Session(engine) as session:
        return session.get(LogEntry, entry_id)

def create_entry(data):
    with Session(engine) as session:
        entry = LogEntry(**data.dict(), isoTime=datetime.utcnow().isoformat())
        session.add(entry)
        session.commit()
        session.refresh(entry)
        return entry
