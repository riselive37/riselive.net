#!/usr/bin/env python3
"""Repository-specific static checks for the RiseLive website."""

from __future__ import annotations

import re
import subprocess
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse


ROOT = Path(__file__).resolve().parents[3]
PUBLIC_PAGES = [
    Path("index.html"),
    Path("about/index.html"),
    Path("pricing/index.html"),
    Path("works/index.html"),
    Path("news/index.html"),
    Path("contact/index.html"),
]


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.in_title = False
        self.title = ""
        self.meta_description = ""
        self.canonical = ""
        self.stylesheets: list[str] = []
        self.scripts: list[str] = []
        self.links: list[str] = []
        self.images: list[str] = []
        self.ids: set[str] = set()
        self.forms: list[dict[str, str]] = []
        self.h1_count = 0

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attr = {k: v or "" for k, v in attrs}
        if "id" in attr:
            self.ids.add(attr["id"])
        if tag == "title":
            self.in_title = True
        elif tag == "meta" and attr.get("name") == "description":
            self.meta_description = attr.get("content", "")
        elif tag == "link":
            if attr.get("rel") == "canonical":
                self.canonical = attr.get("href", "")
            if attr.get("rel") == "stylesheet":
                self.stylesheets.append(attr.get("href", ""))
        elif tag == "script" and attr.get("src"):
            self.scripts.append(attr["src"])
        elif tag == "a" and attr.get("href"):
            self.links.append(attr["href"])
        elif tag == "img" and attr.get("src"):
            self.images.append(attr["src"])
        elif tag == "form":
            self.forms.append(attr)
        elif tag == "h1":
            self.h1_count += 1

    def handle_endtag(self, tag: str) -> None:
        if tag == "title":
            self.in_title = False

    def handle_data(self, data: str) -> None:
        if self.in_title:
            self.title += data.strip()


def parse_page(path: Path) -> PageParser:
    parser = PageParser()
    parser.feed(path.read_text(encoding="utf-8"))
    return parser


def is_external(ref: str) -> bool:
    scheme = urlparse(ref).scheme
    return scheme in {"http", "https", "mailto", "tel", "data"}


def strip_query_and_fragment(ref: str) -> str:
    return ref.split("#", 1)[0].split("?", 1)[0]


def resolve_local_ref(page: Path, ref: str) -> Path | None:
    clean = strip_query_and_fragment(ref)
    if not clean or clean.startswith("#") or is_external(clean):
        return None
    candidate = (page.parent / clean).resolve()
    if clean.endswith("/"):
        candidate = candidate / "index.html"
    return candidate


def check_page(path: Path) -> list[str]:
    errors: list[str] = []
    full_path = ROOT / path
    if not full_path.exists():
        return [f"{path}: missing page"]

    parser = parse_page(full_path)
    if not parser.title:
        errors.append(f"{path}: missing <title>")
    if not parser.meta_description:
        errors.append(f"{path}: missing meta description")
    if not parser.canonical.startswith("https://www.riselive.net/"):
        errors.append(f"{path}: canonical must start with https://www.riselive.net/")
    if parser.h1_count != 1:
        errors.append(f"{path}: expected exactly one h1, found {parser.h1_count}")
    if not parser.stylesheets:
        errors.append(f"{path}: missing stylesheet")

    for ref in parser.stylesheets + parser.scripts + parser.images + parser.links:
        local = resolve_local_ref(full_path, ref)
        if local and not local.exists():
            errors.append(f"{path}: broken local reference {ref}")

    return errors


def check_required_ids() -> list[str]:
    checks = {
        Path("works/index.html"): {"worksGrid"},
        Path("news/index.html"): {"newsList", "newsDetail"},
        Path("contact/index.html"): {"contactForm", "formSuccessMessage"},
    }
    errors: list[str] = []
    for path, required_ids in checks.items():
        parser = parse_page(ROOT / path)
        missing = required_ids - parser.ids
        if missing:
            errors.append(f"{path}: missing required id(s): {', '.join(sorted(missing))}")
    return errors


def check_contact_form() -> list[str]:
    parser = parse_page(ROOT / "contact/index.html")
    errors: list[str] = []
    forms = [form for form in parser.forms if form.get("id") == "contactForm"]
    if len(forms) != 1:
        return [f"contact/index.html: expected one #contactForm, found {len(forms)}"]
    form = forms[0]
    if form.get("method", "").upper() != "POST":
        errors.append("contact/index.html: #contactForm method must be POST")
    if form.get("action") != "https://formspree.io/f/mwveldwq":
        errors.append("contact/index.html: unexpected Formspree action")
    return errors


def check_js_syntax() -> list[str]:
    errors: list[str] = []
    for script in ["js/main.js", "js/cms.js"]:
        result = subprocess.run(
            ["node", "--check", script],
            cwd=ROOT,
            text=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
        )
        if result.returncode != 0:
            message = (result.stderr or result.stdout).strip()
            errors.append(f"{script}: node --check failed: {message}")
    return errors


def check_sitemap() -> list[str]:
    sitemap = ROOT / "sitemap.xml"
    if not sitemap.exists():
        return ["sitemap.xml: missing"]
    text = sitemap.read_text(encoding="utf-8")
    expected_urls = [
        "https://www.riselive.net/",
        "https://www.riselive.net/about/",
        "https://www.riselive.net/pricing/",
        "https://www.riselive.net/works/",
        "https://www.riselive.net/news/",
        "https://www.riselive.net/contact/",
    ]
    return [f"sitemap.xml: missing {url}" for url in expected_urls if url not in text]


def check_no_inline_styles_in_public_pages() -> list[str]:
    errors: list[str] = []
    for page in PUBLIC_PAGES:
        text = (ROOT / page).read_text(encoding="utf-8")
        if "<style" in text:
            errors.append(f"{page}: contains page-local <style>")
        if re.search(r"\sstyle=", text):
            errors.append(f"{page}: contains inline style attribute")
    return errors


def main() -> int:
    errors: list[str] = []
    for page in PUBLIC_PAGES:
        errors.extend(check_page(page))
    errors.extend(check_required_ids())
    errors.extend(check_contact_form())
    errors.extend(check_sitemap())
    errors.extend(check_no_inline_styles_in_public_pages())
    errors.extend(check_js_syntax())

    if errors:
        print("RiseLive validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print("RiseLive validation passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
