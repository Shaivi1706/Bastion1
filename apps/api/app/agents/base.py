"""
Base and mock agent implementations.
"""
from abc import ABC, abstractmethod
from typing import Any


class BaseAgent(ABC):
    """Abstract base for analysis agents."""

    @abstractmethod
    async def run(self, context: dict[str, Any]) -> dict[str, Any]:
        """Run analysis on the given context. Returns agent result."""
        ...


class MockAnalysisAgent(BaseAgent):
    """Mock agent that simulates work and returns placeholder results."""

    async def run(self, context: dict[str, Any]) -> dict[str, Any]:
        """Simulate agent analysis. In production, would call LLM or analysis service."""
        return {
            "summary": "Mock analysis complete",
            "files_analyzed": len(context.get("files", [])),
            "recommendations": ["Add type hints", "Update README"],
        }
