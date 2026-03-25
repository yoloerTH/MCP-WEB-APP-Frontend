"""
OG Image for Blog: "AI Automation for Small Business Owners: Save 20+ Hours Per Week"
Clock/time saving + "20+" hours visual
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os, math

S = 2
W, H = 1200 * S, 630 * S

BASE_DIR = "/Users/thanospangios/Downloads/AI ASSITANT FULL/voice-ai-client/public/blog"
OUTPUT = os.path.join(BASE_DIR, "small-business-ai-automation.png")
LOGO_PATH = "/Users/thanospangios/Downloads/Naurra App/NaurraAI/src/assets/logo.png"

MIDNIGHT = (10, 14, 26)
CARD_BG = (18, 24, 38)
EMERALD = (16, 185, 129)
EMERALD_BRIGHT = (52, 211, 153)
GOLD = (245, 158, 11)
GOLD_BRIGHT = (251, 191, 36)
WHITE = (255, 255, 255)
MUTED = (148, 163, 184)

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

    fp = "/System/Library/Fonts/SFNS.ttf"
    if not os.path.exists(fp):
        fp = "/System/Library/Fonts/HelveticaNeue.ttc"

    font_category = ImageFont.truetype(fp, 16 * S)
    font_title = ImageFont.truetype(fp, 34 * S)
    font_subtitle = ImageFont.truetype(fp, 18 * S)
    font_url = ImageFont.truetype(fp, 16 * S)
    font_task = ImageFont.truetype(fp, 13 * S)
    font_hrs = ImageFont.truetype(fp, 11 * S)
    font_big = ImageFont.truetype(fp, 80 * S)
    font_label = ImageFont.truetype(fp, 20 * S)

    img = Image.new("RGBA", (W, H), (*MIDNIGHT, 255))

    img = Image.alpha_composite(img, make_glow((W * 0.75, H * 0.4), 380 * S, GOLD, 15))
    img = Image.alpha_composite(img, make_glow((W * 0.25, H * 0.7), 250 * S, EMERALD, 12))

    left_x = 60 * S

    # Category
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    cat_text = "BUSINESS"
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
    draw.text((left_x, 95 * S), "AI Automation for", font=font_title, fill=(*WHITE, 255))
    draw.text((left_x, 140 * S), "Small Business Owners", font=font_title, fill=(*EMERALD_BRIGHT, 255))
    img = Image.alpha_composite(img, layer)

    # Subtitle
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    draw.text((left_x, 200 * S), "Reclaim your week and focus on growth",
              font=font_subtitle, fill=(*MUTED, 200))
    img = Image.alpha_composite(img, layer)

    # Task breakdown bars
    tasks = [
        ("Email Management", 6, 8),
        ("Scheduling", 3, 4),
        ("Documents", 4, 5),
        ("Client Follow-ups", 3, 4),
        ("File Organization", 2, 3),
    ]

    bar_y = 260 * S
    bar_max_w = 400 * S
    bar_h = 22 * S
    bar_gap = 10 * S

    for i, (task, saved, total) in enumerate(tasks):
        y = bar_y + i * (bar_h + bar_gap)
        layer = make_layer()
        draw = ImageDraw.Draw(layer)

        # Task name
        draw.text((left_x, int(y + 2 * S)), task, font=font_task, fill=(*WHITE, 180))

        # Bar background
        bx = left_x + 160 * S
        full_w = int(bar_max_w * (total / 8))
        draw_rounded_rect(draw, (bx, int(y), bx + full_w, int(y + bar_h)),
                          bar_h // 2, fill=(*MUTED, 25))

        # Saved portion (emerald)
        saved_w = int(bar_max_w * (saved / 8))
        draw_rounded_rect(draw, (bx, int(y), bx + saved_w, int(y + bar_h)),
                          bar_h // 2, fill=(*EMERALD, 80))

        # Hours label
        draw.text((bx + full_w + 8 * S, int(y + 2 * S)),
                  f"-{saved}hr", font=font_hrs, fill=(*EMERALD_BRIGHT, 200))

        img = Image.alpha_composite(img, layer)

    # Right side: big "20+" hours saved
    right_cx = W * 0.78
    right_cy = H * 0.38

    img = Image.alpha_composite(img, make_glow((right_cx, right_cy), 220 * S, EMERALD, 22))

    # Clock ring
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    clock_r = 110 * S
    draw.arc([int(right_cx - clock_r), int(right_cy - clock_r),
              int(right_cx + clock_r), int(right_cy + clock_r)],
             0, 360, fill=(*EMERALD, 30), width=3*S)

    # Partial arc showing time saved (80% of the circle)
    draw.arc([int(right_cx - clock_r), int(right_cy - clock_r),
              int(right_cx + clock_r), int(right_cy + clock_r)],
             -90, 198, fill=(*EMERALD_BRIGHT, 150), width=5*S)

    # Clock hour marks
    for h in range(12):
        angle = (h / 12) * 2 * math.pi - math.pi / 2
        inner = clock_r - 10 * S
        outer = clock_r - 2 * S
        x1 = int(right_cx + inner * math.cos(angle))
        y1 = int(right_cy + inner * math.sin(angle))
        x2 = int(right_cx + outer * math.cos(angle))
        y2 = int(right_cy + outer * math.sin(angle))
        draw.line([(x1, y1), (x2, y2)], fill=(*MUTED, 60), width=S)

    img = Image.alpha_composite(img, layer)

    # "20+" text
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    bb = draw.textbbox((0, 0), "20+", font=font_big)
    tw = bb[2] - bb[0]
    draw.text((int(right_cx) - tw // 2, int(right_cy) - 55 * S), "20+",
              font=font_big, fill=(*EMERALD_BRIGHT, 255))

    label = "Hours Saved Weekly"
    bb = draw.textbbox((0, 0), label, font=font_label)
    lw = bb[2] - bb[0]
    draw.text((int(right_cx) - lw // 2, int(right_cy) + 45 * S), label,
              font=font_label, fill=(*WHITE, 200))

    sub = "80% admin reduction"
    bb = draw.textbbox((0, 0), sub, font=font_hrs)
    sw = bb[2] - bb[0]
    draw.text((int(right_cx) - sw // 2, int(right_cy) + 75 * S), sub,
              font=font_hrs, fill=(*EMERALD_BRIGHT, 160))
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
