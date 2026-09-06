def _register(client, email, username, role="CREATOR"):
    response = client.post(
        "/api/v1/auth/register",
        json={
            "email": email,
            "password": "TestPass123!",
            "full_name": username.title(),
            "username": username,
            "role": role,
        },
    )
    assert response.status_code == 201
    return response.json()


def _headers(user):
    return {"Authorization": f"Bearer {user['access_token']}"}


def test_ai_search_returns_interpreted_filters(client):
    response = client.post("/api/v1/ai/search", json={"query": "Find fitness creators in India under 50k"})
    assert response.status_code == 200
    body = response.json()
    assert body["interpreted_filters"]["country"] == "India"
    assert body["interpreted_filters"]["category"] == "Fitness"
    assert body["interpreted_filters"]["max_price"] == 50_000
    assert isinstance(body["result_count"], int)


def test_ai_match_creators_never_fabricates_when_no_data(client):
    response = client.post("/api/v1/ai/match-creators", json={"brief": "Need any creators", "limit": 5})
    assert response.status_code == 200
    body = response.json()
    assert body["provider"] == "mock"
    for match in body["matches"]:
        assert isinstance(match["match_score"], int)
        assert 0 <= match["match_score"] <= 100


def test_ai_chat_requires_auth(client):
    response = client.post("/api/v1/ai/chat", json={"message": "hello"})
    assert response.status_code == 401


def test_ai_chat_persists_session_and_replies(client):
    user = _register(client, "aichatuser@test.com", "aichatuser")
    first = client.post("/api/v1/ai/chat", json={"message": "Hello assistant"}, headers=_headers(user))
    assert first.status_code == 200
    body = first.json()
    assert body["session_id"]
    assert body["reply"]
    assert body["provider"] == "mock"

    second = client.post(
        "/api/v1/ai/chat",
        json={"session_id": body["session_id"], "message": "Follow-up question"},
        headers=_headers(user),
    )
    assert second.status_code == 200
    assert second.json()["session_id"] == body["session_id"]


def test_ai_campaign_brief_generation(client):
    response = client.post(
        "/api/v1/ai/campaign-brief",
        json={"goal": "Launch a new sneaker line", "budget": 200000, "category": "Fashion"},
    )
    assert response.status_code == 200
    assert response.json()["brief_text"]
