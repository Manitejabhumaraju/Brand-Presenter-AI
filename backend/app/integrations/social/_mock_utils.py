"""Deterministic pseudo-random demo data generation shared by every mock adapter.

Seeding by username keeps a given demo account's numbers stable across repeated syncs (so the
UI doesn't show numbers jumping around on every refresh) while still varying between accounts.
"""

import hashlib
import random
from datetime import UTC, datetime, timedelta


def seeded_random(username: str, salt: str = "") -> random.Random:
    seed = int(hashlib.sha256(f"{username}:{salt}".encode()).hexdigest(), 16) % (2**32)
    return random.Random(seed)


def demo_content_items(
    username: str, platform: str, content_type: str, limit: int, *, base_url: str
) -> list[dict]:
    rng = seeded_random(username, f"content:{platform}")
    now = datetime.now(UTC)
    items = []
    for i in range(limit):
        views = rng.randint(5_000, 500_000)
        engagement_rate = round(rng.uniform(1.5, 9.5), 2)
        items.append(
            {
                "external_content_id": f"{platform}-{username}-{i}",
                "content_url": f"{base_url}/{username}/{i}",
                "content_type": content_type,
                "published_at": now - timedelta(days=i * 3 + rng.randint(0, 2)),
                "views": views,
                "reach": int(views * rng.uniform(0.8, 1.1)),
                "likes": int(views * (engagement_rate / 100) * rng.uniform(0.6, 0.9)),
                "comments": int(views * (engagement_rate / 100) * rng.uniform(0.02, 0.08)),
                "shares": int(views * (engagement_rate / 100) * rng.uniform(0.05, 0.15)),
                "engagement_rate": engagement_rate,
            }
        )
    return items


def demo_audience(
    username: str,
    platform: str,
    *,
    countries: bool,
    ages: bool,
    genders: bool,
) -> dict[str, list[dict]]:
    rng = seeded_random(username, f"audience:{platform}")

    def split(labels: list[str]) -> list[dict]:
        raw = [rng.uniform(1, 10) for _ in labels]
        total = sum(raw)
        return [
            {"label": label, "percentage": round(v / total * 100, 1)}
            for label, v in zip(labels, raw, strict=True)
        ]

    result: dict[str, list[dict]] = {
        "countries": [],
        "cities": [],
        "ages": [],
        "genders": [],
        "languages": [],
        "interests": [],
    }
    if countries:
        result["countries"] = split(["India", "United States", "United Kingdom", "UAE", "Canada"])
        result["cities"] = split(["Mumbai", "Bengaluru", "Delhi", "Hyderabad", "Pune"])
        result["languages"] = split(["English", "Hindi", "Tamil", "Telugu"])
    if ages:
        result["ages"] = split(["13-17", "18-24", "25-34", "35-44", "45+"])
    if genders:
        result["genders"] = split(["Female", "Male", "Other"])
    result["interests"] = split(["Fitness", "Fashion", "Technology", "Food", "Travel"])
    return result
