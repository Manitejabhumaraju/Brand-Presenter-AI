from app.schemas.common import Page


def test_page_create_computes_total_pages():
    page = Page.create(["a", "b"], page=1, page_size=2, total=5)
    assert page.total_pages == 3
    assert page.items == ["a", "b"]


def test_page_create_exact_multiple():
    page = Page.create([], page=2, page_size=10, total=20)
    assert page.total_pages == 2
