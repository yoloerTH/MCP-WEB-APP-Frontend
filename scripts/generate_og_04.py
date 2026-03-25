"""
OG Image for Blog: "Smart Calendar Management: AI-Powered Scheduling in 2026"
Calendar icon + time blocks visual
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

S = 2
W, H = 1200 * S, 630 * S

BASE_DIR = "/Users/thanospangios/Downloads/AI ASSITANT FULL/voice-ai-client/public/blog"
OUTPUT = os.path.join(BASE_DIR, "google-calendar-ai-scheduling.png")
LOGO_PATH = "/Users/thanospangios/Downloads/Naurra App/NaurraAI/src/assets/logo.png"
ICONS_DIR = "/Users/thanospangios/Downloads/AI ASSITANT FULL/voice-ai-client/public/google-icons"

MIDNIGHT = (10, 14, 26)
CARD_BG = (18, 24, 38)
EMERALD = (16, 185, 129)
EMERALD_BRIGHT = (52, 211, 153)
WHITE = (255, 255, 255)
MUTED = (148, 163, 184)
CAL_BLUE = (66, 133, 244)

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
    cal_icon = Image.open(os.path.join(ICONS_DIR, "calendar.png")).convert("RGBA")

    fp = "/System/Library/Fonts/SFNS.ttf"
    if not os.path.exists(fp):
        fp = "/System/Library/Fonts/HelveticaNeue.ttc"

    font_category = ImageFont.truetype(fp, 16 * S)
    font_title = ImageFont.truetype(fp, 34 * S)
    font_subtitle = ImageFont.truetype(fp, 18 * S)
    font_url = ImageFont.truetype(fp, 16 * S)
    font_time = ImageFont.truetype(fp, 11 * S)
    font_event = ImageFont.truetype(fp, 12 * S)
    font_stat_num = ImageFont.truetype(fp, 28 * S)
    font_stat_label = ImageFont.truetype(fp, 12 * S)

    img = Image.new("RGBA", (W, H), (*MIDNIGHT, 255))

    img = Image.alpha_composite(img, make_glow((W * 0.75, H * 0.35), 350 * S, CAL_BLUE, 15))
    img = Image.alpha_composite(img, make_glow((W * 0.3, H * 0.8), 250 * S, EMERALD, 12))

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
    draw.text((left_x, 95 * S), "Smart Calendar", font=font_title, fill=(*WHITE, 255))
    draw.text((left_x, 140 * S), "Management with AI", font=font_title, fill=(*EMERALD_BRIGHT, 255))
    img = Image.alpha_composite(img, layer)

    # Subtitle
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    draw.text((left_x, 200 * S), "AI-Powered Scheduling That Saves 6+ Hours Weekly",
              font=font_subtitle, fill=(*MUTED, 200))
    img = Image.alpha_composite(img, layer)

    # Stats
    stats = [("6+", "Hours Saved\nWeekly"), ("0", "Calendar\nConflicts"), ("4hr", "Deep Work\nBlocks")]
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

    # Right side: Calendar schedule visual
    right_x = W * 0.62
    sched_y = 60 * S
    sched_w = 280 * S
    sched_h = 420 * S

    # Calendar card
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    draw_rounded_rect(draw, (right_x, sched_y, right_x + sched_w, sched_y + sched_h),
                      16 * S, fill=(*CARD_BG, 160))
    draw_rounded_rect(draw, (right_x, sched_y, right_x + sched_w, sched_y + sched_h),
                      16 * S, outline=(*CAL_BLUE, 25), width=S)
    img = Image.alpha_composite(img, layer)

    # Calendar icon at top
    img = paste_centered(img, cal_icon, int(right_x + sched_w // 2), int(sched_y + 35 * S), 45 * S)

    # Time slots
    events = [
        ("9:00", "Team Standup", EMERALD, 40),
        ("10:00", "Deep Work Block", CAL_BLUE, 70),
        ("12:00", "Lunch Break", MUTED, 30),
        ("13:00", "Client Call", EMERALD, 40),
        ("14:30", "Design Review", (168, 85, 247), 40),
        ("16:00", "Focus Time", CAL_BLUE, 50),
    ]

    slot_x = right_x + 15 * S
    slot_w = sched_w - 30 * S
    current_y = sched_y + 65 * S

    for time_str, event_name, color, height_units in events:
        h = height_units * S * 0.7

        layer = make_layer()
        draw = ImageDraw.Draw(layer)

        # Time label
        draw.text((slot_x, int(current_y + 3 * S)), time_str,
                  font=font_time, fill=(*MUTED, 150))

        # Event block
        ev_x = slot_x + 55 * S
        draw_rounded_rect(draw, (ev_x, int(current_y), ev_x + slot_w - 55 * S, int(current_y + h)),
                          6 * S, fill=(*color, 35))
        # Left accent line
        draw.rectangle([int(ev_x), int(current_y), int(ev_x + 3 * S), int(current_y + h)],
                       fill=(*color, 180))
        # Event name
        draw.text((ev_x + 10 * S, int(current_y + 5 * S)), event_name,
                  font=font_event, fill=(*WHITE, 200))

        img = Image.alpha_composite(img, layer)
        current_y += h + 6 * S

    # Bottom: logo + naurra.ai
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
