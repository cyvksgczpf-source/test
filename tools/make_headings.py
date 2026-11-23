"""Render the section headings as liquid-chrome images.

Usage:  python3 tools/make_headings.py
Needs:  pip install pillow numpy scipy

Writes assets/headings/<slug>.webp. Edit HEADINGS to add or rename a heading,
then add <img src="assets/headings/<slug>.webp"> to index.html.
"""
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont
from scipy.ndimage import distance_transform_edt, gaussian_filter, map_coordinates

ROOT = Path(__file__).resolve().parent.parent
FONT = ROOT / "tools/fonts/UnifrakturMaguntia.ttf"  # free Old English-style blackletter (OFL)
OUT = ROOT / "assets/headings"

# slug -> text (lowercase, like the banner)
HEADINGS = {
    "beats": "beats",
    "licenses": "licenses",
    "custom": "custom",
    "about": "about",
    "faq": "faq",
    "lets-cook": "let’s cook",
}

SIZE = 240  # output font size in px (≈3x the on-page size, sharp on retina)
SS = 3      # supersampling
PAD = 0.06  # padding around glyphs, in em

# vertical chrome ramp (position -> brightness), like the logo: bright silver with dark streaks
RAMP = np.array([
    [-1.20, 0.98], [-0.70, 0.80], [-0.42, 0.40], [-0.22, 0.97], [-0.05, 0.62],
    [0.05, 0.18], [0.18, 0.72], [0.38, 1.00], [0.62, 0.55], [0.85, 0.92], [1.20, 0.70],
])


def noise(shape, sigma, seed):
    n = gaussian_filter(np.random.default_rng(seed).standard_normal(shape), sigma)
    return n / (np.abs(n).max() + 1e-9)


def render(text, seed):
    font = ImageFont.truetype(str(FONT), SIZE * SS)
    l, _, r, _ = font.getbbox(text)
    # same vertical box for every heading (tallest ascender to deepest descender)
    _, top, _, bottom = font.getbbox("bdfhklpqy\u2019")
    pad = int(PAD * SIZE * SS)
    w, h = r - l + 2 * pad, bottom - top + 2 * pad
    mask_img = Image.new("L", (w, h), 0)
    ImageDraw.Draw(mask_img).text((pad - l, pad - top), text, font=font, fill=255)
    m = np.asarray(mask_img, np.float32) / 255

    # height field: rounded tubes from the stroke distance field, plus liquid wobble
    d = distance_transform_edt(m > 0.5)
    rad = max(np.percentile(d[d > 0], 92), 1)
    u = np.clip(d / rad, 0, 1)
    height = np.sqrt(1 - (1 - u) ** 2)
    height += 0.55 * noise(m.shape, SIZE * SS / 40, seed) * (m > 0.5)
    height = gaussian_filter(height, SS * 1.6) * 6.0 * rad / (SS * 4)

    gy, gx = np.gradient(height)
    n = np.stack([-gx, -gy, np.ones_like(gx)])
    n /= np.linalg.norm(n, axis=0)

    # reflected view vector (viewer looks down -z) picks the env value, warped by a second noise
    ry = 2 * n[2] * n[1]
    yy = np.linspace(-0.5, 0.5, h)[:, None] * np.ones((1, w))
    warp = noise(m.shape, SIZE * SS / 14, seed + 7)
    tpos = 0.95 * ry + 0.9 * yy + 0.28 * warp
    val = np.interp(tpos, RAMP[:, 0], RAMP[:, 1])

    # specular glints + soft dark rim on the edges
    light = np.array([-0.45, -0.65, 0.62])
    light /= np.linalg.norm(light)
    spec = np.clip((n * light[:, None, None]).sum(0), 0, 1) ** 60
    rim = np.clip(d / (SS * 2.2), 0, 1)
    val = np.clip(val * (0.55 + 0.45 * rim) + 0.9 * spec, 0, 1)

    # tiny cool tint, like polished chrome
    rgb = np.stack([val * 0.97, val * 0.985, val], -1) * 255
    alpha = m * 255

    # crop horizontally to the ink, keep the shared vertical box so all headings scale alike
    cols = np.where(m.max(0) > 0.02)[0]
    x0, x1 = max(cols[0] - pad // 3, 0), min(cols[-1] + pad // 3, w)
    rgba = np.dstack([rgb, alpha])[:, x0:x1].astype(np.uint8)
    img = Image.fromarray(rgba, "RGBA")
    return img.resize((img.width // SS, img.height // SS), Image.LANCZOS)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for i, (slug, text) in enumerate(HEADINGS.items()):
        img = render(text, seed=11 + i)
        path = OUT / f"{slug}.webp"
        img.save(path, "WEBP", quality=88, method=6)
        print(f"{path.relative_to(ROOT)}  {img.width}x{img.height}  {path.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
