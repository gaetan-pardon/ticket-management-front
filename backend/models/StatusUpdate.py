from pydantic import BaseModel
from models.StatusEnum import StatusEnum


class StatusUpdate(BaseModel):
    status: StatusEnum