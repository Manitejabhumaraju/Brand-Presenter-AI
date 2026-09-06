from datetime import UTC, datetime, timedelta

import jwt
import pytest

from app.core.security import (
    create_access_token,
    create_refresh_token,
    decode_token,
    encrypt_secret,
    hash_password,
    verify_password,
)


def test_password_hash_roundtrip():
    hashed = hash_password("correct horse battery staple")
    assert hashed != "correct horse battery staple"
    assert verify_password("correct horse battery staple", hashed)
    assert not verify_password("wrong password", hashed)


def test_access_token_contains_role_and_subject():
    token = create_access_token("user-123", "CREATOR")
    payload = decode_token(token)
    assert payload["sub"] == "user-123"
    assert payload["role"] == "CREATOR"
    assert payload["type"] == "access"


def test_refresh_token_has_unique_jti():
    token1, jti1, _ = create_refresh_token("user-123")
    token2, jti2, _ = create_refresh_token("user-123")
    assert jti1 != jti2
    assert token1 != token2


def test_decode_expired_token_raises():
    import app.core.security as security_module

    expired_payload = {
        "sub": "user-1",
        "role": "CREATOR",
        "type": "access",
        "iat": datetime.now(UTC) - timedelta(hours=2),
        "exp": datetime.now(UTC) - timedelta(hours=1),
    }
    settings = security_module.get_settings()
    token = jwt.encode(expired_payload, settings.jwt_secret_key, algorithm=settings.jwt_algorithm)
    with pytest.raises(jwt.ExpiredSignatureError):
        decode_token(token)


def test_encrypt_secret_roundtrip():
    from app.core.security import decrypt_secret

    ciphertext = encrypt_secret("super-secret-token")
    assert ciphertext != "super-secret-token"
    assert decrypt_secret(ciphertext) == "super-secret-token"
