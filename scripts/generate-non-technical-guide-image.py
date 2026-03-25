"""
Blog hero image: "The Non-Technical Guide to AI"
Left: title. Right: friendly visual showing AI tool types as a pyramid/ladder,
from simple (chatbot) at bottom to custom (agent) at top.
Approachable, non-intimidating, dark midnight bg.
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math
import os

S = 3
W, H = 1200 * S, 630 * S
OUTPUT = "/Users/thanospangios/Downloads/AI ASSITANT FULL/voice-ai-client/public/blog/non-technical-guide-to-ai-for-business-owners.png"
ASSETS_DIR = "/Users/thanospangios/Downloads/Naurra App/NaurraAI/src/assets"
LOGO_PATH = os.path.join(ASSETS_DIR, "logo.png")

EMERALD = (16, 185, 129)
EMERALD_BRIGHT = (52, 211, 153)
AMBER = (245, 158, 11)
AMBER_BRIGHT = (251, 191, 36)
BLUE = (59, 130, 246)
PURPLE = (139, 92, 246)
PINK = (236, 72, 153)
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
    font_level = ImageFont.truetype(fp, 12 * S)
    font_desc = ImageFont.truetype(fp, 9 * S)
    font_num = ImageFont.truetype(fp, 10 * S)
    font_url = ImageFont.truetype(fp, 13 * S)

    img = Image.new("RGBA", (W, H), (*MIDNIGHT, 255))

    # Background glows
    glow1 = make_glow((W * 0.22, H * 0.45), 350 * S, EMERALD, intensity=7)
    img = Image.alpha_composite(img, glow1)
    glow2 = make_glow((W * 0.75, H * 0.35), 280 * S, AMBER, intensity=5)
    img = Image.alpha_composite(img, glow2)

    # ── LEFT SIDE: Title ──
    left_x = 65 * S

    layer = make_layer()
    draw = ImageDraw.Draw(layer)

    t1 = "The Non-Technical"
    draw.text((left_x, 110 * S), t1, font=font_heading, fill=(*WHITE, 255))
    t2 = "Guide to AI"
    draw.text((left_x, 155 * S), t2, font=font_heading, fill=(*EMERALD_BRIGHT, 255))

    # Accent line
    draw.rectangle([left_x, 205 * S, left_x + 60 * S, 205 * S + 3 * S],
                   fill=(*EMERALD, 200))

    # Subtitle
    sub = "What every business owner"
    draw.text((left_x, 220 * S), sub, font=font_sub, fill=(*MUTED, 190))
    sub2 = "needs to know in 2026."
    draw.text((left_x, 238 * S), sub2, font=font_sub, fill=(*MUTED, 190))

    img = Image.alpha_composite(img, layer)

    # naurra.ai bottom left
    img = paste_centered(img, logo, left_x + 14 * S, 555 * S, 28 * S)
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    draw.text((left_x + 32 * S, 546 * S), "naurra.ai", font=font_url, fill=(*MUTED, 120))
    img = Image.alpha_composite(img, layer)

    # ── RIGHT SIDE: Staircase of AI types ──
    # 5 ascending steps from bottom-right to top-right

    levels = [
        ("Chatbots", "Ask questions, get answers", MUTED, 0.3),
        ("Writing Tools", "Draft and edit content", BLUE, 0.45),
        ("Automation", "Connect apps with rules", PURPLE, 0.6),
        ("AI Assistants", "Control your workspace", EMERALD_BRIGHT, 0.8),
        ("Custom Agents", "Built for your business", AMBER_BRIGHT, 1.0),
    ]

    base_x = 500 * S
    bar_w = 180 * S
    bar_h = 42 * S
    gap_y = 10 * S
    step_x = 25 * S  # horizontal offset per step

    # Start from bottom
    total_h = len(levels) * (bar_h + gap_y)
    start_y = 500 * S

    for i, (name, desc, color, opacity) in enumerate(levels):
        bx = base_x + i * step_x
        by = start_y - i * (bar_h + gap_y)

        # Bar width grows with level
        current_w = bar_w + i * 15 * S

        # Glow behind bar
        bg = make_glow((bx + current_w // 2, by + bar_h // 2), 50 * S, color, intensity=8)
        img = Image.alpha_composite(img, bg)

        # Bar background
        layer = make_layer()
        draw = ImageDraw.Draw(layer)
        alpha = int(180 + opacity * 60)
        draw_rounded_rect(draw, (bx, by, bx + current_w, by + bar_h),
                          10 * S, fill=(*NODE_BG, alpha))
        draw_rounded_rect(draw, (bx, by, bx + current_w, by + bar_h),
                          10 * S, outline=(*color, int(30 + opacity * 40)), width=2 * S)

        # Left accent stripe
        stripe_w = 4 * S
        draw_rounded_rect(draw, (bx, by, bx + stripe_w, by + bar_h),
                          2 * S, fill=(*color, int(100 + opacity * 155)))

        img = Image.alpha_composite(img, layer)

        # Number
        layer = make_layer()
        draw = ImageDraw.Draw(layer)
        num = str(i + 1)
        ntw, nth = measure_text(draw, num, font_num)
        draw.text((bx + 14 * S, by + bar_h // 2 - nth // 2), num,
                  font=font_num, fill=(*color, 120))
        img = Image.alpha_composite(img, layer)

        # Name
        layer = make_layer()
        draw = ImageDraw.Draw(layer)
        draw.text((bx + 28 * S, by + 6 * S), name,
                  font=font_level, fill=(*color, 240))
        # Description
        draw.text((bx + 28 * S, by + 22 * S), desc,
                  font=font_desc, fill=(*MUTED, 150))
        img = Image.alpha_composite(img, layer)

    # Arrow pointing up on the right side
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    arrow_x = base_x + 4 * step_x + bar_w + 4 * 15 * S + 25 * S
    arrow_top = start_y - 4 * (bar_h + gap_y) + bar_h // 2
    arrow_bot = start_y + bar_h // 2
    # Vertical line
    draw.line([(arrow_x, arrow_bot), (arrow_x, arrow_top)],
              fill=(*EMERALD, 30), width=2 * S)
    # Arrow head
    ah = 10 * S
    draw.polygon([(arrow_x, arrow_top - 5*S),
                  (arrow_x - ah // 2, arrow_top + ah),
                  (arrow_x + ah // 2, arrow_top + ah)],
                 fill=(*EMERALD, 40))
    # "More value" label
    mv = "More"
    mvw, mvh = measure_text(draw, mv, font_desc)
    draw.text((arrow_x - mvw // 2, arrow_top - 20 * S), mv,
              font=font_desc, fill=(*EMERALD, 80))
    mv2 = "impact"
    mv2w, mv2h = measure_text(draw, mv2, font_desc)
    draw.text((arrow_x - mv2w // 2, arrow_top - 10 * S), mv2,
              font=font_desc, fill=(*EMERALD, 80))
    img = Image.alpha_composite(img, layer)

    # "No jargon" badge bottom right
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    badge = "No jargon. No hype."
    btw, bth = measure_text(draw, badge, font_desc)
    bx = base_x + 2 * step_x
    by_badge = 540 * S
    draw_rounded_rect(draw, (bx, by_badge, bx + btw + 20*S, by_badge + bth + 10*S),
                      (bth + 10*S) // 2, fill=(*EMERALD, 12))
    draw_rounded_rect(draw, (bx, by_badge, bx + btw + 20*S, by_badge + bth + 10*S),
                      (bth + 10*S) // 2, outline=(*EMERALD, 25), width=1*S)
    draw.text((bx + 10*S, by_badge + 5*S), badge, font=font_desc, fill=(*EMERALD_BRIGHT, 160))
    img = Image.alpha_composite(img, layer)

    # Final
    img = img.convert("RGB")
    img.save(OUTPUT, "PNG", quality=100)
    print(f"Done: {OUTPUT} ({os.path.getsize(OUTPUT) / 1024:.0f} KB)")


if __name__ == "__main__":
    main()
