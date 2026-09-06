"""Strongly typed application configuration loaded from environment variables."""

from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    app_name: str = "Brand Presenter AI"
    app_env: str = "development"
    debug: bool = True
    api_version: str = "0.1.0"

    database_url: str = "sqlite:///./data/brand_presenter.db"

    jwt_secret_key: str = "dev-only-insecure-secret-change-me"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    refresh_token_expire_days: int = 14

    cors_origins: str = "http://localhost:3000,http://localhost:5173"

    ai_provider: str = "mock"
    gemini_api_key: str = ""
    openai_api_key: str = ""

    token_encryption_key: str = ""

    instagram_client_id: str = ""
    instagram_client_secret: str = ""
    youtube_client_id: str = ""
    youtube_client_secret: str = ""
    tiktok_client_id: str = ""
    tiktok_client_secret: str = ""

    # Data freshness thresholds, in hours.
    freshness_fresh_hours: int = 24
    freshness_recent_hours: int = 24 * 7
    freshness_stale_hours: int = 24 * 30

    # AI safety / cost controls.
    ai_max_input_chars: int = 4000
    ai_max_output_tokens: int = 1024
    ai_request_timeout_seconds: int = 30

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]

    @property
    def is_production(self) -> bool:
        return self.app_env.lower() == "production"


@lru_cache
def get_settings() -> Settings:
    return Settings()
