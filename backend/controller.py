from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from script import count_status, read_json_file, write_json_file, delete_ticket_by_id, update_json_ticket_status
from pydantic import BaseModel
from enum import Enum

origins= [
   "http://localhost:5173"
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PriorityEnum(Enum):
    low = "Low"
    medium = "Medium"
    high = "High"

class StatusEnum(Enum):
    InProgress = "In Progress"
    open = "Open"
    closed = "Closed"

class TicketCreate(BaseModel):
   title: str
   description: str
   status: StatusEnum 
   tags: list[str]
   priority: PriorityEnum
   createdAt: str
   id: int

# GET endpoints
@app.get("/tickets")
async def root():
   return read_json_file()

@app.get("/tickets/count-status")
async def count_status_endpoint():
    return count_status()

# DELETE endpoints
@app.delete("/tickets/{id}")
async def delete_ticket(id: int):
   return delete_ticket_by_id(id)

# POST endpoints
@app.post("/tickets")
async def create_ticket(ticket: TicketCreate):
    return write_json_file(ticket)

# PATCH endpoints
@app.patch("/tickets/{id}")
async def update_ticket_status(id: int, status: StatusEnum):
   print(status)
   return update_json_ticket_status(id, status.value)