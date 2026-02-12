"""
File extraction service: discover and read relevant files from a repo path.
"""
import asyncio
from pathlib import Path
from typing import Any

# Simulated list of extracted file metadata
EXTRACTED_FILES: list[dict[str, Any]] = [
    {"path": "src/main.py", "language": "python", "size": 1024},
    {"path": "src/utils.py", "language": "python", "size": 512},
    {"path": "README.md", "language": "markdown", "size": 256},
]


async def extract_files(repo_path: str) -> list[dict[str, Any]]:
    """
    Simulate extracting file list and metadata from a repository path.
    In production: walk directory, filter by extension, read content.
    """
    await asyncio.sleep(1.5)  # Simulate filesystem scan
    return EXTRACTED_FILES.copy()
