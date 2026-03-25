"""
OG Image for Blog: "AI Workspace Automation in 2026: The Complete Guide"
Style: Naurra brand dark theme with emerald/teal accents
Size: 1200x630 (standard OG image)
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

# Scale factor for crisp rendering
S = 2
W, H = 1200 * S, 630 * S

BASE_DIR = "/Users/thanospangios/Downloads/AI ASSITANT FULL/voice-ai-client/public/blog"
OUTPUT = os.path.join(BASE_DIR, "ai-workspace-automation-2026.png")
LOGO_PATH = "/Users/thanospangios/Downloads/Naurra App/NaurraAI/src/assets/logo.png"

# Brand colors
MIDNIGHT = (10, 14, 26)
CARD_BG = (18, 24, 38)
EMERALD = (16, 185, 129)
EMERALD_BRIGHT = (52, 211, 153)
EMERALD_DIM = (16, 185, 129, 40)
WHITE = (255, 255, 255)
MUTED = (148, 163, 184)
TEAL_GLOW = (20, 184, 166)

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

def main():
    logo = Image.open(LOGO_PATH).convert("RGBA")

    fp = "/System/Library/Fonts/SFNS.ttf"
    if not os.path.exists(fp):
        fp = "/System/Library/Fonts/HelveticaNeue.ttc"

    font_category = ImageFont.truetype(fp, 16 * S)
    font_title = ImageFont.truetype(fp, 36 * S)
    font_subtitle = ImageFont.truetype(fp, 18 * S)
    font_stat_num = ImageFont.truetype(fp, 32 * S)
    font_stat_label = ImageFont.truetype(fp, 13 * S)
    font_url = ImageFont.truetype(fp, 16 * S)

    # Base
    img = Image.new("RGBA", (W, H), (*MIDNIGHT, 255))

    # Subtle glow top-right
    glow = make_glow((W * 0.75, H * 0.2), 400 * S, EMERALD, 25)
    img = Image.alpha_composite(img, glow)

    # Subtle glow bottom-left
    glow2 = make_glow((W * 0.2, H * 0.8), 300 * S, TEAL_GLOW, 20)
    img = Image.alpha_composite(img, glow2)

    # Left content area
    left_x = 60 * S
    content_w = W * 0.55

    # Category badge
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    cat_text = "PRODUCTIVITY"
    bb = draw.textbbox((0, 0), cat_text, font=font_category)
    cat_w = bb[2] - bb[0] + 24 * S
    cat_h = bb[3] - bb[1] + 14 * S
    draw_rounded_rect(draw, (left_x, 55 * S, left_x + cat_w, 55 * S + cat_h),
                      8 * S, fill=(*EMERALD, 40))
    draw.text((left_x + 12 * S, 55 * S + 5 * S), cat_text,
              font=font_category, fill=(*EMERALD_BRIGHT, 255))
    img = Image.alpha_composite(img, layer)

    # Title - split into two lines
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    line1 = "AI Workspace"
    line2 = "Automation in 2026"
    draw.text((left_x, 110 * S), line1, font=font_title, fill=(*WHITE, 255))
    draw.text((left_x, 160 * S), line2, font=font_title, fill=(*EMERALD_BRIGHT, 255))
    img = Image.alpha_composite(img, layer)

    # Subtitle
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    sub = "The Complete Guide to Voice-Controlled"
    sub2 = "Google Workspace Productivity"
    draw.text((left_x, 225 * S), sub, font=font_subtitle, fill=(*MUTED, 200))
    draw.text((left_x, 250 * S), sub2, font=font_subtitle, fill=(*MUTED, 200))
    img = Image.alpha_composite(img, layer)

    # Stats row
    stats = [
        ("15+", "Hours Saved\nWeekly"),
        ("80%", "Tasks\nAutomated"),
        ("35+", "AI Tools\nAvailable"),
    ]

    stat_y = 310 * S
    stat_gap = 155 * S
    for i, (num, label) in enumerate(stats):
        sx = left_x + i * stat_gap
        layer = make_layer()
        draw = ImageDraw.Draw(layer)

        # Stat card background
        draw_rounded_rect(draw, (sx, stat_y, sx + 135 * S, stat_y + 100 * S),
                          12 * S, fill=(*CARD_BG, 180))
        draw_rounded_rect(draw, (sx, stat_y, sx + 135 * S, stat_y + 100 * S),
                          12 * S, outline=(*EMERALD, 25), width=S)

        # Number
        bb = draw.textbbox((0, 0), num, font=font_stat_num)
        nw = bb[2] - bb[0]
        draw.text((sx + (135 * S - nw) // 2, stat_y + 10 * S), num,
                  font=font_stat_num, fill=(*EMERALD_BRIGHT, 255))

        # Label (multiline)
        lines = label.split('\n')
        for j, line in enumerate(lines):
            bb = draw.textbbox((0, 0), line, font=font_stat_label)
            lw = bb[2] - bb[0]
            draw.text((sx + (135 * S - lw) // 2, stat_y + 58 * S + j * 18 * S),
                      line, font=font_stat_label, fill=(*MUTED, 180))

        img = Image.alpha_composite(img, layer)

    # Bottom: logo + naurra.ai
    bottom_y = H - 65 * S
    img = paste_centered(img, logo, left_x + 18 * S, bottom_y, 32 * S)

    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    draw.text((left_x + 40 * S, bottom_y - 10 * S), "naurra.ai",
              font=font_url, fill=(*MUTED, 160))
    img = Image.alpha_composite(img, layer)

    # Right side: visual element - floating service icons in a grid
    right_cx = W * 0.78
    right_cy = H * 0.45

    # Central hub glow
    hub_glow = make_glow((right_cx, right_cy), 180 * S, EMERALD, 30)
    img = Image.alpha_composite(img, hub_glow)

    # Central logo
    img = paste_centered(img, logo, int(right_cx), int(right_cy), 80 * S)

    # Ring of Google service icons around the logo
    import math
    ICONS_DIR = "/Users/thanospangios/Downloads/AI ASSITANT FULL/voice-ai-client/public/google-icons"
    services = [
        ("Gmail", "gmail.png"),
        ("Calendar", "calendar.png"),
        ("Drive", "drive.png"),
        ("Docs", "docs.png"),
        ("Sheets", "sheets.png"),
        ("Meet", "meet.png"),
        ("Tasks", "tasks.png"),
    ]

    ring_r = 140 * S
    icon_size = 40 * S

    for i, (label, icon_file) in enumerate(services):
        angle = (i / len(services)) * 2 * math.pi - math.pi / 2
        dx = int(right_cx + ring_r * math.cos(angle))
        dy = int(right_cy + ring_r * math.sin(angle))

        # Connection line
        layer = make_layer()
        draw = ImageDraw.Draw(layer)
        draw.line([(int(right_cx), int(right_cy)), (dx, dy)],
                  fill=(*EMERALD, 30), width=S)
        img = Image.alpha_composite(img, layer)

        # Google icon
        icon_path = os.path.join(ICONS_DIR, icon_file)
        if os.path.exists(icon_path):
            svc_icon = Image.open(icon_path).convert("RGBA")
            img = paste_centered(img, svc_icon, dx, dy, icon_size)

    # Save
    img = img.convert("RGB")
    img.save(OUTPUT, "PNG", quality=100)
    print(f"Done: {OUTPUT} ({os.path.getsize(OUTPUT)/1024:.0f} KB)")

if __name__ == "__main__":
    main()
