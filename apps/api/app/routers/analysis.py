"""
Analysis router: POST /analyze with SSE streaming.
"""
from typing import AsyncGenerator

from fastapi import APIRouter, Depends
from sse_starlette.sse import EventSourceResponse

from app.models.schemas import AnalysisRequest
from app.orchestrator.analysis import AnalysisOrchestrator

router = APIRouter()


def get_orchestrator() -> AnalysisOrchestrator:
    """Dependency: provide a fresh orchestrator per request."""
    return AnalysisOrchestrator()


async def stream_analysis_events(
    repo_url: str,
    branch: str,
    orchestrator: AnalysisOrchestrator,
) -> AsyncGenerator[dict[str, str], None]:
    """
    Async generator that yields SSE-formatted dicts for EventSourceResponse.
    Each yield is one SSE message with JSON data.
    """
    async for event in orchestrator.run(repo_url=repo_url, branch=branch):
        yield {"data": event.model_dump_json()}


@router.post(
    "/analyze",
    response_class=EventSourceResponse,
    summary="Run analysis with SSE streaming",
    description="Starts repository analysis and streams progress events (cloning, parsing, agent_running, completed).",
)
async def analyze(
    request: AnalysisRequest,
    orchestrator: AnalysisOrchestrator = Depends(get_orchestrator),
) -> EventSourceResponse:
    """
    POST /analyze: stream structured JSON events over SSE.
    Event shape: { "stage": "indexing" | "cloning" | "parsing" | "agent_running" | "completed", "message": "...", "data": {} }
    """
    return EventSourceResponse(
        stream_analysis_events(
            repo_url=request.repo_url,
            branch=request.branch,
            orchestrator=orchestrator,
        )
    )
