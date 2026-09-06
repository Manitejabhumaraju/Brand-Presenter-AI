import uuid


def new_id() -> str:
    """Generate a string UUID4. Used as the primary key default for every table.

    Strings (not native UUID columns) keep SQLite and a future PostgreSQL backend behaving
    identically, and IDs are always server-generated - the API never trusts a client-supplied ID
    as authoritative.
    """
    return str(uuid.uuid4())
