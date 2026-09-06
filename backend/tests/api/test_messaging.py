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


def test_conversation_and_messages_flow(client):
    brand = _register(client, "msgbrand@test.com", "msgbrand", "BRAND")
    creator = _register(client, "msgcreator@test.com", "msgcreator", "CREATOR")
    brand_id = client.get("/api/v1/auth/me", headers=_headers(brand)).json()["id"]
    creator_user_id = client.get("/api/v1/auth/me", headers=_headers(creator)).json()["id"]

    conversation = client.post(
        "/api/v1/conversations", json={"participant_user_ids": [creator_user_id]}, headers=_headers(brand)
    )
    assert conversation.status_code == 201
    conversation_id = conversation.json()["id"]
    assert brand_id in conversation.json()["participant_user_ids"]

    sent = client.post(
        f"/api/v1/conversations/{conversation_id}/messages",
        json={"content": "Hello there!"},
        headers=_headers(brand),
    )
    assert sent.status_code == 201

    messages = client.get(f"/api/v1/conversations/{conversation_id}/messages", headers=_headers(creator))
    assert messages.status_code == 200
    assert messages.json()["total"] == 1
    assert messages.json()["items"][0]["content"] == "Hello there!"


def test_non_participant_cannot_read_messages(client):
    brand = _register(client, "privatemsgbrand@test.com", "privatemsgbrand", "BRAND")
    creator = _register(client, "privatemsgcreator@test.com", "privatemsgcreator", "CREATOR")
    outsider = _register(client, "outsider@test.com", "outsider", "CREATOR")
    creator_user_id = client.get("/api/v1/auth/me", headers=_headers(creator)).json()["id"]

    conversation = client.post(
        "/api/v1/conversations", json={"participant_user_ids": [creator_user_id]}, headers=_headers(brand)
    ).json()

    response = client.get(f"/api/v1/conversations/{conversation['id']}/messages", headers=_headers(outsider))
    assert response.status_code == 403
