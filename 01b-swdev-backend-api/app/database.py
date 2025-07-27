from sqlmodel import SQLModel, create_engine

sqlite_file_name = "logs.db"
engine = create_engine(f"sqlite:///{sqlite_file_name}", echo=True)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)
