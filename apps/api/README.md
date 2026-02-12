# Data Dictionary API

Production-ready FastAPI backend with Server-Sent Events (SSE) for analysis workflows.

## Setup

```bash
cd apps/api
python -m venv .venv
source .venv/bin/activate   # or .venv\Scripts\activate on Windows
pip install -r requirements.txt
```

## Run

```bash
# From apps/api
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

- Docs: http://localhost:8000/docs  
- Health: http://localhost:8000/health  

## POST /api/analyze (SSE)

Streaming analysis endpoint. Request body:

```json
{
  "repo_url": "https://github.com/org/repo",
  "branch": "main"
}
```

Response: SSE stream of JSON events:

```json
{"stage": "cloning", "message": "Cloning repository...", "data": {}}
{"stage": "parsing", "message": "Scanning repository...", "data": {}}
{"stage": "agent_running", "message": "Running analysis agents...", "data": {}}
{"stage": "completed", "message": "Analysis completed successfully.", "data": {...}}
```

Stages: `cloning` → `parsing` → `agent_running` → `completed`.

## Layout

- `routers/` – HTTP endpoints  
- `services/` – clone, file extraction  
- `orchestrator/` – `AnalysisOrchestrator` (coordinates pipeline, streams events)  
- `agents/` – mock (and future) agents  
- `models/` – Pydantic schemas  
- `utils/` – SSE helpers  
