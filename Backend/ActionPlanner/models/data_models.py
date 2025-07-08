from sqlalchemy import (
    Column, Integer, String, Boolean, DateTime, ForeignKey,TIMESTAMP
)
from shared.base import Base
from sqlalchemy.orm import relationship

class Task(Base):
    __tablename__ = "tasks"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    completed = Column(Boolean, default=False, nullable=False)
    
    # Reminder on main task only
    reminder = Column(TIMESTAMP(timezone=True), nullable=True)
    reminder_email = Column(String, nullable=True)
    reminder_enabled = Column(Boolean, default=False, nullable=False)
    reminder_sent = Column(Boolean, default=False, nullable=False)

    # One-to-many relation with SubTask
    subtasks = relationship("SubTask", back_populates="task", cascade="all, delete-orphan")

class SubTask(Base):
    __tablename__ = "subtasks"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    task_id = Column(Integer, ForeignKey("tasks.id"), nullable=False)
    title = Column(String, nullable=False)
    completed = Column(Boolean, default=False, nullable=False)
    
    # Relationship back to parent task
    task = relationship("Task", back_populates="subtasks")
