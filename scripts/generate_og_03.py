"""
OG Image for Blog: "10 Gmail Automation Tips That Will Save You Hours"
Gmail icon prominent + tip count visual
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os, math

S = 2
W, H = 1200 * S, 630 * S

BASE_DIR = "/Users/thanospangios/Downloads/AI ASSITANT FULL/voice-ai-client/public/blog"
OUTPUT = os.path.join(BASE_DIR, "gmail-automation-tips.png")
LOGO_PATH = "/Users/thanospangios/Downloads/Naurra App/NaurraAI/src/assets/logo.png"
ICONS_DIR = "/Users/thanospangios/Downloads/AI ASSITANT FULL/voice-ai-client/public/google-icons"

MIDNIGHT = (10, 14, 26)
CARD_BG = (18, 24, 38)
EMERALD = (16, 185, 129)
EMERALD_BRIGHT = (52, 211, 153)
WHITE = (255, 255, 255)
MUTED = (148, 163, 184)
GMAIL_RED = (234, 67, 53)

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
    gmail_icon = Image.open(os.path.join(ICONS_DIR, "gmail.png")).convert("RGBA")

    fp = "/System/Library/Fonts/SFNS.ttf"
    if not os.path.exists(fp):
        fp = "/System/Library/Fonts/HelveticaNeue.ttc"

    font_category = ImageFont.truetype(fp, 16 * S)
    font_title = ImageFont.truetype(fp, 34 * S)
    font_subtitle = ImageFont.truetype(fp, 18 * S)
    font_url = ImageFont.truetype(fp, 16 * S)
    font_tip = ImageFont.truetype(fp, 13 * S)
    font_big_num = ImageFont.truetype(fp, 90 * S)
    font_tips_label = ImageFont.truetype(fp, 22 * S)

    img = Image.new("RGBA", (W, H), (*MIDNIGHT, 255))

    # Glows
    img = Image.alpha_composite(img, make_glow((W * 0.75, H * 0.4), 350 * S, GMAIL_RED, 15))
    img = Image.alpha_composite(img, make_glow((W * 0.25, H * 0.7), 250 * S, EMERALD, 12))

    left_x = 60 * S

    # Category badge
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
    draw.text((left_x, 95 * S), "10 Gmail Automation", font=font_title, fill=(*WHITE, 255))
    draw.text((left_x, 140 * S), "Tips That Save Hours", font=font_title, fill=(*EMERALD_BRIGHT, 255))
    img = Image.alpha_composite(img, layer)

    # Subtitle
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    draw.text((left_x, 200 * S), "Master inbox zero with AI-powered email management", font=font_subtitle, fill=(*MUTED, 200))
    img = Image.alpha_composite(img, layer)

    # Tip preview cards - 2x3 grid
    tips = ["Voice Send", "Smart Sort", "Templates", "Scheduled", "Batch Process", "Inbox Zero"]
    card_w = 140 * S
    card_h = 55 * S
    gap_x = 15 * S
    gap_y = 12 * S
    grid_x = left_x
    grid_y = 250 * S

    for i, tip in enumerate(tips):
        col = i % 3
        row = i // 3
        cx0 = grid_x + col * (card_w + gap_x)
        cy0 = grid_y + row * (card_h + gap_y)

        layer = make_layer()
        draw = ImageDraw.Draw(layer)
        draw_rounded_rect(draw, (cx0, cy0, cx0 + card_w, cy0 + card_h), 10 * S,
                          fill=(*CARD_BG, 180))
        draw_rounded_rect(draw, (cx0, cy0, cx0 + card_w, cy0 + card_h), 10 * S,
                          outline=(*EMERALD, 20), width=S)

        # Number
        num = str(i + 1)
        draw.text((cx0 + 12 * S, cy0 + 10 * S), num, font=font_tip, fill=(*EMERALD_BRIGHT, 200))
        # Tip name
        draw.text((cx0 + 30 * S, cy0 + 10 * S), tip, font=font_tip, fill=(*WHITE, 180))
        # Checkmark
        draw.text((cx0 + card_w - 25 * S, cy0 + 10 * S), "\u2713", font=font_tip, fill=(*EMERALD_BRIGHT, 150))

        img = Image.alpha_composite(img, layer)

    # Right side: big Gmail icon + "10" number
    right_cx = W * 0.78
    right_cy = H * 0.40

    img = Image.alpha_composite(img, make_glow((right_cx, right_cy), 200 * S, GMAIL_RED, 20))

    # Gmail icon large
    img = paste_centered(img, gmail_icon, int(right_cx), int(right_cy) - 20 * S, 100 * S)

    # Big "10" below
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    bb = draw.textbbox((0, 0), "10", font=font_big_num)
    tw = bb[2] - bb[0]
    draw.text((int(right_cx) - tw // 2, int(right_cy) + 40 * S), "10",
              font=font_big_num, fill=(*WHITE, 40))
    img = Image.alpha_composite(img, layer)

    # "Pro Tips" label
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    label = "Pro Tips"
    bb = draw.textbbox((0, 0), label, font=font_tips_label)
    tw = bb[2] - bb[0]
    draw.text((int(right_cx) - tw // 2, int(right_cy) + 130 * S), label,
              font=font_tips_label, fill=(*EMERALD_BRIGHT, 180))
    img = Image.alpha_composite(img, layer)

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
