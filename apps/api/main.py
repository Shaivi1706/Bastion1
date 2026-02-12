"""
FastAPI application entry point.
Production-ready API with SSE support for analysis workflows.
"""
from contextlib import asynccontextmanager
from typing import AsyncGenerator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import analysis


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """Application lifespan: startup and shutdown hooks."""
    yield


def create_application() -> FastAPI:
    """Factory for the FastAPI application."""
    app = FastAPI(
        title="Data Dictionary API",
        description="Analysis API with Server-Sent Events streaming",
        version="1.0.0",
        lifespan=lifespan,
        docs_url="/docs",
        redoc_url="/redoc",
    )
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.include_router(analysis.router, prefix="/api", tags=["analysis"])

    @app.get("/health", tags=["health"])
    async def health() -> dict[str, str]:
        """Production health check."""
        return {"status": "ok"}

    return app


app = create_application()
