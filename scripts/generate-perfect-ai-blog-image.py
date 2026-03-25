"""
Blog hero image: "What the Perfect AI Looks Like for Your Business"
7 attribute checklist in a clean editorial layout.
Dark midnight bg, emerald checkmarks, polished typography.
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

S = 3
W, H = 1200 * S, 630 * S
OUTPUT = "/Users/thanospangios/Downloads/AI ASSITANT FULL/voice-ai-client/public/blog/what-the-perfect-ai-looks-like-for-your-business.png"
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
CHECK_BG = (16, 185, 129)


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
    font_heading_em = ImageFont.truetype(fp, 34 * S)
    font_sub = ImageFont.truetype(fp, 13 * S)
    font_item = ImageFont.truetype(fp, 12 * S)
    font_check = ImageFont.truetype(fp, 11 * S)
    font_url = ImageFont.truetype(fp, 13 * S)
    font_num = ImageFont.truetype(fp, 9 * S)

    img = Image.new("RGBA", (W, H), (*MIDNIGHT, 255))

    # Subtle background glows
    glow1 = make_glow((W * 0.2, H * 0.4), 400 * S, EMERALD, intensity=8)
    img = Image.alpha_composite(img, glow1)
    glow2 = make_glow((W * 0.8, H * 0.6), 300 * S, AMBER, intensity=5)
    img = Image.alpha_composite(img, glow2)

    # ── LEFT SIDE: Title ──
    left_x = 65 * S

    layer = make_layer()
    draw = ImageDraw.Draw(layer)

    # Title
    t1 = "What the Perfect AI"
    draw.text((left_x, 100 * S), t1, font=font_heading, fill=(*WHITE, 255))
    t2 = "Looks Like for"
    draw.text((left_x, 143 * S), t2, font=font_heading, fill=(*WHITE, 255))
    t3 = "Your Business"
    draw.text((left_x, 186 * S), t3, font=font_heading, fill=(*EMERALD_BRIGHT, 255))

    # Accent line
    draw.rectangle([left_x, 236 * S, left_x + 60 * S, 236 * S + 3 * S],
                   fill=(*EMERALD, 200))

    # Subtitle
    sub = "The 7-attribute framework."
    draw.text((left_x, 250 * S), sub, font=font_sub, fill=(*MUTED, 200))

    img = Image.alpha_composite(img, layer)

    # naurra.ai + logo bottom left
    img = paste_centered(img, logo, left_x + 14 * S, 555 * S, 28 * S)
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    draw.text((left_x + 32 * S, 546 * S), "naurra.ai", font=font_url, fill=(*MUTED, 120))
    img = Image.alpha_composite(img, layer)

    # ── RIGHT SIDE: Checklist cards ──
    attributes = [
        "Works where you work",
        "Natural language",
        "Takes actions",
        "Learns patterns",
        "Scales to teams",
        "Secure by default",
        "Measurable ROI",
    ]

    # Layout: two columns of cards on the right
    col1_x = 480 * S
    col2_x = 700 * S
    start_y = 72 * S
    card_w = 195 * S
    card_h = 50 * S
    gap_y = 12 * S
    check_size = 20 * S

    for i, attr in enumerate(attributes):
        if i < 4:
            cx = col1_x
            cy = start_y + i * (card_h + gap_y)
        else:
            cx = col2_x
            cy = start_y + (i - 4) * (card_h + gap_y)

        # Card background
        layer = make_layer()
        draw = ImageDraw.Draw(layer)
        draw_rounded_rect(draw, (cx, cy, cx + card_w, cy + card_h), 12 * S,
                          fill=(*NODE_BG, 220))
        draw_rounded_rect(draw, (cx, cy, cx + card_w, cy + card_h), 12 * S,
                          outline=(*EMERALD, 20), width=1 * S)
        img = Image.alpha_composite(img, layer)

        # Checkmark circle
        layer = make_layer()
        draw = ImageDraw.Draw(layer)
        chk_x = cx + 16 * S
        chk_cy = cy + card_h // 2
        chk_r = check_size // 2
        draw.ellipse([chk_x - chk_r, chk_cy - chk_r, chk_x + chk_r, chk_cy + chk_r],
                     fill=(*EMERALD, 220))

        # Checkmark symbol
        check_text = "✓"
        tw, th = measure_text(draw, check_text, font_check)
        draw.text((chk_x - tw // 2, chk_cy - th // 2 - 1 * S), check_text,
                  font=font_check, fill=(*WHITE, 255))
        img = Image.alpha_composite(img, layer)

        # Number badge (subtle)
        layer = make_layer()
        draw = ImageDraw.Draw(layer)
        num_text = str(i + 1)
        ntw, nth = measure_text(draw, num_text, font_num)
        num_x = cx + card_w - 16 * S
        draw.text((num_x - ntw // 2, chk_cy - nth // 2), num_text,
                  font=font_num, fill=(*MUTED, 80))
        img = Image.alpha_composite(img, layer)

        # Attribute text
        layer = make_layer()
        draw = ImageDraw.Draw(layer)
        text_x = chk_x + chk_r + 12 * S
        tw, th = measure_text(draw, attr, font_item)
        draw.text((text_x, chk_cy - th // 2), attr,
                  font=font_item, fill=(*WHITE, 220))
        img = Image.alpha_composite(img, layer)

    # Bottom right: subtle "7/7" indicator
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    score = "7 / 7"
    stw, sth = measure_text(draw, score, font_sub)
    score_x = col2_x + card_w - stw
    score_y = start_y + 3 * (card_h + gap_y) + card_h + 20 * S
    draw.text((score_x, score_y), score, font=font_sub, fill=(*EMERALD_BRIGHT, 160))

    lbl = "attributes"
    ltw, lth = measure_text(draw, lbl, font_num)
    draw.text((score_x + stw - ltw, score_y + sth + 4 * S), lbl,
              font=font_num, fill=(*MUTED, 100))
    img = Image.alpha_composite(img, layer)

    # Decorative: subtle connecting dots between columns
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    for i in range(3):
        dot_y = start_y + i * (card_h + gap_y) + card_h // 2
        dot_x = col1_x + card_w + (col2_x - col1_x - card_w) // 2
        draw.ellipse([int(dot_x - 2*S), int(dot_y - 2*S),
                      int(dot_x + 2*S), int(dot_y + 2*S)],
                     fill=(*EMERALD, 30))
    img = Image.alpha_composite(img, layer)

    # Final
    img = img.convert("RGB")
    img.save(OUTPUT, "PNG", quality=100)
    print(f"Done: {OUTPUT} ({os.path.getsize(OUTPUT) / 1024:.0f} KB)")


if __name__ == "__main__":
    main()
