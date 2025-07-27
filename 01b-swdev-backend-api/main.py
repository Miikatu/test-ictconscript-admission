from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi import HTTPException
import logging

from app.schemas import LogEntryCreate
from app.database import create_db_and_tables
from app.crud import *

logging.basicConfig(level=logging.DEBUG)
app = FastAPI(docs_url="/docs")

create_db_and_tables()

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.get("/entries")
def read_entries():
    return get_entries()

@app.get("/entries/{entry_id}")
def read_entry(entry_id: int):
    entry = get_entry(entry_id)
    if not entry:
        raise HTTPException(status_code=404, detail="Entry not found")
    return entry

@app.post("/entries")
def post_entry(entry: LogEntryCreate):
    return create_entry(entry)

@app.get("/health")
def health():
    return JSONResponse(status_code=200, content="OK")
