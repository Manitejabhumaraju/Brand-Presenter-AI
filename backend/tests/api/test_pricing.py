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


def test_create_and_list_pricing(client):
    creator = _register(client, "pricingcreator@test.com", "pricingcreator")
    creator_id = client.get("/api/v1/creators", params={"query": "Pricingcreator"}).json()["items"][0]["id"]

    created = client.post(
        f"/api/v1/creators/{creator_id}/pricing",
        json={"platform": "instagram", "content_type": "REEL", "min_price": 10000, "max_price": 30000},
        headers=_headers(creator),
    )
    assert created.status_code == 201

    listing = client.get(f"/api/v1/creators/{creator_id}/pricing")
    assert listing.status_code == 200
    assert len(listing.json()) == 1


def test_pricing_benchmark_never_exposes_individual_rows(client):
    creator = _register(client, "benchmarkcreator@test.com", "benchmarkcreator")
    creator_id = client.get("/api/v1/creators", params={"query": "Benchmarkcreator"}).json()["items"][0]["id"]
    client.post(
        f"/api/v1/creators/{creator_id}/pricing",
        json={"platform": "instagram", "content_type": "REEL", "min_price": 15000},
        headers=_headers(creator),
    )

    response = client.post("/api/v1/pricing/benchmark", json={"platform": "instagram"})
    assert response.status_code == 200
    body = response.json()
    assert "creator_id" not in body
    assert body["sample_size"] >= 1
