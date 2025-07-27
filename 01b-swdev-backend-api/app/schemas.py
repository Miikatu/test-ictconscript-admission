# schemas.py
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class LogEntryCreate(BaseModel):
    title: str = Field(..., max_length=120)
    body: str   
    lat: Optional[float]
    lon: Optional[float]
    isoTime: datetime = Field(default_factory=datetime.utcnow)