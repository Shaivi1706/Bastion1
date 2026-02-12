"""
SSE utilities: event serialization for streaming.
"""
from typing import Any

from app.models.schemas import StreamEvent, StreamStage


def format_sse_event(event: StreamEvent) -> str:
    """Format a StreamEvent as an SSE data line (JSON)."""
    return f"data: {event.model_dump_json()}\n\n"


def make_event(stage: StreamStage, message: str, data: dict[str, Any] | None = None) -> StreamEvent:
    """Build a typed StreamEvent."""
    return StreamEvent(stage=stage, message=message, data=data or {})
