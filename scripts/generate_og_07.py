"""
OG Image for Blog: "AI for Remote Teams: How Distributed Teams Stay Productive in 2026"
Globe with connected people nodes
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os, math

S = 2
W, H = 1200 * S, 630 * S

BASE_DIR = "/Users/thanospangios/Downloads/AI ASSITANT FULL/voice-ai-client/public/blog"
OUTPUT = os.path.join(BASE_DIR, "ai-for-remote-teams-2026.png")
LOGO_PATH = "/Users/thanospangios/Downloads/Naurra App/NaurraAI/src/assets/logo.png"

MIDNIGHT = (10, 14, 26)
CARD_BG = (18, 24, 38)
EMERALD = (16, 185, 129)
EMERALD_BRIGHT = (52, 211, 153)
WHITE = (255, 255, 255)
MUTED = (148, 163, 184)
TEAL = (20, 184, 166)
PURPLE = (139, 92, 246)
BLUE = (59, 130, 246)

def make_layer():
    return Image.new("RGBA", (W, H), (0, 0, 0, 0))

def draw_rounded_rect(draw, bbox, radius, fill=None, outline=None, width=1):
    x0, y0, x1, y1 = [int(v) for v in bbox]
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

def make_glow(center, radius, color, intensity=50):
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    cx, cy = int(center[0]), int(center[1])
    r = max(int(radius * 0.35), 2)
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(*color, int(min(intensity, 255))))
    layer = layer.filter(ImageFilter.GaussianBlur(radius=max(int(radius * 0.65), 1)))
    return layer

def paste_centered(img, icon, cx, cy, size):
    resized = icon.resize((size, size), Image.LANCZOS)
    layer = make_layer()
    layer.paste(resized, (int(cx) - size // 2, int(cy) - size // 2), resized)
    return Image.alpha_composite(img, layer)

def draw_person_circle(draw, cx, cy, r, color, alpha=200):
    # Head
    hr = r // 3
    draw.ellipse([cx - hr, cy - r, cx + hr, cy - r + hr * 2], fill=(*color, alpha))
    # Body arc
    br = r // 2
    draw.arc([cx - br, cy - r + hr * 2 + 2*S, cx + br, cy + br],
             0, 180, fill=(*color, alpha), width=max(2*S, 1))

def main():
    logo = Image.open(LOGO_PATH).convert("RGBA")

    fp = "/System/Library/Fonts/SFNS.ttf"
    if not os.path.exists(fp):
        fp = "/System/Library/Fonts/HelveticaNeue.ttc"

    font_category = ImageFont.truetype(fp, 16 * S)
    font_title = ImageFont.truetype(fp, 34 * S)
    font_subtitle = ImageFont.truetype(fp, 18 * S)
    font_url = ImageFont.truetype(fp, 16 * S)
    font_stat_num = ImageFont.truetype(fp, 28 * S)
    font_stat_label = ImageFont.truetype(fp, 12 * S)
    font_tz = ImageFont.truetype(fp, 10 * S)

    img = Image.new("RGBA", (W, H), (*MIDNIGHT, 255))

    img = Image.alpha_composite(img, make_glow((W * 0.75, H * 0.4), 380 * S, TEAL, 15))
    img = Image.alpha_composite(img, make_glow((W * 0.3, H * 0.7), 250 * S, EMERALD, 12))

    left_x = 60 * S

    # Category
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    cat_text = "REMOTE WORK"
    bb = draw.textbbox((0, 0), cat_text, font=font_category)
    cat_w = bb[2] - bb[0] + 24 * S
    cat_h = bb[3] - bb[1] + 14 * S
    draw_rounded_rect(draw, (left_x, 45 * S, left_x + cat_w, 45 * S + cat_h),
                      8 * S, fill=(*EMERALD, 40))
    draw.text((left_x + 12 * S, 45 * S + 5 * S), cat_text,
              font=font_category, fill=(*EMERALD_BRIGHT, 255))
    img = Image.alpha_composite(img, layer)

    # Title
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    draw.text((left_x, 95 * S), "AI for Remote Teams", font=font_title, fill=(*WHITE, 255))
    draw.text((left_x, 140 * S), "Stay Productive in 2026", font=font_title, fill=(*EMERALD_BRIGHT, 255))
    img = Image.alpha_composite(img, layer)

    # Subtitle
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    draw.text((left_x, 200 * S), "How distributed teams collaborate across time zones",
              font=font_subtitle, fill=(*MUTED, 200))
    img = Image.alpha_composite(img, layer)

    # Stats
    stats = [("73%", "Teams Have\nRemote Members"), ("35%", "Fewer\nMeetings"), ("4.2hr", "Saved Per\nPerson/Week")]
    stat_y = 260 * S
    for i, (num, label) in enumerate(stats):
        sx = left_x + i * 155 * S
        layer = make_layer()
        draw = ImageDraw.Draw(layer)
        draw_rounded_rect(draw, (sx, stat_y, sx + 135 * S, stat_y + 95 * S), 12 * S,
                          fill=(*CARD_BG, 180))
        draw_rounded_rect(draw, (sx, stat_y, sx + 135 * S, stat_y + 95 * S), 12 * S,
                          outline=(*EMERALD, 20), width=S)
        bb = draw.textbbox((0, 0), num, font=font_stat_num)
        nw = bb[2] - bb[0]
        draw.text((sx + (135 * S - nw) // 2, stat_y + 8 * S), num,
                  font=font_stat_num, fill=(*EMERALD_BRIGHT, 255))
        lines = label.split('\n')
        for j, line in enumerate(lines):
            bb = draw.textbbox((0, 0), line, font=font_stat_label)
            lw = bb[2] - bb[0]
            draw.text((sx + (135 * S - lw) // 2, stat_y + 52 * S + j * 17 * S),
                      line, font=font_stat_label, fill=(*MUTED, 180))
        img = Image.alpha_composite(img, layer)

    # Right side: connected people network
    right_cx = W * 0.77
    right_cy = H * 0.43

    # Central Naurra logo
    img = Image.alpha_composite(img, make_glow((right_cx, right_cy), 160 * S, EMERALD, 25))
    img = paste_centered(img, logo, int(right_cx), int(right_cy), 60 * S)

    # People nodes around the center
    people = [
        ("London", -60, BLUE),
        ("New York", -120, PURPLE),
        ("Tokyo", 0, TEAL),
        ("Sydney", 60, EMERALD_BRIGHT),
        ("Berlin", -30, BLUE),
        ("SF", 120, PURPLE),
    ]

    ring_r = 145 * S
    node_r = 18 * S

    for i, (city, _, color) in enumerate(people):
        angle = (i / len(people)) * 2 * math.pi - math.pi / 2
        px = int(right_cx + ring_r * math.cos(angle))
        py = int(right_cy + ring_r * math.sin(angle))

        layer = make_layer()
        draw = ImageDraw.Draw(layer)

        # Connection line
        draw.line([(int(right_cx), int(right_cy)), (px, py)],
                  fill=(*EMERALD, 35), width=S)

        # Node circle
        draw.ellipse([px - node_r, py - node_r, px + node_r, py + node_r],
                     fill=(*CARD_BG, 220))
        draw.ellipse([px - node_r, py - node_r, px + node_r, py + node_r],
                     outline=(*color, 120), width=2*S)

        # Person icon inside
        draw_person_circle(draw, px, py, node_r - 4*S, color, 180)

        # City label
        bb = draw.textbbox((0, 0), city, font=font_tz)
        tw = bb[2] - bb[0]
        draw.text((px - tw // 2, py + node_r + 4 * S), city,
                  font=font_tz, fill=(*WHITE, 150))

        img = Image.alpha_composite(img, layer)

    # Cross-connections between some nodes (mesh network)
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    connections = [(0, 2), (1, 3), (2, 4), (3, 5), (0, 4), (1, 5)]
    for a, b in connections:
        angle_a = (a / len(people)) * 2 * math.pi - math.pi / 2
        angle_b = (b / len(people)) * 2 * math.pi - math.pi / 2
        ax = int(right_cx + ring_r * math.cos(angle_a))
        ay = int(right_cy + ring_r * math.sin(angle_a))
        bx = int(right_cx + ring_r * math.cos(angle_b))
        by = int(right_cy + ring_r * math.sin(angle_b))
        draw.line([(ax, ay), (bx, by)], fill=(*EMERALD, 15), width=S)
    img = Image.alpha_composite(img, layer)

    # Bottom
    bottom_y = H - 55 * S
    img = paste_centered(img, logo, left_x + 18 * S, bottom_y, 32 * S)
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    draw.text((left_x + 40 * S, bottom_y - 10 * S), "naurra.ai",
              font=font_url, fill=(*MUTED, 160))
    img = Image.alpha_composite(img, layer)

    img = img.convert("RGB")
    img.save(OUTPUT, "PNG", quality=100)
    print(f"Done: {OUTPUT} ({os.path.getsize(OUTPUT)/1024:.0f} KB)")

if __name__ == "__main__":
    main()
