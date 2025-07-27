# schemas.py
from pydantic import BaseModel, Field
from typing import Optional

class LogEntryCreate(BaseModel):
    title: str = Field(..., max_length=120)
    body: str
    lat: Optional[float]
    lon: Optional[float]