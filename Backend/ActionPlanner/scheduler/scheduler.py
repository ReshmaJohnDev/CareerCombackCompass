from apscheduler.schedulers.background import BackgroundScheduler
from ActionPlanner.scheduler.due_reminders import run_due_reminders

scheduler = BackgroundScheduler()

def start():
    print("✅ Scheduler starting.")
    scheduler.add_job(
        run_due_reminders,
        'interval',
        minutes=1,
        misfire_grace_time=300
    )
    scheduler.start()
    print("✅ Scheduler started.")

def shutdown():
    print("🛑 Shutting down scheduler...")
    scheduler.shutdown()
    print("✅ Scheduler shutdown complete.")
