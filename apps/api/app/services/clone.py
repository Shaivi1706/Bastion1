"""
Repository cloning service.
In production, would use git clone; here we simulate with asyncio.
"""
import asyncio


async def clone_repository(repo_url: str, branch: str) -> str:
    """
    Simulate cloning a git repository.
    In production: subprocess or GitPython to clone repo.
    """
    await asyncio.sleep(1.2)  # Simulate clone time
    # In production: subprocess or GitPython to clone repo
    return f"/tmp/repos/{repo_url.replace('/', '_')}"
