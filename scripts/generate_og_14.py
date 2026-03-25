"""
OG Image for Blog: "The Complete Guide to Google Workspace Voice Commands with AI"
50+ commands + microphone/voice visual + Google icons
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os, math, random

S = 2
W, H = 1200 * S, 630 * S

BASE_DIR = "/Users/thanospangios/Downloads/AI ASSITANT FULL/voice-ai-client/public/blog"
OUTPUT = os.path.join(BASE_DIR, "google-workspace-voice-commands-guide.png")
LOGO_PATH = "/Users/thanospangios/Downloads/Naurra App/NaurraAI/src/assets/logo.png"
ICONS_DIR = "/Users/thanospangios/Downloads/AI ASSITANT FULL/voice-ai-client/public/google-icons"

MIDNIGHT = (10, 14, 26)
CARD_BG = (18, 24, 38)
EMERALD = (16, 185, 129)
EMERALD_BRIGHT = (52, 211, 153)
WHITE = (255, 255, 255)
MUTED = (148, 163, 184)
TEAL = (20, 184, 166)

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

def main():
    logo = Image.open(LOGO_PATH).convert("RGBA")
    icons = {}
    for name in ["gmail", "calendar", "drive", "docs", "sheets"]:
        icons[name] = Image.open(os.path.join(ICONS_DIR, f"{name}.png")).convert("RGBA")

    fp = "/System/Library/Fonts/SFNS.ttf"
    if not os.path.exists(fp):
        fp = "/System/Library/Fonts/HelveticaNeue.ttc"

    font_category = ImageFont.truetype(fp, 16 * S)
    font_title = ImageFont.truetype(fp, 34 * S)
    font_subtitle = ImageFont.truetype(fp, 18 * S)
    font_url = ImageFont.truetype(fp, 16 * S)
    font_cmd = ImageFont.truetype(fp, 10 * S)
    font_section = ImageFont.truetype(fp, 12 * S)
    font_big = ImageFont.truetype(fp, 70 * S)
    font_label = ImageFont.truetype(fp, 18 * S)

    img = Image.new("RGBA", (W, H), (*MIDNIGHT, 255))

    img = Image.alpha_composite(img, make_glow((W * 0.75, H * 0.4), 380 * S, EMERALD, 15))
    img = Image.alpha_composite(img, make_glow((W * 0.25, H * 0.65), 250 * S, TEAL, 10))

    left_x = 60 * S

    # Category
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    cat_text = "TUTORIALS"
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
    draw.text((left_x, 95 * S), "Google Workspace", font=font_title, fill=(*WHITE, 255))
    draw.text((left_x, 140 * S), "Voice Commands Guide", font=font_title, fill=(*EMERALD_BRIGHT, 255))
    img = Image.alpha_composite(img, layer)

    # Subtitle
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    draw.text((left_x, 200 * S), "50+ voice commands for Gmail, Calendar, Drive & more",
              font=font_subtitle, fill=(*MUTED, 200))
    img = Image.alpha_composite(img, layer)

    # Command preview sections with icons
    sections = [
        ("gmail", "Gmail", ['"Check my emails"', '"Send to John..."', '"Archive all..."']),
        ("calendar", "Calendar", ['"What\'s today?"', '"Schedule meeting..."', '"Block time..."']),
        ("drive", "Drive", ['"Find report..."', '"Share folder..."', '"Create folder..."']),
        ("docs", "Docs", ['"Create proposal..."', '"Add section..."', '"Share notes..."']),
        ("sheets", "Sheets", ['"New spreadsheet..."', '"Add row..."', '"Total column..."']),
    ]

    sec_y = 255 * S
    sec_gap = 48 * S

    for i, (icon_name, label, cmds) in enumerate(sections):
        y = sec_y + i * sec_gap
        layer = make_layer()
        draw = ImageDraw.Draw(layer)

        # Icon
        img = paste_centered(img, icons[icon_name], int(left_x + 15 * S), int(y + 12 * S), 25 * S)

        # Section label
        draw.text((left_x + 35 * S, int(y + 3 * S)), label,
                  font=font_section, fill=(*WHITE, 200))

        # Command pills
        px = left_x + 110 * S
        for cmd in cmds:
            bb = draw.textbbox((0, 0), cmd, font=font_cmd)
            pw = bb[2] - bb[0] + 14 * S
            ph = bb[3] - bb[1] + 10 * S
            draw_rounded_rect(draw, (px, int(y + 2 * S), px + pw, int(y + 2 * S + ph)),
                              ph // 2, fill=(*CARD_BG, 160))
            draw_rounded_rect(draw, (px, int(y + 2 * S), px + pw, int(y + 2 * S + ph)),
                              ph // 2, outline=(*EMERALD, 20), width=S)
            draw.text((int(px + 7 * S), int(y + 5 * S)), cmd,
                      font=font_cmd, fill=(*EMERALD_BRIGHT, 180))
            px += pw + 6 * S

        img = Image.alpha_composite(img, layer)

    # Right side: "50+" with voice wave
    right_cx = W * 0.78
    right_cy = H * 0.35

    img = Image.alpha_composite(img, make_glow((right_cx, right_cy), 220 * S, EMERALD, 20))

    # Voice waveform ring
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    random.seed(99)
    ring_r = 100 * S
    num_bars = 40
    for i in range(num_bars):
        angle = (i / num_bars) * 2 * math.pi
        bar_len = (random.random() * 0.6 + 0.4) * 25 * S
        inner_r = ring_r - bar_len // 2
        outer_r = ring_r + bar_len // 2
        x1 = int(right_cx + inner_r * math.cos(angle))
        y1 = int(right_cy + inner_r * math.sin(angle))
        x2 = int(right_cx + outer_r * math.cos(angle))
        y2 = int(right_cy + outer_r * math.sin(angle))
        alpha = int(100 + random.random() * 100)
        draw.line([(x1, y1), (x2, y2)], fill=(*EMERALD_BRIGHT, alpha), width=2*S)
    img = Image.alpha_composite(img, layer)

    # "50+" text in center
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    bb = draw.textbbox((0, 0), "50+", font=font_big)
    tw = bb[2] - bb[0]
    th = bb[3] - bb[1]
    draw.text((int(right_cx) - tw // 2, int(right_cy) - th // 2 - 10 * S), "50+",
              font=font_big, fill=(*EMERALD_BRIGHT, 255))
    img = Image.alpha_composite(img, layer)

    # Label below
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    label = "Voice Commands"
    bb = draw.textbbox((0, 0), label, font=font_label)
    lw = bb[2] - bb[0]
    draw.text((int(right_cx) - lw // 2, int(right_cy) + 95 * S), label,
              font=font_label, fill=(*WHITE, 200))
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
