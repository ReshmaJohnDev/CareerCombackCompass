# scheduler.py
from apscheduler.schedulers.asyncio import AsyncIOScheduler

scheduler = AsyncIOScheduler()

def dummy_job():
    print("Dummy job triggered", flush=True)

def start_scheduler():
    print("✅ Scheduler starting.", flush=True)
    scheduler.add_job(dummy_job, 'interval', seconds=10, misfire_grace_time=300)
    scheduler.start()
    print("✅ Scheduler started.", flush=True)

def shutdown_scheduler():
    print("🛑 Shutting down scheduler...", flush=True)
    scheduler.shutdown()
    print("✅ Scheduler shutdown complete.", flush=True)
