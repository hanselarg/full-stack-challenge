from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import random

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Project model
class Project(BaseModel):
    id: int
    name: str
    type: str
    latitude: float
    longitude: float

# Sample data
projects = [
    Project(
        id=1,
        name="Solar Farm Alpha",
        type="solar",
        latitude=40.7128,
        longitude=-74.0060
    ),
    Project(
        id=2,
        name="Wind Farm Beta",
        type="wind",
        latitude=34.0522,
        longitude=-118.2437
    ),
    Project(
        id=3,
        name="Hydro Plant Gamma",
        type="hydroelectric",
        latitude=47.6062,
        longitude=-122.3321
    ),
]

@app.get("/api/projects", response_model=List[Project])
async def get_projects(project_type: Optional[str] = None):
    if project_type:
        filtered_projects = [p for p in projects if p.type.lower() == project_type.lower()]
        return filtered_projects
    return projects

@app.get("/api/projects/{project_id}", response_model=Project)
async def get_project(project_id: int):
    project = next((p for p in projects if p.id == project_id), None)
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 