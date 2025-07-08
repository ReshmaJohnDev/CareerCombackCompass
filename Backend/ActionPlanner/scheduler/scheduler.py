from apscheduler.schedulers.background import BackgroundScheduler
from ActionPlanner.scheduler.due_reminders import run_due_reminders

scheduler = AsyncIOScheduler()

def dummy_job():
    print("Dummy job triggered")

def start():
    print("✅ Scheduler starting.")
    try:
        scheduler.add_job(
            dummy_job,
            'interval',
            minutes=1,
            misfire_grace_time=300
        )
        scheduler.start()
        print("✅ Scheduler started.")
    except Exception as e:
        print(f"Scheduler start failed: {e}")


def shutdown():
    print("🛑 Shutting down scheduler...")
    scheduler.shutdown()
    print("✅ Scheduler shutdown complete.")
