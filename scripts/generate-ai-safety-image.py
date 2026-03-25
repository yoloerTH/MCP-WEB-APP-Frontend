"""
Blog hero image: "Is AI Safe for Your Business Data?"
Left: title. Right: shield shape with lock, 8 security checkpoints around it.
Dark midnight bg, emerald for "safe" indicators.
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math
import os

S = 3
W, H = 1200 * S, 630 * S
OUTPUT = "/Users/thanospangios/Downloads/AI ASSITANT FULL/voice-ai-client/public/blog/is-ai-safe-for-your-business-data.png"
ASSETS_DIR = "/Users/thanospangios/Downloads/Naurra App/NaurraAI/src/assets"
LOGO_PATH = os.path.join(ASSETS_DIR, "logo.png")

EMERALD = (16, 185, 129)
EMERALD_BRIGHT = (52, 211, 153)
AMBER = (245, 158, 11)
MIDNIGHT = (10, 14, 26)
WHITE = (255, 255, 255)
MUTED = (148, 163, 184)
CARD_BG = (18, 24, 38)
NODE_BG = (22, 30, 48)


def make_layer():
    return Image.new("RGBA", (W, H), (0, 0, 0, 0))


def draw_rounded_rect(draw, bbox, radius, fill=None, outline=None, width=1):
    x0, y0, x1, y1 = [int(v) for v in bbox]
    if x1 <= x0 or y1 <= y0:
        return
    r = int(min(radius, (x1 - x0) // 2, (y1 - y0) // 2))
    if fill:
        draw.rectangle([x0 + r, y0, x1 - r, y1], fill=fill)
        draw.rectangle([x0, y0 + r, x1, y1 - r], fill=fill)
        draw.pieslice([x0, y0, x0 + 2*r, y0 + 2*r], 180, 270, fill=fill)
        draw.pieslice([x1 - 2*r, y0, x1, y0 + 2*r], 270, 360, fill=fill)
        draw.pieslice([x0, y1 - 2*r, x0 + 2*r, y1], 90, 180, fill=fill)
        draw.pieslice([x1 - 2*r, y1 - 2*r, x1, y1], 0, 90, fill=fill)
    if outline:
        draw.arc([x0, y0, x0 + 2*r, y0 + 2*r], 180, 270, fill=outline, width=width)
        draw.arc([x1 - 2*r, y0, x1, y0 + 2*r], 270, 360, fill=outline, width=width)
        draw.arc([x0, y1 - 2*r, x0 + 2*r, y1], 90, 180, fill=outline, width=width)
        draw.arc([x1 - 2*r, y1 - 2*r, x1, y1], 0, 90, fill=outline, width=width)
        draw.line([(x0 + r, y0), (x1 - r, y0)], fill=outline, width=width)
        draw.line([(x0 + r, y1), (x1 - r, y1)], fill=outline, width=width)
        draw.line([(x0, y0 + r), (x0, y1 - r)], fill=outline, width=width)
        draw.line([(x1, y0 + r), (x1, y1 - r)], fill=outline, width=width)


def make_glow(center, radius, color, intensity=40):
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    cx, cy = int(center[0]), int(center[1])
    r = max(int(radius * 0.35), 2)
    draw.ellipse([cx - r, cy - r, cx + r, cy + r],
                 fill=(*color, int(min(intensity, 255))))
    blur_r = max(int(radius * 0.65), 1)
    layer = layer.filter(ImageFilter.GaussianBlur(radius=blur_r))
    return layer


def paste_centered(img, icon, cx, cy, size):
    resized = icon.resize((size, size), Image.LANCZOS)
    layer = make_layer()
    layer.paste(resized, (int(cx) - size // 2, int(cy) - size // 2), resized)
    return Image.alpha_composite(img, layer)


def measure_text(draw, text, font):
    bb = draw.textbbox((0, 0), text, font=font)
    return bb[2] - bb[0], bb[3] - bb[1]


def draw_shield(draw, cx, cy, w, h, fill=None, outline=None, width=2):
    """Draw a shield shape: rectangle top with pointed bottom."""
    hw = w // 2
    top_h = int(h * 0.6)
    # Top rect portion
    points_top = [
        (cx - hw, cy - h // 2),                     # top-left
        (cx + hw, cy - h // 2),                     # top-right
        (cx + hw, cy - h // 2 + top_h),             # bottom-right of rect
        (cx, cy + h // 2),                          # bottom point
        (cx - hw, cy - h // 2 + top_h),             # bottom-left of rect
    ]
    if fill:
        draw.polygon(points_top, fill=fill)
    if outline:
        draw.polygon(points_top, outline=outline)
        # Redraw with thicker lines
        for i in range(len(points_top)):
            p1 = points_top[i]
            p2 = points_top[(i + 1) % len(points_top)]
            draw.line([p1, p2], fill=outline, width=width)


def main():
    logo = Image.open(LOGO_PATH).convert("RGBA")

    fp = "/System/Library/Fonts/SFNS.ttf"
    if not os.path.exists(fp):
        fp = "/System/Library/Fonts/HelveticaNeue.ttc"

    font_heading = ImageFont.truetype(fp, 34 * S)
    font_sub = ImageFont.truetype(fp, 13 * S)
    font_item = ImageFont.truetype(fp, 10 * S)
    font_check = ImageFont.truetype(fp, 9 * S)
    font_lock = ImageFont.truetype(fp, 32 * S)
    font_url = ImageFont.truetype(fp, 13 * S)

    img = Image.new("RGBA", (W, H), (*MIDNIGHT, 255))

    # Background glows
    glow1 = make_glow((W * 0.25, H * 0.45), 350 * S, EMERALD, intensity=7)
    img = Image.alpha_composite(img, glow1)
    glow2 = make_glow((W * 0.70, H * 0.48), 250 * S, EMERALD, intensity=10)
    img = Image.alpha_composite(img, glow2)

    # ── LEFT SIDE: Title ──
    left_x = 65 * S

    layer = make_layer()
    draw = ImageDraw.Draw(layer)

    t1 = "Is AI Safe for"
    draw.text((left_x, 115 * S), t1, font=font_heading, fill=(*WHITE, 255))
    t2 = "Your Business"
    draw.text((left_x, 158 * S), t2, font=font_heading, fill=(*WHITE, 255))
    t3 = "Data?"
    draw.text((left_x, 201 * S), t3, font=font_heading, fill=(*EMERALD_BRIGHT, 255))

    # Accent line
    draw.rectangle([left_x, 250 * S, left_x + 60 * S, 250 * S + 3 * S],
                   fill=(*EMERALD, 200))

    # Subtitle
    sub = "8 questions to ask before you connect."
    draw.text((left_x, 264 * S), sub, font=font_sub, fill=(*MUTED, 190))

    img = Image.alpha_composite(img, layer)

    # naurra.ai bottom left
    img = paste_centered(img, logo, left_x + 14 * S, 555 * S, 28 * S)
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    draw.text((left_x + 32 * S, 546 * S), "naurra.ai", font=font_url, fill=(*MUTED, 120))
    img = Image.alpha_composite(img, layer)

    # ── RIGHT SIDE: Shield + checkpoints ──
    shield_cx = int(W * 0.68)
    shield_cy = int(H * 0.46)
    shield_w = 130 * S
    shield_h = 160 * S

    # Shield glow
    sg = make_glow((shield_cx, shield_cy), 120 * S, EMERALD, intensity=15)
    img = Image.alpha_composite(img, sg)

    # Shield shape
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    draw_shield(draw, shield_cx, shield_cy, shield_w, shield_h,
                fill=(*CARD_BG, 220), outline=(*EMERALD, 50), width=2 * S)
    img = Image.alpha_composite(img, layer)

    # Lock icon in shield center (using unicode)
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    lock = "🔒"
    # Draw a simple lock shape instead of emoji
    lk_cx = shield_cx
    lk_cy = shield_cy - 10 * S
    # Lock body
    body_w = 36 * S
    body_h = 30 * S
    draw_rounded_rect(draw, (lk_cx - body_w//2, lk_cy, lk_cx + body_w//2, lk_cy + body_h),
                      6 * S, fill=(*EMERALD, 180))
    # Lock shackle (arc)
    shk_w = 24 * S
    shk_h = 22 * S
    draw.arc([lk_cx - shk_w//2, lk_cy - shk_h, lk_cx + shk_w//2, lk_cy + 2*S],
             180, 360, fill=(*EMERALD, 180), width=4 * S)
    # Keyhole
    kh_r = 5 * S
    draw.ellipse([lk_cx - kh_r, lk_cy + 8*S, lk_cx + kh_r, lk_cy + 8*S + kh_r*2],
                 fill=(*MIDNIGHT, 255))
    draw.rectangle([lk_cx - 2*S, lk_cy + 14*S, lk_cx + 2*S, lk_cy + 22*S],
                   fill=(*MIDNIGHT, 255))
    img = Image.alpha_composite(img, layer)

    # 8 checkpoints around the shield
    checkpoints = [
        "OAuth 2.0",
        "Minimal scopes",
        "No data training",
        "Stateless",
        "Breach-safe",
        "Audit trail",
        "Instant revoke",
        "User isolation",
    ]

    orbit_r = 145 * S
    check_size = 14 * S

    for i, label in enumerate(checkpoints):
        angle = -math.pi / 2 + (2 * math.pi * i / len(checkpoints))
        px = shield_cx + orbit_r * math.cos(angle)
        py = shield_cy + orbit_r * math.sin(angle)

        # Measure text for pill size
        tmp_draw = ImageDraw.Draw(make_layer())
        tw, th = measure_text(tmp_draw, label, font_item)

        pill_w = tw + check_size + 22 * S  # check + gap + text + padding
        pill_h = th + 14 * S
        pill_x = int(px) - pill_w // 2
        pill_y = int(py) - pill_h // 2

        # Pill background
        layer = make_layer()
        draw = ImageDraw.Draw(layer)
        draw_rounded_rect(draw, (pill_x, pill_y, pill_x + pill_w, pill_y + pill_h),
                          pill_h // 2, fill=(*NODE_BG, 225))
        draw_rounded_rect(draw, (pill_x, pill_y, pill_x + pill_w, pill_y + pill_h),
                          pill_h // 2, outline=(*EMERALD, 30), width=1 * S)

        # Green check circle
        chk_cx = pill_x + 7 * S + check_size // 2
        chk_cy = int(py)
        chk_r = check_size // 2
        draw.ellipse([chk_cx - chk_r, chk_cy - chk_r, chk_cx + chk_r, chk_cy + chk_r],
                     fill=(*EMERALD, 200))
        ctw, cth = measure_text(draw, "✓", font_check)
        draw.text((chk_cx - ctw // 2, chk_cy - cth // 2 - 1 * S), "✓",
                  font=font_check, fill=(*WHITE, 255))

        # Label text
        draw.text((chk_cx + chk_r + 6 * S, int(py) - th // 2), label,
                  font=font_item, fill=(*WHITE, 200))
        img = Image.alpha_composite(img, layer)

        # Subtle connection line to shield
        layer = make_layer()
        draw = ImageDraw.Draw(layer)
        # Line from pill toward shield edge
        line_end_x = shield_cx + (shield_w // 2 - 10*S) * math.cos(angle)
        line_end_y = shield_cy + (shield_h // 2 - 10*S) * math.sin(angle)
        draw.line([(int(px), int(py)), (int(line_end_x), int(line_end_y))],
                  fill=(*EMERALD, 15), width=1 * S)
        img = Image.alpha_composite(img, layer)

    # "8/8 passed" badge
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    badge = "8/8 passed"
    btw, bth = measure_text(draw, badge, font_check)
    bx = shield_cx - btw // 2
    by = shield_cy + shield_h // 2 + 20 * S
    draw.text((bx, by), badge, font=font_check, fill=(*EMERALD_BRIGHT, 150))
    img = Image.alpha_composite(img, layer)

    # Final
    img = img.convert("RGB")
    img.save(OUTPUT, "PNG", quality=100)
    print(f"Done: {OUTPUT} ({os.path.getsize(OUTPUT) / 1024:.0f} KB)")


if __name__ == "__main__":
    main()
