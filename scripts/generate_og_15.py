"""
OG Image for Blog: "How to Automate Repetitive Tasks: Save 10+ Hours Every Week"
Checklist of tasks being automated + big "10+" hours saved counter
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os, math

S = 2
W, H = 1200 * S, 630 * S

BASE_DIR = "/Users/thanospangios/Downloads/AI ASSITANT FULL/voice-ai-client/public/blog"
OUTPUT = os.path.join(BASE_DIR, "how-to-automate-repetitive-tasks.png")
LOGO_PATH = "/Users/thanospangios/Downloads/Naurra App/NaurraAI/src/assets/logo.png"

MIDNIGHT = (10, 14, 26)
CARD_BG = (18, 24, 38)
EMERALD = (16, 185, 129)
EMERALD_BRIGHT = (52, 211, 153)
WHITE = (255, 255, 255)
MUTED = (148, 163, 184)
TEAL = (20, 184, 166)
RED_MUTED = (239, 68, 68)

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
    font_task = ImageFont.truetype(fp, 12 * S)
    font_time = ImageFont.truetype(fp, 10 * S)
    font_big = ImageFont.truetype(fp, 80 * S)
    font_label = ImageFont.truetype(fp, 20 * S)
    font_sub = ImageFont.truetype(fp, 14 * S)

    img = Image.new("RGBA", (W, H), (*MIDNIGHT, 255))

    img = Image.alpha_composite(img, make_glow((W * 0.75, H * 0.4), 380 * S, EMERALD, 15))
    img = Image.alpha_composite(img, make_glow((W * 0.25, H * 0.65), 250 * S, TEAL, 10))

    left_x = 60 * S

    # Category
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    cat_text = "PRODUCTIVITY"
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
    draw.text((left_x, 95 * S), "How to Automate", font=font_title, fill=(*WHITE, 255))
    draw.text((left_x, 140 * S), "Repetitive Tasks", font=font_title, fill=(*EMERALD_BRIGHT, 255))
    img = Image.alpha_composite(img, layer)

    # Subtitle
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    draw.text((left_x, 200 * S), "Eliminate busywork and reclaim your week",
              font=font_subtitle, fill=(*MUTED, 200))
    img = Image.alpha_composite(img, layer)

    # Task checklist with automation status
    tasks = [
        ("Email triage & replies", "5 hrs saved", True),
        ("Calendar scheduling", "2.5 hrs saved", True),
        ("File search & organizing", "2 hrs saved", True),
        ("Meeting prep & notes", "2 hrs saved", True),
        ("Status updates", "1 hr saved", True),
    ]

    task_y = 255 * S
    task_gap = 42 * S

    for i, (task_name, time_saved, automated) in enumerate(tasks):
        y = task_y + i * task_gap
        layer = make_layer()
        draw = ImageDraw.Draw(layer)

        # Task card
        card_w = 400 * S
        card_h = 34 * S
        draw_rounded_rect(draw, (left_x, int(y), left_x + card_w, int(y + card_h)),
                          8 * S, fill=(*CARD_BG, 160))

        # Checkmark circle
        ck_r = 10 * S
        ck_cx = left_x + 18 * S
        ck_cy = int(y + card_h // 2)
        draw.ellipse([ck_cx - ck_r, ck_cy - ck_r, ck_cx + ck_r, ck_cy + ck_r],
                     fill=(*EMERALD, 60))
        # Draw checkmark
        draw.line([(ck_cx - 5*S, ck_cy), (ck_cx - 1*S, ck_cy + 4*S)],
                  fill=(*EMERALD_BRIGHT, 255), width=2*S)
        draw.line([(ck_cx - 1*S, ck_cy + 4*S), (ck_cx + 6*S, ck_cy - 4*S)],
                  fill=(*EMERALD_BRIGHT, 255), width=2*S)

        # Strikethrough task name (automated = done)
        draw.text((left_x + 36 * S, int(y + 7 * S)), task_name,
                  font=font_task, fill=(*MUTED, 140))
        # Strikethrough line
        bb = draw.textbbox((left_x + 36 * S, int(y + 7 * S)), task_name, font=font_task)
        line_y = (bb[1] + bb[3]) // 2
        draw.line([(bb[0], line_y), (bb[2], line_y)], fill=(*MUTED, 100), width=S)

        # Time saved badge
        draw.text((left_x + card_w - 90 * S, int(y + 8 * S)), time_saved,
                  font=font_time, fill=(*EMERALD_BRIGHT, 200))

        img = Image.alpha_composite(img, layer)

    # Right side: big "10+" with circular progress ring
    right_cx = W * 0.78
    right_cy = H * 0.38

    img = Image.alpha_composite(img, make_glow((right_cx, right_cy), 250 * S, EMERALD, 20))

    # Progress ring (showing ~80% completion)
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    ring_r = 110 * S
    ring_w = 6 * S

    # Background ring
    draw.arc([int(right_cx - ring_r), int(right_cy - ring_r),
              int(right_cx + ring_r), int(right_cy + ring_r)],
             0, 360, fill=(*CARD_BG, 100), width=ring_w)

    # Progress arc (80% = 288 degrees)
    draw.arc([int(right_cx - ring_r), int(right_cy - ring_r),
              int(right_cx + ring_r), int(right_cy + ring_r)],
             -90, -90 + 288, fill=(*EMERALD_BRIGHT, 200), width=ring_w)
    img = Image.alpha_composite(img, layer)

    # Tick marks around the ring
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    num_ticks = 24
    for i in range(num_ticks):
        angle = (i / num_ticks) * 2 * math.pi - math.pi / 2
        inner = ring_r + 8 * S
        outer = ring_r + 16 * S
        x1 = int(right_cx + inner * math.cos(angle))
        y1 = int(right_cy + inner * math.sin(angle))
        x2 = int(right_cx + outer * math.cos(angle))
        y2 = int(right_cy + outer * math.sin(angle))
        progress = i / num_ticks
        alpha = 160 if progress < 0.8 else 40
        draw.line([(x1, y1), (x2, y2)], fill=(*EMERALD_BRIGHT, alpha), width=2*S)
    img = Image.alpha_composite(img, layer)

    # "10+" text in center
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    bb = draw.textbbox((0, 0), "10+", font=font_big)
    tw = bb[2] - bb[0]
    th = bb[3] - bb[1]
    draw.text((int(right_cx) - tw // 2, int(right_cy) - th // 2 - 15 * S), "10+",
              font=font_big, fill=(*EMERALD_BRIGHT, 255))
    img = Image.alpha_composite(img, layer)

    # Labels below
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    label = "Hours Saved"
    bb = draw.textbbox((0, 0), label, font=font_label)
    lw = bb[2] - bb[0]
    draw.text((int(right_cx) - lw // 2, int(right_cy) + 75 * S), label,
              font=font_label, fill=(*WHITE, 220))

    sub = "Every Week"
    bb = draw.textbbox((0, 0), sub, font=font_sub)
    sw = bb[2] - bb[0]
    draw.text((int(right_cx) - sw // 2, int(right_cy) + 105 * S), sub,
              font=font_sub, fill=(*EMERALD_BRIGHT, 180))
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
