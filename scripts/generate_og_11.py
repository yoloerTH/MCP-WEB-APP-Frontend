"""
OG Image for Blog: "The Future of Work: 7 AI Trends Reshaping Workplaces in 2026"
Big "7" + trend list
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

S = 2
W, H = 1200 * S, 630 * S

BASE_DIR = "/Users/thanospangios/Downloads/AI ASSITANT FULL/voice-ai-client/public/blog"
OUTPUT = os.path.join(BASE_DIR, "future-of-work-ai-trends-2026.png")
LOGO_PATH = "/Users/thanospangios/Downloads/Naurra App/NaurraAI/src/assets/logo.png"

MIDNIGHT = (10, 14, 26)
CARD_BG = (18, 24, 38)
EMERALD = (16, 185, 129)
EMERALD_BRIGHT = (52, 211, 153)
WHITE = (255, 255, 255)
MUTED = (148, 163, 184)
PURPLE = (139, 92, 246)
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

    fp = "/System/Library/Fonts/SFNS.ttf"
    if not os.path.exists(fp):
        fp = "/System/Library/Fonts/HelveticaNeue.ttc"

    font_category = ImageFont.truetype(fp, 16 * S)
    font_title = ImageFont.truetype(fp, 34 * S)
    font_subtitle = ImageFont.truetype(fp, 18 * S)
    font_url = ImageFont.truetype(fp, 16 * S)
    font_trend_num = ImageFont.truetype(fp, 14 * S)
    font_trend_name = ImageFont.truetype(fp, 13 * S)
    font_big = ImageFont.truetype(fp, 100 * S)
    font_label = ImageFont.truetype(fp, 20 * S)

    img = Image.new("RGBA", (W, H), (*MIDNIGHT, 255))

    img = Image.alpha_composite(img, make_glow((W * 0.78, H * 0.4), 380 * S, PURPLE, 15))
    img = Image.alpha_composite(img, make_glow((W * 0.25, H * 0.6), 250 * S, EMERALD, 12))

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
    draw.text((left_x, 95 * S), "The Future of Work", font=font_title, fill=(*WHITE, 255))
    draw.text((left_x, 140 * S), "7 AI Trends for 2026", font=font_title, fill=(*EMERALD_BRIGHT, 255))
    img = Image.alpha_composite(img, layer)

    # Subtitle
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    draw.text((left_x, 200 * S), "Stay ahead of the curve with these workplace shifts",
              font=font_subtitle, fill=(*MUTED, 200))
    img = Image.alpha_composite(img, layer)

    # Trend list
    trends = [
        "Voice-First Interfaces",
        "Autonomous AI Agents",
        "AI-Powered Personalization",
        "Seamless Integration",
        "Data-Driven Decisions",
        "Hybrid Work Intelligence",
        "Proactive AI",
    ]

    colors = [EMERALD_BRIGHT, TEAL, PURPLE, (59, 130, 246), EMERALD_BRIGHT, TEAL, PURPLE]
    trend_y = 255 * S
    trend_gap = 38 * S

    for i, (trend, color) in enumerate(zip(trends, colors)):
        y = trend_y + i * trend_gap
        layer = make_layer()
        draw = ImageDraw.Draw(layer)

        # Number circle
        num = str(i + 1)
        cr = 14 * S
        cx = left_x + cr
        cy = int(y + cr)
        draw.ellipse([cx - cr, cy - cr, cx + cr, cy + cr], fill=(*color, 40))
        draw.ellipse([cx - cr, cy - cr, cx + cr, cy + cr], outline=(*color, 100), width=S)
        bb = draw.textbbox((0, 0), num, font=font_trend_num)
        nw = bb[2] - bb[0]
        nh = bb[3] - bb[1]
        draw.text((cx - nw // 2, cy - nh // 2 - 2*S), num, font=font_trend_num, fill=(*color, 255))

        # Trend name
        draw.text((left_x + 38 * S, int(y + 4 * S)), trend,
                  font=font_trend_name, fill=(*WHITE, 200))

        img = Image.alpha_composite(img, layer)

    # Right side: giant "7" with glow
    right_cx = W * 0.78
    right_cy = H * 0.42

    img = Image.alpha_composite(img, make_glow((right_cx, right_cy), 250 * S, PURPLE, 20))

    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    bb = draw.textbbox((0, 0), "7", font=font_big)
    tw = bb[2] - bb[0]
    th = bb[3] - bb[1]
    draw.text((int(right_cx) - tw // 2, int(right_cy) - th // 2 - 20 * S), "7",
              font=font_big, fill=(*EMERALD_BRIGHT, 255))

    label = "AI Trends"
    bb = draw.textbbox((0, 0), label, font=font_label)
    lw = bb[2] - bb[0]
    draw.text((int(right_cx) - lw // 2, int(right_cy) + 65 * S), label,
              font=font_label, fill=(*WHITE, 200))

    sub = "Reshaping 2026"
    bb = draw.textbbox((0, 0), sub, font=font_url)
    sw = bb[2] - bb[0]
    draw.text((int(right_cx) - sw // 2, int(right_cy) + 95 * S), sub,
              font=font_url, fill=(*PURPLE, 180))
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
