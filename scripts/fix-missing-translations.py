import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"
I18N = ROOT / "public" / "i18n"
LOCALES = ["en", "az", "ru", "ar"]

KEY_PATTERNS = [
    re.compile(r"""k=["']([^"']+)["']"""),
    re.compile(r"""dt\(\s*[`'"]([^`'"]+)[`'"]"""),
    re.compile(r"""t\(\s*[`'"]([^`'"]+)[`'"]"""),
]

used_keys: set[str] = set()
for path in SRC.rglob("*"):
    if path.suffix not in {".ts", ".tsx"}:
        continue
    text = path.read_text(encoding="utf-8")
    for pattern in KEY_PATTERNS:
        used_keys.update(pattern.findall(text))

public = {
    loc: json.loads((I18N / f"{loc}.json").read_text(encoding="utf-8"))
    for loc in LOCALES
}


def is_missing(d: dict[str, str], key: str) -> bool:
    val = d.get(key, "")
    return not isinstance(val, str) or not val.strip()


def merge_missing(target: dict[str, str], source: dict[str, str]) -> list[str]:
    applied = []
    for key, value in source.items():
        if not isinstance(value, str):
            continue
        if is_missing(target, key) and value.strip():
            target[key] = value
            applied.append(key)
        elif key not in target and value == "":
            target[key] = value
            applied.append(key)
    return applied


extra = {
    "en": {
        "reservation.phone": "Phone",
        "reservation.email": "Email",
    },
    "az": {
        "reservation.phone": "Telefon",
        "reservation.email": "E-poçt",
    },
    "ru": {
        "reservation.phone": "Телефон",
        "reservation.email": "E-mail",
    },
    "ar": {
        "reservation.phone": "الهاتف",
        "reservation.email": "البريد الإلكتروني",
    },
}

applied_report: dict[str, list[str]] = {}

for loc in LOCALES:
    applied: list[str] = []
    manual_path = ROOT / "scripts" / f"manual-{loc}-overrides.json"
    if manual_path.exists():
        manual = json.loads(manual_path.read_text(encoding="utf-8"))
        applied.extend(merge_missing(public[loc], manual))
    applied.extend(merge_missing(public[loc], extra.get(loc, {})))
    applied_report[loc] = applied
    (I18N / f"{loc}.json").write_text(
        json.dumps(public[loc], ensure_ascii=False, separators=(",", ":")),
        encoding="utf-8",
    )

report_lines = ["Applied missing translations:\n"]
for loc in LOCALES:
    report_lines.append(f"{loc}: {len(applied_report[loc])} keys")
    for key in applied_report[loc][:30]:
        report_lines.append(f"  + {key}")
    if len(applied_report[loc]) > 30:
        report_lines.append(f"  ... +{len(applied_report[loc]) - 30} more")

report_lines.append("\nRemaining UI keys empty in non-EN (with EN value):\n")
for loc in ["az", "ru", "ar"]:
    missing = []
    for key in sorted(used_keys):
        if not is_missing(public[loc], key):
            continue
        en_val = public["en"].get(key, "")
        if isinstance(en_val, str) and en_val.strip():
            missing.append((key, en_val))
    report_lines.append(f"=== {loc.upper()}: {len(missing)} ===")
    for key, en_val in missing:
        report_lines.append(f"  {key} -> {en_val[:100]}")

report = ROOT / "scripts" / "audit-translations-report.txt"
report.write_text("\n".join(report_lines), encoding="utf-8")
print("\n".join(report_lines[:50]))
