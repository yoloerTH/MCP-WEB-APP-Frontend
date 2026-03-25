"""
Blog hero image: "A Day in the Life: Solo Founder with AI"
Left: title. Right: vertical timeline showing key moments of the day
with time stamps and short labels. Clean editorial style.
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

S = 3
W, H = 1200 * S, 630 * S
OUTPUT = "/Users/thanospangios/Downloads/AI ASSITANT FULL/voice-ai-client/public/blog/a-day-in-the-life-solo-founder-with-ai.png"
ASSETS_DIR = "/Users/thanospangios/Downloads/Naurra App/NaurraAI/src/assets"
LOGO_PATH = os.path.join(ASSETS_DIR, "logo.png")

EMERALD = (16, 185, 129)
EMERALD_BRIGHT = (52, 211, 153)
AMBER = (245, 158, 11)
AMBER_BRIGHT = (251, 191, 36)
BLUE = (59, 130, 246)
PURPLE = (139, 92, 246)
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


def main():
    logo = Image.open(LOGO_PATH).convert("RGBA")

    fp = "/System/Library/Fonts/SFNS.ttf"
    if not os.path.exists(fp):
        fp = "/System/Library/Fonts/HelveticaNeue.ttc"

    font_heading = ImageFont.truetype(fp, 34 * S)
    font_sub = ImageFont.truetype(fp, 13 * S)
    font_time = ImageFont.truetype(fp, 11 * S)
    font_event = ImageFont.truetype(fp, 10 * S)
    font_saved = ImageFont.truetype(fp, 8 * S)
    font_url = ImageFont.truetype(fp, 13 * S)
    font_stat = ImageFont.truetype(fp, 20 * S)
    font_stat_label = ImageFont.truetype(fp, 9 * S)

    img = Image.new("RGBA", (W, H), (*MIDNIGHT, 255))

    # Background glows
    glow1 = make_glow((W * 0.22, H * 0.45), 350 * S, EMERALD, intensity=7)
    img = Image.alpha_composite(img, glow1)
    glow2 = make_glow((W * 0.65, H * 0.4), 250 * S, AMBER, intensity=5)
    img = Image.alpha_composite(img, glow2)

    # ── LEFT SIDE: Title ──
    left_x = 65 * S

    layer = make_layer()
    draw = ImageDraw.Draw(layer)

    t1 = "A Day in the Life"
    draw.text((left_x, 100 * S), t1, font=font_heading, fill=(*WHITE, 255))
    t2 = "Solo Founder"
    draw.text((left_x, 145 * S), t2, font=font_heading, fill=(*WHITE, 255))
    t3 = "with AI"
    draw.text((left_x, 190 * S), t3, font=font_heading, fill=(*EMERALD_BRIGHT, 255))

    # Accent line
    draw.rectangle([left_x, 240 * S, left_x + 60 * S, 240 * S + 3 * S],
                   fill=(*EMERALD, 200))

    # Subtitle
    sub = "One person. Full business."
    draw.text((left_x, 254 * S), sub, font=font_sub, fill=(*MUTED, 190))
    sub2 = "13 hours saved every week."
    draw.text((left_x, 272 * S), sub2, font=font_sub, fill=(*EMERALD, 160))

    img = Image.alpha_composite(img, layer)

    # Stats row below subtitle
    stats = [
        ("13h", "saved/week", EMERALD_BRIGHT),
        ("3 min", "inbox", AMBER_BRIGHT),
        ("700h", "saved/year", EMERALD_BRIGHT),
    ]
    stat_y = 320 * S
    stat_x = left_x
    for val, label, color in stats:
        layer = make_layer()
        draw = ImageDraw.Draw(layer)
        vw, vh = measure_text(draw, val, font_stat)
        draw.text((stat_x, stat_y), val, font=font_stat, fill=(*color, 220))
        lw, lh = measure_text(draw, label, font_stat_label)
        draw.text((stat_x, stat_y + vh + 2*S), label, font=font_stat_label, fill=(*MUTED, 130))
        img = Image.alpha_composite(img, layer)
        stat_x += max(vw, lw) + 30 * S

    # naurra.ai bottom left
    img = paste_centered(img, logo, left_x + 14 * S, 555 * S, 28 * S)
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    draw.text((left_x + 32 * S, 546 * S), "naurra.ai", font=font_url, fill=(*MUTED, 120))
    img = Image.alpha_composite(img, layer)

    # ── RIGHT SIDE: Vertical timeline ──
    timeline_x = 560 * S
    line_x = timeline_x + 35 * S  # center of the timeline dots

    events = [
        ("6:30", "Morning briefing", "Email + calendar summary", EMERALD),
        ("7:15", "Inbox handled", "22 emails in 3 minutes", EMERALD_BRIGHT),
        ("8:40", "Meeting prep", "Auto-pulled from Drive", BLUE),
        ("10:00", "Client review", "Human: strategy + judgment", AMBER),
        ("12:15", "Lunch loose ends", "2 commands, done", EMERALD),
        ("2:30", "Admin blitz", "Expenses + files in 10 min", PURPLE),
        ("4:00", "Prospect call", "AI surfaced 6-month history", AMBER_BRIGHT),
        ("5:30", "Day summary", "Full visibility, zero anxiety", EMERALD_BRIGHT),
    ]

    start_y = 62 * S
    gap = 60 * S
    dot_r = 5 * S

    # Vertical line
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    draw.line([(line_x, start_y + dot_r), (line_x, start_y + (len(events) - 1) * gap + dot_r)],
              fill=(*EMERALD, 20), width=2 * S)
    img = Image.alpha_composite(img, layer)

    for i, (time, title, desc, color) in enumerate(events):
        ey = start_y + i * gap

        # Dot
        layer = make_layer()
        draw = ImageDraw.Draw(layer)
        draw.ellipse([line_x - dot_r, ey - dot_r, line_x + dot_r, ey + dot_r],
                     fill=(*color, 220))
        img = Image.alpha_composite(img, layer)

        # Subtle glow on dot
        dg = make_glow((line_x, ey), 15 * S, color, intensity=15)
        img = Image.alpha_composite(img, dg)

        # Time (left of line)
        layer = make_layer()
        draw = ImageDraw.Draw(layer)
        tw, th = measure_text(draw, time, font_time)
        draw.text((line_x - dot_r - 10*S - tw, ey - th // 2), time,
                  font=font_time, fill=(*color, 200))
        img = Image.alpha_composite(img, layer)

        # Event title + desc (right of line)
        layer = make_layer()
        draw = ImageDraw.Draw(layer)
        draw.text((line_x + dot_r + 12*S, ey - 10*S), title,
                  font=font_event, fill=(*WHITE, 220))
        draw.text((line_x + dot_r + 12*S, ey + 4*S), desc,
                  font=font_saved, fill=(*MUTED, 140))
        img = Image.alpha_composite(img, layer)

    # Final
    img = img.convert("RGB")
    img.save(OUTPUT, "PNG", quality=100)
    print(f"Done: {OUTPUT} ({os.path.getsize(OUTPUT) / 1024:.0f} KB)")


if __name__ == "__main__":
    main()
