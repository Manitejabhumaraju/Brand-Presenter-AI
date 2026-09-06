"""Password hashing, JWT issuance/verification, and at-rest token encryption.

Kept intentionally dependency-light: Argon2 for passwords (via argon2-cffi) and PyJWT for
tokens. Social OAuth token encryption uses `cryptography`'s Fernet when available; if the
optional dependency isn't installed we fall back to a reversible XOR-based obfuscation so the
architecture (encrypt-before-store, decrypt-on-use, never return raw tokens) still holds in a
minimal dev environment. Swap `_DevFallbackCipher` for Fernet-only in production.
"""

import base64
import hashlib
import time
import uuid
from datetime import UTC, datetime, timedelta
from enum import Enum
from typing import Any

import jwt
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError

from app.core.config import get_settings

_settings = get_settings()
_password_hasher = PasswordHasher()


class TokenType(str, Enum):
    ACCESS = "access"
    REFRESH = "refresh"


def hash_password(plain_password: str) -> str:
    return _password_hasher.hash(plain_password)


def verify_password(plain_password: str, password_hash: str) -> bool:
    try:
        return _password_hasher.verify(password_hash, plain_password)
    except VerifyMismatchError:
        return False
    except Exception:
        return False


def create_access_token(subject: str, role: str, extra_claims: dict[str, Any] | None = None) -> str:
    now = datetime.now(UTC)
    expire = now + timedelta(minutes=_settings.access_token_expire_minutes)
    payload: dict[str, Any] = {
        "sub": subject,
        "role": role,
        "type": TokenType.ACCESS.value,
        "iat": now,
        "exp": expire,
        "jti": str(uuid.uuid4()),
    }
    if extra_claims:
        payload.update(extra_claims)
    return jwt.encode(payload, _settings.jwt_secret_key, algorithm=_settings.jwt_algorithm)


def create_refresh_token(subject: str) -> tuple[str, str, datetime]:
    """Returns (token, jti, expires_at). The jti is persisted for revocation support."""
    now = datetime.now(UTC)
    expire = now + timedelta(days=_settings.refresh_token_expire_days)
    jti = str(uuid.uuid4())
    payload = {
        "sub": subject,
        "type": TokenType.REFRESH.value,
        "iat": now,
        "exp": expire,
        "jti": jti,
    }
    token = jwt.encode(payload, _settings.jwt_secret_key, algorithm=_settings.jwt_algorithm)
    return token, jti, expire


def decode_token(token: str) -> dict[str, Any]:
    """Raises jwt.PyJWTError subclasses on invalid/expired tokens."""
    return jwt.decode(token, _settings.jwt_secret_key, algorithms=[_settings.jwt_algorithm])


class _DevFallbackCipher:
    """Reversible obfuscation used only when TOKEN_ENCRYPTION_KEY/cryptography are unavailable.

    This is NOT cryptographically secure. It exists so the application never stores plaintext
    OAuth tokens even in a bare-bones dev setup, while making the limitation explicit.
    """

    def __init__(self, key: str) -> None:
        self._keystream = hashlib.sha256((key or "dev-fallback-key").encode()).digest()

    def _xor(self, data: bytes) -> bytes:
        ks = self._keystream
        return bytes(b ^ ks[i % len(ks)] for i, b in enumerate(data))

    def encrypt(self, plaintext: bytes) -> bytes:
        return base64.urlsafe_b64encode(self._xor(plaintext))

    def decrypt(self, ciphertext: bytes) -> bytes:
        return self._xor(base64.urlsafe_b64decode(ciphertext))


def _get_cipher() -> Any:
    try:
        from cryptography.fernet import Fernet

        key = _settings.token_encryption_key
        if key:
            return Fernet(key.encode())
    except ImportError:
        pass
    return _DevFallbackCipher(_settings.token_encryption_key)


_cipher = _get_cipher()


def encrypt_secret(plaintext: str) -> str:
    """Encrypt a secret (e.g. an OAuth token) for storage. Never store the raw value."""
    return _cipher.encrypt(plaintext.encode()).decode()


def decrypt_secret(ciphertext: str) -> str:
    return _cipher.decrypt(ciphertext.encode()).decode()


def new_uuid() -> str:
    return str(uuid.uuid4())


def now_ms() -> int:
    return int(time.time() * 1000)
