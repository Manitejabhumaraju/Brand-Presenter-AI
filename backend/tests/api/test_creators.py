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


def test_creator_profile_auto_created_on_register(client):
    _register(client, "autoprofile@test.com", "autoprofile")

    results = client.get("/api/v1/creators", params={"query": "Autoprofile"}).json()
    assert results["total"] >= 1


def test_update_creator_profile_requires_ownership(client):
    owner = _register(client, "owner@test.com", "profileowner")
    other = _register(client, "other@test.com", "otheruser")

    creators = client.get("/api/v1/creators", params={"query": "Profileowner"}).json()["items"]
    creator_id = creators[0]["id"]

    forbidden = client.patch(
        f"/api/v1/creators/{creator_id}",
        json={"bio": "hacked"},
        headers={"Authorization": f"Bearer {other['access_token']}"},
    )
    assert forbidden.status_code == 403

    allowed = client.patch(
        f"/api/v1/creators/{creator_id}",
        json={"bio": "My real bio"},
        headers={"Authorization": f"Bearer {owner['access_token']}"},
    )
    assert allowed.status_code == 200
    assert allowed.json()["bio"] == "My real bio"


def test_pagination_defaults_and_limits(client):
    response = client.get("/api/v1/creators")
    assert response.status_code == 200
    body = response.json()
    assert body["page"] == 1
    assert body["page_size"] == 20

    too_big = client.get("/api/v1/creators", params={"page_size": 500})
    assert too_big.status_code == 422


def test_get_nonexistent_creator_returns_404(client):
    response = client.get("/api/v1/creators/does-not-exist")
    assert response.status_code == 404
    assert response.json()["error"]["code"] == "CREATOR_NOT_FOUND"


def test_creator_search_by_category_filter_only_returns_matches(client):
    _register(client, "catfilter@test.com", "catfilteruser")

    filtered = client.get("/api/v1/creators", params={"category": "Fitness"}).json()
    assert all(any(c.lower() == "fitness" for c in item.get("categories", [])) for item in filtered["items"])
