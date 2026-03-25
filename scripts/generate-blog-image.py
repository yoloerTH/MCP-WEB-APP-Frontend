"""
Blog hero image: "Custom AI Agents for Business"
Hub-and-spoke layout — Naurra logo center, 7 industry pill nodes around it
with glowing connection lines. Dark midnight bg, emerald/amber palette.
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math
import os

S = 3
W, H = 1200 * S, 630 * S  # OG image ratio (1200x630)
OUTPUT = "/Users/thanospangios/Downloads/AI ASSITANT FULL/voice-ai-client/public/blog/custom-ai-agents-for-business.png"
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

# Industry colors
COLORS = [
    (234, 67, 53),    # HVAC — red
    (66, 133, 244),   # Multi-channel — blue
    (251, 191, 36),   # Automotive — amber
    (139, 92, 246),   # Legal — purple
    (236, 72, 153),   # Fashion — pink
    (34, 197, 94),    # Travel — green
    (59, 130, 246),   # E-commerce — sky blue
]

INDUSTRIES = [
    ("HVAC", "95% faster"),
    ("CRM", "4 channels"),
    ("Automotive", "$$$ week 1"),
    ("Legal", "Days → min"),
    ("Fashion", "Virtual try-on"),
    ("Travel", "10x faster"),
    ("E-commerce", "Full auto"),
]


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


def main():
    logo = Image.open(LOGO_PATH).convert("RGBA")

    fp = "/System/Library/Fonts/SFNS.ttf"
    if not os.path.exists(fp):
        fp = "/System/Library/Fonts/HelveticaNeue.ttc"

    font_heading = ImageFont.truetype(fp, 38 * S)
    font_sub = ImageFont.truetype(fp, 15 * S)
    font_label = ImageFont.truetype(fp, 12 * S)
    font_result = ImageFont.truetype(fp, 9 * S)
    font_url = ImageFont.truetype(fp, 13 * S)

    img = Image.new("RGBA", (W, H), (*MIDNIGHT, 255))

    # Subtle background gradient orbs
    glow1 = make_glow((W * 0.25, H * 0.5), 350 * S, EMERALD, intensity=10)
    img = Image.alpha_composite(img, glow1)
    glow2 = make_glow((W * 0.72, H * 0.4), 300 * S, AMBER, intensity=6)
    img = Image.alpha_composite(img, glow2)

    # ── LEFT SIDE: Text ──
    left_x = 65 * S

    layer = make_layer()
    draw = ImageDraw.Draw(layer)

    # Title line 1
    t1 = "Custom AI Agents"
    draw.text((left_x, 130 * S), t1, font=font_heading, fill=(*WHITE, 255))

    # Title line 2 (emerald)
    t2 = "for Business"
    draw.text((left_x, 178 * S), t2, font=font_heading, fill=(*EMERALD_BRIGHT, 255))

    # Accent line
    draw.rectangle([left_x, 228 * S, left_x + 70 * S, 228 * S + 3 * S],
                   fill=(*EMERALD, 200))

    # Subtitle
    sub = "7 real projects. 7 industries. Real results."
    draw.text((left_x, 242 * S), sub, font=font_sub, fill=(*MUTED, 200))

    img = Image.alpha_composite(img, layer)

    # naurra.ai + logo bottom left
    img = paste_centered(img, logo, left_x + 14 * S, 555 * S, 28 * S)
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    draw.text((left_x + 32 * S, 546 * S), "naurra.ai", font=font_url, fill=(*MUTED, 120))
    img = Image.alpha_composite(img, layer)

    # ── RIGHT SIDE: Hub and Spoke ──
    hub_cx = W * 0.68
    hub_cy = H * 0.48
    spoke_radius = 165 * S

    # Draw connection lines (behind nodes)
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    for i in range(7):
        angle = -math.pi / 2 + (2 * math.pi * i / 7)
        nx = hub_cx + spoke_radius * math.cos(angle)
        ny = hub_cy + spoke_radius * math.sin(angle)
        color = COLORS[i]
        draw.line([(int(hub_cx), int(hub_cy)), (int(nx), int(ny))],
                  fill=(*color, 30), width=2 * S)
    img = Image.alpha_composite(img, layer)

    # Glowing midpoints on connection lines
    for i in range(7):
        angle = -math.pi / 2 + (2 * math.pi * i / 7)
        nx = hub_cx + spoke_radius * math.cos(angle)
        ny = hub_cy + spoke_radius * math.sin(angle)
        mid_x = (hub_cx + nx) / 2
        mid_y = (hub_cy + ny) / 2
        glow = make_glow((mid_x, mid_y), 35 * S, COLORS[i], intensity=12)
        img = Image.alpha_composite(img, glow)

    # Central hub glow
    hub_glow = make_glow((hub_cx, hub_cy), 100 * S, EMERALD, intensity=22)
    img = Image.alpha_composite(img, hub_glow)

    # Central hub circle
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    hub_r = 38 * S
    draw.ellipse([int(hub_cx - hub_r), int(hub_cy - hub_r),
                  int(hub_cx + hub_r), int(hub_cy + hub_r)],
                 fill=(*CARD_BG, 240))
    draw.ellipse([int(hub_cx - hub_r), int(hub_cy - hub_r),
                  int(hub_cx + hub_r), int(hub_cy + hub_r)],
                 outline=(*EMERALD, 70), width=2 * S)
    img = Image.alpha_composite(img, layer)

    # Logo in center
    img = paste_centered(img, logo, int(hub_cx), int(hub_cy), 48 * S)

    # Industry nodes — rounded rect pills instead of circles
    pad_x = 16 * S  # horizontal padding inside pill
    pad_y = 10 * S  # vertical padding inside pill
    line_gap = 4 * S  # gap between label and result text

    for i in range(7):
        angle = -math.pi / 2 + (2 * math.pi * i / 7)
        nx = hub_cx + spoke_radius * math.cos(angle)
        ny = hub_cy + spoke_radius * math.sin(angle)
        color = COLORS[i]
        name, result = INDUSTRIES[i]

        # Measure text to size the pill
        tmp_draw = ImageDraw.Draw(make_layer())
        lw, lh = measure_text(tmp_draw, name, font_label)
        rw, rh = measure_text(tmp_draw, result, font_result)
        pill_w = max(lw, rw) + pad_x * 2
        pill_h = lh + rh + line_gap + pad_y * 2
        pill_r = pill_h // 2  # fully rounded ends

        px0 = int(nx) - pill_w // 2
        py0 = int(ny) - pill_h // 2
        px1 = px0 + pill_w
        py1 = py0 + pill_h

        # Node glow
        node_glow = make_glow((nx, ny), 45 * S, color, intensity=18)
        img = Image.alpha_composite(img, node_glow)

        # Pill background
        layer = make_layer()
        draw = ImageDraw.Draw(layer)
        draw_rounded_rect(draw, (px0, py0, px1, py1), pill_r,
                          fill=(*NODE_BG, 235))
        draw_rounded_rect(draw, (px0, py0, px1, py1), pill_r,
                          outline=(*color, 50), width=2 * S)
        img = Image.alpha_composite(img, layer)

        # Text inside pill
        layer = make_layer()
        draw = ImageDraw.Draw(layer)
        # Label (industry name) — centered
        draw.text((int(nx) - lw // 2, py0 + pad_y), name,
                  font=font_label, fill=(*color, 255))
        # Result — centered below
        draw.text((int(nx) - rw // 2, py0 + pad_y + lh + line_gap), result,
                  font=font_result, fill=(*WHITE, 170))
        img = Image.alpha_composite(img, layer)

    # Outer orbit ring (subtle)
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    orbit_r = int(spoke_radius * 0.62)
    draw.ellipse([int(hub_cx - orbit_r), int(hub_cy - orbit_r),
                  int(hub_cx + orbit_r), int(hub_cy + orbit_r)],
                 outline=(*EMERALD, 12), width=1 * S)
    img = Image.alpha_composite(img, layer)

    # Final
    img = img.convert("RGB")
    img.save(OUTPUT, "PNG", quality=100)
    print(f"Done: {OUTPUT} ({os.path.getsize(OUTPUT) / 1024:.0f} KB)")


if __name__ == "__main__":
    main()
