# scheduler.py
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from ActionPlanner.scheduler.due_reminders import run_due_reminders

scheduler = AsyncIOScheduler()


def start_scheduler():
    print("✅ Scheduler starting.", flush=True)
    try:
        scheduler.add_job(
            run_due_reminders,
            'interval',
            minutes=1,
            misfire_grace_time=300
        )
        scheduler.start()
        print("✅ Scheduler started.", flush=True)
    except Exception as e:
        print(f"Scheduler start failed: {e}", flush=True)

def shutdown_scheduler():
    print("🛑 Shutting down scheduler...", flush=True)
    scheduler.shutdown()
    print("✅ Scheduler shutdown complete.", flush=True)
