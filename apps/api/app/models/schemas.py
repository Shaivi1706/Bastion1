"""
Request/response and SSE event schemas.
"""
from enum import Enum
from typing import Any

from pydantic import BaseModel, Field


class StreamStage(str, Enum):
    """Allowed stages for the analysis stream."""

    CLONING = "cloning"
    PARSING = "parsing"
    AGENT_RUNNING = "agent_running"
    COMPLETED = "completed"


class StreamEvent(BaseModel):
    """Structured JSON event emitted over SSE."""

    stage: StreamStage = Field(..., description="Current pipeline stage")
    message: str = Field(..., description="Human-readable status message")
    data: dict[str, Any] = Field(default_factory=dict, description="Optional payload")

    model_config = {"frozen": True}


class AnalysisRequest(BaseModel):
    """Request body for POST /analyze."""

    repo_url: str = Field(..., min_length=1, description="Git repository URL to analyze")
    branch: str = Field(default="main", description="Branch to clone")

    model_config = {"frozen": True}
