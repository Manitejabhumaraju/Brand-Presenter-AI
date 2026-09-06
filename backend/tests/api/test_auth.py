def test_register_creator_returns_tokens(client):
    response = client.post(
        "/api/v1/auth/register",
        json={
            "email": "newcreator@test.com",
            "password": "TestPass123!",
            "full_name": "New Creator",
            "username": "newcreator",
            "role": "CREATOR",
        },
    )
    assert response.status_code == 201
    body = response.json()
    assert body["access_token"]
    assert body["refresh_token"]
    assert body["user"]["email"] == "newcreator@test.com"
    assert "password" not in body["user"]
    assert "password_hash" not in body["user"]


def test_register_duplicate_email_conflicts(client):
    payload = {
        "email": "dupe@test.com",
        "password": "TestPass123!",
        "full_name": "Dupe",
        "username": "dupe1",
        "role": "BRAND",
    }
    first = client.post("/api/v1/auth/register", json=payload)
    assert first.status_code == 201
    payload["username"] = "dupe2"
    second = client.post("/api/v1/auth/register", json=payload)
    assert second.status_code == 409
    assert second.json()["error"]["code"] == "CONFLICT"


def test_register_rejects_admin_role(client):
    response = client.post(
        "/api/v1/auth/register",
        json={
            "email": "wannabe-admin@test.com",
            "password": "TestPass123!",
            "full_name": "X",
            "username": "wannabeadmin",
            "role": "ADMIN",
        },
    )
    assert response.status_code == 422


def test_login_with_wrong_password_fails(client):
    client.post(
        "/api/v1/auth/register",
        json={
            "email": "loginuser@test.com",
            "password": "TestPass123!",
            "full_name": "Login User",
            "username": "loginuser",
            "role": "CREATOR",
        },
    )
    response = client.post(
        "/api/v1/auth/login", json={"email": "loginuser@test.com", "password": "WrongPassword"}
    )
    assert response.status_code == 401


def test_login_success_and_me_endpoint(client):
    client.post(
        "/api/v1/auth/register",
        json={
            "email": "meuser@test.com",
            "password": "TestPass123!",
            "full_name": "Me User",
            "username": "meuser",
            "role": "CREATOR",
        },
    )
    login = client.post("/api/v1/auth/login", json={"email": "meuser@test.com", "password": "TestPass123!"})
    assert login.status_code == 200
    token = login.json()["access_token"]

    me = client.get("/api/v1/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert me.status_code == 200
    assert me.json()["email"] == "meuser@test.com"


def test_me_without_token_is_unauthorized(client):
    response = client.get("/api/v1/auth/me")
    assert response.status_code == 401


def test_refresh_token_rotates_and_old_refresh_is_revoked(client):
    register = client.post(
        "/api/v1/auth/register",
        json={
            "email": "refresher@test.com",
            "password": "TestPass123!",
            "full_name": "Refresher",
            "username": "refresher",
            "role": "CREATOR",
        },
    )
    refresh_token = register.json()["refresh_token"]

    refreshed = client.post("/api/v1/auth/refresh", json={"refresh_token": refresh_token})
    assert refreshed.status_code == 200
    assert refreshed.json()["access_token"]

    reused = client.post("/api/v1/auth/refresh", json={"refresh_token": refresh_token})
    assert reused.status_code == 401


def test_logout_revokes_refresh_token(client):
    register = client.post(
        "/api/v1/auth/register",
        json={
            "email": "logout@test.com",
            "password": "TestPass123!",
            "full_name": "Logout",
            "username": "logoutuser",
            "role": "CREATOR",
        },
    )
    refresh_token = register.json()["refresh_token"]

    logout = client.post("/api/v1/auth/logout", json={"refresh_token": refresh_token})
    assert logout.status_code == 200

    refreshed = client.post("/api/v1/auth/refresh", json={"refresh_token": refresh_token})
    assert refreshed.status_code == 401
