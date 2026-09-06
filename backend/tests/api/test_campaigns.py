def _register(client, email, username, role):
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


def test_full_campaign_lifecycle(client):
    brand = _register(client, "campaignbrand@test.com", "campaignbrand", "BRAND")
    creator = _register(client, "campaigncreator@test.com", "campaigncreator", "CREATOR")

    creators = client.get("/api/v1/creators", params={"query": "Campaigncreator"}).json()["items"]
    creator_id = creators[0]["id"]

    created = client.post(
        "/api/v1/campaigns",
        json={"name": "Launch Campaign", "budget": 50000, "currency": "INR"},
        headers=_headers(brand),
    )
    assert created.status_code == 201
    campaign_id = created.json()["id"]

    invited = client.post(
        f"/api/v1/campaigns/{campaign_id}/invite",
        json={"creator_id": creator_id, "agreed_price": 20000},
        headers=_headers(brand),
    )
    assert invited.status_code == 201
    assert invited.json()["status"] == "INVITED"

    accepted = client.post(f"/api/v1/campaigns/{campaign_id}/accept", headers=_headers(creator))
    assert accepted.status_code == 200
    assert accepted.json()["status"] == "ACCEPTED"

    deliverable = client.post(
        f"/api/v1/campaigns/{campaign_id}/deliverables",
        json={"creator_id": creator_id, "title": "Launch reel", "content_type": "REEL"},
        headers=_headers(brand),
    )
    assert deliverable.status_code == 201
    deliverable_id = deliverable.json()["id"]

    updated = client.patch(
        f"/api/v1/campaigns/deliverables/{deliverable_id}",
        json={"status": "SUBMITTED", "content_url": "https://example.com/video"},
        headers=_headers(creator),
    )
    assert updated.status_code == 200
    assert updated.json()["status"] == "SUBMITTED"


def test_only_brand_can_create_campaign(client):
    creator = _register(client, "notabrand@test.com", "notabrand", "CREATOR")
    response = client.post("/api/v1/campaigns", json={"name": "Should fail"}, headers=_headers(creator))
    assert response.status_code == 400


def test_duplicate_invite_conflicts(client):
    brand = _register(client, "dupeinvitebrand@test.com", "dupeinvitebrand", "BRAND")
    _register(client, "dupeinvitecreator@test.com", "dupeinvitecreator", "CREATOR")
    creators = client.get("/api/v1/creators", params={"query": "Dupeinvitecreator"}).json()["items"]
    creator_id = creators[0]["id"]

    campaign = client.post("/api/v1/campaigns", json={"name": "Dupe test"}, headers=_headers(brand)).json()
    first = client.post(
        f"/api/v1/campaigns/{campaign['id']}/invite", json={"creator_id": creator_id}, headers=_headers(brand)
    )
    assert first.status_code == 201
    second = client.post(
        f"/api/v1/campaigns/{campaign['id']}/invite", json={"creator_id": creator_id}, headers=_headers(brand)
    )
    assert second.status_code == 409
