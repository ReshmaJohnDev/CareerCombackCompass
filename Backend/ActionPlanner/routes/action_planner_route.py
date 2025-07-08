from fastapi import APIRouter, Depends, HTTPException, Query,status
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import date,timezone
from ..schema.pydantic_models  import TaskCreate, TaskRead, SubTaskCreate,TaskUpdate,SubTaskRead
from ..models.data_models import Task, SubTask
from ..data_manager.sqlite_data_manager import get_session
from sqlalchemy.exc import IntegrityError


router = APIRouter(
    prefix="/tasks",
    tags=["Action Planner"]
)


@router.post("/", response_model=TaskRead, status_code=status.HTTP_201_CREATED)
def create_task(task_in: TaskCreate, db: Session = Depends(get_session)):
    reminder = task_in.reminder
    if reminder:
        # If the incoming datetime is naive (no tzinfo), assume UTC (or your desired timezone)
        if reminder.tzinfo is None:
            reminder = reminder.replace(tzinfo=timezone.utc)
        else:
            # Convert to UTC timezone if not already
            reminder = reminder.astimezone(timezone.utc)


    task = Task(
        title=task_in.title,
        description=task_in.description,
        completed=task_in.completed,
        reminder=reminder,
        reminder_email=str(task_in.reminder_email) if task_in.reminder_email else None,
        reminder_enabled=task_in.reminder_enabled,
    )
    db.add(task)
    db.flush()  # To get task.id before adding subtasks

    for subtask_in in task_in.subtasks:
        subtask = SubTask(
            title=subtask_in.title,
            completed=subtask_in.completed,
            task=task,
        )
        db.add(subtask)

    db.commit()
    db.refresh(task)
    return task

# Get all tasks
@router.get("/", response_model=List[TaskRead])
def read_tasks(skip: int = 0, limit: int = 100, db: Session = Depends(get_session)):
    tasks = db.query(Task).offset(skip).limit(limit).all()
    return tasks

# Get task by ID
@router.get("/{task_id}", response_model=TaskRead)
def read_task(task_id: int, db: Session = Depends(get_session)):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

# Update task completion status
@router.patch("/{task_id}/complete", response_model=TaskRead)
def update_task_completion(task_id: int, completed: bool, db: Session = Depends(get_session)):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    task.completed = completed
    db.commit()
    db.refresh(task)
    return task


 # Update subtask completion status
@router.patch("/subtasks/{subtask_id}/complete", response_model=SubTaskRead)
def update_subtask_completion(subtask_id: int, completed: bool, db: Session = Depends(get_session)):
    subtask = db.query(SubTask).filter(SubTask.id == subtask_id).first()
    if not subtask:
        raise HTTPException(status_code=404, detail="Subtask not found")
    subtask.completed = completed
    db.commit()
    db.refresh(subtask)
    return subtask


# Delete a task (and cascade delete subtasks)
@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(task_id: int, db: Session = Depends(get_session)):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(task)
    db.commit()
    return

@router.put("/{task_id}", response_model=TaskRead)
def update_task(task_id: int, task_in: TaskUpdate, db: Session = Depends(get_session)):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    # Handle reminder datetime with timezone awareness if present in update
    if task_in.reminder is not None:
        reminder = task_in.reminder
        if reminder.tzinfo is None:
            reminder = reminder.replace(tzinfo=timezone.utc)
        else:
            reminder = reminder.astimezone(timezone.utc)
        setattr(task, "reminder", reminder)

    # Update main task fields
    for field, value in task_in.dict(exclude_unset=True).items():
        if field != "subtasks":
            setattr(task, field, value)

    # Update subtasks
    if task_in.subtasks is not None:
        existing_subtasks = {sub.id: sub for sub in task.subtasks}

        updated_ids = set()
        for subtask_data in task_in.subtasks:
            if subtask_data.id is not None and subtask_data.id in existing_subtasks:
                # Update existing subtask
                sub = existing_subtasks[subtask_data.id]
                if subtask_data.title is not None:
                    sub.title = subtask_data.title
                if subtask_data.completed is not None:
                    sub.completed = subtask_data.completed
                updated_ids.add(sub.id)
            else:
                # Add new subtask
                new_sub = SubTask(
                    title=subtask_data.title,
                    completed=subtask_data.completed or False,
                    task_id=task.id
                )
                db.add(new_sub)

        # Delete subtasks not included in update
        for sub_id in existing_subtasks:
            if sub_id not in updated_ids:
                db.delete(existing_subtasks[sub_id])

    db.commit()
    db.refresh(task)
    return task
