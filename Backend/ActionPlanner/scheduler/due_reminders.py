from datetime import datetime, timezone,timedelta
from ActionPlanner.data_manager.sqlite_data_manager import get_session
from ActionPlanner.models.data_models import Task, SubTask
from sqlalchemy.orm import Session
from ActionPlanner.scheduler.email_utils import send_email 

def get_due_reminders(session: Session):
    now = datetime.now(timezone.utc)
    reminder_window = now + timedelta(minutes=30)
    tasks = session.query(Task).filter(
        Task.reminder_enabled == True,
        Task.reminder >= now - timedelta(minutes=5),  # 5-min grace for missed jobs
        Task.reminder <= reminder_window,
        Task.reminder_sent == False).all()
    return tasks

def run_due_reminders():
    print("🔔 run_due_reminders triggered", flush=True)
    session = next(get_session())
    try:
        tasks = get_due_reminders(session)
        for task in tasks:
          if task.reminder_email:
            subject = f"Reminder: {task.title}"
            body = f"Hi! Just a reminder for your task:\n\n{task.title}\n\n{task.description or ''}"
            try:
               send_email(task.reminder_email, subject, body)
               task.reminder_sent = True
               session.commit() 
               print(f" [✅] Reminder sent for task {task.id}",flush=True)
            except Exception as e:
               print(f" [❌] Failed to send email for task {task.id}: {str(e)}",flush=True)

    except Exception as e:
        print(f" [🔥] Unexpected error in run_due_reminders: {str(e)}",flush=True)

    finally:
        session.close()
