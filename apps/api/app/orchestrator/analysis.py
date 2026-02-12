"""
AnalysisOrchestrator: coordinates clone -> extract -> agents -> stream.
Streams structured SSE events at each stage.
"""
import asyncio
from typing import Any, AsyncGenerator

from app.agents.base import MockAnalysisAgent
from app.models.schemas import StreamEvent, StreamStage
from app.services.clone import clone_repository
from app.services.extractor import extract_files
from app.utils.sse import make_event


class AnalysisOrchestrator:
    """
    Coordinates the full analysis pipeline and streams progress via SSE.
    """

    def __init__(self) -> None:
        self._agent = MockAnalysisAgent()

    async def run(
        self,
        repo_url: str,
        branch: str = "main",
    ) -> AsyncGenerator[StreamEvent, None]:
        """
        Execute the pipeline and yield SSE events for each stage.
        1. Clone repo
        2. Extract files
        3. Send context to agents (mock)
        4. Stream responses and complete
        """
        # Stage: cloning
        yield make_event(StreamStage.CLONING, "Cloning repository...")
        await asyncio.sleep(0.8)
        repo_path = await clone_repository(repo_url, branch)
        yield make_event(
            StreamStage.CLONING,
            "Repository cloned successfully.",
            data={"repo_path": repo_path},
        )

        # Stage: parsing
        yield make_event(StreamStage.PARSING, "Scanning repository...")
        await asyncio.sleep(0.5)
        yield make_event(StreamStage.PARSING, "Extracting files...")
        files = await extract_files(repo_path)
        yield make_event(
            StreamStage.PARSING,
            f"Found {len(files)} files to analyze.",
            data={"files": files},
        )

        # Stage: agent_running
        yield make_event(StreamStage.AGENT_RUNNING, "Running analysis agents...")
        await asyncio.sleep(1.0)
        context: dict[str, Any] = {"repo_path": repo_path, "files": files}
        result = await self._agent.run(context)
        yield make_event(
            StreamStage.AGENT_RUNNING,
            "Agent analysis finished.",
            data=result,
        )

        # Stage: completed
        yield make_event(
            StreamStage.COMPLETED,
            "Analysis completed successfully.",
            data={"result": result},
        )
