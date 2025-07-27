# models.py
from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime

class LogEntry(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    body: str
    lat: Optional[float]
    lon: Optional[float]
    isoTime: str


