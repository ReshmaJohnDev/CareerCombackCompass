from fastapi import FastAPI
from JobTracker.routes.job_routes import router as job_router
from GapGenerator.routes.gap_routes import router as gap_router
from Login.routes.login_routes import router as login_router
from fastapi.middleware.cors import CORSMiddleware
from ActionPlanner.routes.action_planner_route import router as action_planner
from ActionPlanner.scheduler.scheduler import start, shutdown



#Initializing the Fast API
app = FastAPI()
origins = [
    "https://career-comback-frontend.onrender.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # allow your frontend origin(s)
    allow_credentials=True,
    allow_methods=["*"],  # allow all HTTP methods
    allow_headers=["*"],  # allow all headers
)
# Register routes
app.include_router(job_router)
app.include_router(login_router)
app.include_router(gap_router)
app.include_router(action_planner)

@app.get("/")
def root():
    return {"message": "Career Comeback Compass App is running"}


@app.on_event("startup")
async def start_scheduler():
    start()

@app.on_event("shutdown")
async def shutdown_scheduler():
    shutdown()
