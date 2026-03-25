"""
OG Image for Blog: "Best AI Platforms for Automating Meetings and Communication in 2026"
Platform comparison tiers + Meet icon
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

S = 2
W, H = 1200 * S, 630 * S

BASE_DIR = "/Users/thanospangios/Downloads/AI ASSITANT FULL/voice-ai-client/public/blog"
OUTPUT = os.path.join(BASE_DIR, "ai-platforms-automating-meetings-communication.png")
LOGO_PATH = "/Users/thanospangios/Downloads/Naurra App/NaurraAI/src/assets/logo.png"
ICONS_DIR = "/Users/thanospangios/Downloads/AI ASSITANT FULL/voice-ai-client/public/google-icons"

MIDNIGHT = (10, 14, 26)
CARD_BG = (18, 24, 38)
EMERALD = (16, 185, 129)
EMERALD_BRIGHT = (52, 211, 153)
WHITE = (255, 255, 255)
MUTED = (148, 163, 184)
TEAL = (0, 172, 193)
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

def main():
    logo = Image.open(LOGO_PATH).convert("RGBA")
    meet_icon = Image.open(os.path.join(ICONS_DIR, "meet.png")).convert("RGBA")

    fp = "/System/Library/Fonts/SFNS.ttf"
    if not os.path.exists(fp):
        fp = "/System/Library/Fonts/HelveticaNeue.ttc"

    font_category = ImageFont.truetype(fp, 16 * S)
    font_title = ImageFont.truetype(fp, 34 * S)
    font_subtitle = ImageFont.truetype(fp, 18 * S)
    font_url = ImageFont.truetype(fp, 16 * S)
    font_tier_title = ImageFont.truetype(fp, 14 * S)
    font_tier_desc = ImageFont.truetype(fp, 10 * S)
    font_big = ImageFont.truetype(fp, 50 * S)
    font_save = ImageFont.truetype(fp, 18 * S)

    img = Image.new("RGBA", (W, H), (*MIDNIGHT, 255))

    img = Image.alpha_composite(img, make_glow((W * 0.75, H * 0.35), 350 * S, TEAL, 12))
    img = Image.alpha_composite(img, make_glow((W * 0.3, H * 0.7), 250 * S, EMERALD, 10))

    left_x = 60 * S

    # Category
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    cat_text = "INDUSTRY INSIGHTS"
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
    draw.text((left_x, 95 * S), "Best AI Platforms for", font=font_title, fill=(*WHITE, 255))
    draw.text((left_x, 140 * S), "Meetings & Communication", font=font_title, fill=(*EMERALD_BRIGHT, 255))
    img = Image.alpha_composite(img, layer)

    # Subtitle
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    draw.text((left_x, 200 * S), "Compare the top tools that eliminate meeting busywork",
              font=font_subtitle, fill=(*MUTED, 200))
    img = Image.alpha_composite(img, layer)

    # Platform tiers - stacked cards
    tiers = [
        ("Transcription", "Record & transcribe", MUTED, "~5hr saved"),
        ("Scheduling", "Automate booking", BLUE, "~3hr saved"),
        ("Email AI", "Smart inbox", PURPLE, "~5hr saved"),
        ("Full-Stack AI", "All-in-one workspace", EMERALD_BRIGHT, "~20hr saved"),
    ]

    tier_y = 255 * S
    tier_gap = 42 * S

    for i, (name, desc, color, savings) in enumerate(tiers):
        y = tier_y + i * tier_gap
        is_best = i == 3

        layer = make_layer()
        draw = ImageDraw.Draw(layer)

        card_w = 420 * S if is_best else 380 * S
        card_h = 34 * S
        cx0 = left_x
        cy0 = int(y)

        draw_rounded_rect(draw, (cx0, cy0, cx0 + card_w, cy0 + card_h), 8 * S,
                          fill=(*CARD_BG, 200 if is_best else 140))
        if is_best:
            draw_rounded_rect(draw, (cx0, cy0, cx0 + card_w, cy0 + card_h), 8 * S,
                              outline=(*EMERALD_BRIGHT, 60), width=2*S)

        # Color accent bar
        draw.rectangle([int(cx0), int(cy0 + 8 * S), int(cx0 + 4 * S), int(cy0 + card_h - 8 * S)],
                       fill=(*color, 200))

        # Name
        draw.text((cx0 + 14 * S, int(cy0 + 6 * S)), name,
                  font=font_tier_title, fill=(*color, 255))

        # Description
        draw.text((cx0 + 140 * S, int(cy0 + 8 * S)), desc,
                  font=font_tier_desc, fill=(*MUTED, 160))

        # Savings
        draw.text((cx0 + card_w - 80 * S, int(cy0 + 8 * S)), savings,
                  font=font_tier_desc, fill=(*color, 200))

        img = Image.alpha_composite(img, layer)

    # Right side: Meet icon + savings highlight
    right_cx = W * 0.78
    right_cy = H * 0.35

    img = Image.alpha_composite(img, make_glow((right_cx, right_cy), 200 * S, TEAL, 18))
    img = paste_centered(img, meet_icon, int(right_cx), int(right_cy) - 30 * S, 80 * S)

    # Big savings number
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    bb = draw.textbbox((0, 0), "$1K", font=font_big)
    tw = bb[2] - bb[0]
    draw.text((int(right_cx) - tw // 2, int(right_cy) + 30 * S), "$1K",
              font=font_big, fill=(*EMERALD_BRIGHT, 255))

    label = "Saved Monthly"
    bb = draw.textbbox((0, 0), label, font=font_save)
    lw = bb[2] - bb[0]
    draw.text((int(right_cx) - lw // 2, int(right_cy) + 95 * S), label,
              font=font_save, fill=(*WHITE, 200))

    sub = "with Full-Stack AI"
    bb = draw.textbbox((0, 0), sub, font=font_tier_desc)
    sw = bb[2] - bb[0]
    draw.text((int(right_cx) - sw // 2, int(right_cy) + 120 * S), sub,
              font=font_tier_desc, fill=(*EMERALD_BRIGHT, 160))
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
