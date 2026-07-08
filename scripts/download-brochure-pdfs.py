import re
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "src/components/OurServices/brochures-data.ts"
OUT = ROOT / "public/pdf"
BASE = "https://test.zakher.travel/pdf"

text = DATA.read_text(encoding="utf-8")
files = sorted(set(re.findall(r"file: `\$\{PDF_BASE\}/([^`]+)`", text)))

OUT.mkdir(parents=True, exist_ok=True)

for name in files:
    dest = OUT / name
    if dest.exists() and dest.stat().st_size > 0:
        print(f"skip {name}")
        continue
    url = f"{BASE}/{name}"
    print(f"download {name}...")
    urllib.request.urlretrieve(url, dest)
    print(f"  -> {dest.stat().st_size} bytes")

print(f"done: {len(files)} files")
