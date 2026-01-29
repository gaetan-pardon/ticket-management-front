from pydantic import BaseModel
from models.StatusEnum import StatusEnum
from models.PriorityEnum import PriorityEnum

class TicketCreate(BaseModel):
   title: str
   description: str
   status: StatusEnum 
   tags: list[str]
   priority: PriorityEnum
   createdAt: str
   id: int