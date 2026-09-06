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


def test_admin_endpoint_rejects_anonymous(client):
    response = client.get("/api/v1/admin/users")
    assert response.status_code == 401


def test_admin_endpoint_rejects_non_admin(client):
    creator = _register(client, "notadmin@test.com", "notadmin")
    response = client.get(
        "/api/v1/admin/users", headers={"Authorization": f"Bearer {creator['access_token']}"}
    )
    assert response.status_code == 403
    assert response.json()["error"]["code"] == "AUTHORIZATION_ERROR"


def test_cannot_register_directly_as_admin(client):
    response = client.post(
        "/api/v1/auth/register",
        json={
            "email": "sneaky@test.com",
            "password": "TestPass123!",
            "full_name": "Sneaky",
            "username": "sneaky",
            "role": "ADMIN",
        },
    )
    assert response.status_code == 422


def test_forged_role_claim_does_not_grant_admin(client):
    """A CREATOR cannot escalate by hitting an admin-only route even with a valid token."""
    creator = _register(client, "escalator@test.com", "escalator")
    response = client.get(
        "/api/v1/admin/system-health", headers={"Authorization": f"Bearer {creator['access_token']}"}
    )
    assert response.status_code == 403


def test_deleting_others_portfolio_item_is_forbidden(client):
    owner = _register(client, "portfolioowner@test.com", "portfolioowner")
    attacker = _register(client, "attacker@test.com", "attacker")

    creators = client.get("/api/v1/creators", params={"query": "Portfolioowner"}).json()["items"]
    creator_id = creators[0]["id"]

    created = client.post(
        "/api/v1/portfolio",
        json={"creator_id": creator_id, "title": "My work"},
        headers={"Authorization": f"Bearer {owner['access_token']}"},
    )
    assert created.status_code == 201
    item_id = created.json()["id"]

    forbidden = client.delete(
        f"/api/v1/portfolio/{item_id}", headers={"Authorization": f"Bearer {attacker['access_token']}"}
    )
    assert forbidden.status_code == 403


def test_private_contact_visibility_hides_email_from_strangers(client):
    _register(client, "privatecontact@test.com", "privatecontact")
    stranger = _register(client, "stranger@test.com", "stranger")

    creators = client.get("/api/v1/creators", params={"query": "Privatecontact"}).json()["items"]
    creator_id = creators[0]["id"]

    response = client.get(
        f"/api/v1/creators/{creator_id}/contact",
        headers={"Authorization": f"Bearer {stranger['access_token']}"},
    )
    assert response.status_code == 200
    body = response.json()
    assert body["email"] is None
    assert body["message_only"] is True


def test_owner_can_always_see_own_contact_info(client):
    creator = _register(client, "ownercontact@test.com", "ownercontact")
    creators = client.get("/api/v1/creators", params={"query": "Ownercontact"}).json()["items"]
    creator_id = creators[0]["id"]

    response = client.get(
        f"/api/v1/creators/{creator_id}/contact",
        headers={"Authorization": f"Bearer {creator['access_token']}"},
    )
    assert response.status_code == 200
    assert response.json()["email"] == "ownercontact@test.com"


def test_social_account_tokens_never_serialized(client):
    creator = _register(client, "tokentest@test.com", "tokentest")
    connected = client.post(
        "/api/v1/social-accounts",
        json={"platform": "instagram", "username": "tokentest"},
        headers={"Authorization": f"Bearer {creator['access_token']}"},
    )
    assert connected.status_code == 201
    body = connected.json()
    assert "access_token_encrypted" not in body
    assert "refresh_token_encrypted" not in body
    assert "access_token" not in body
