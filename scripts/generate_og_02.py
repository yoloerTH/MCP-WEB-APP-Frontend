"""
OG Image for Blog: "Voice AI vs Traditional Virtual Assistants: Which is Better?"
Two-panel comparison design
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os, math

S = 2
W, H = 1200 * S, 630 * S

BASE_DIR = "/Users/thanospangios/Downloads/AI ASSITANT FULL/voice-ai-client/public/blog"
OUTPUT = os.path.join(BASE_DIR, "voice-ai-vs-traditional-assistants.png")
LOGO_PATH = "/Users/thanospangios/Downloads/Naurra App/NaurraAI/src/assets/logo.png"

MIDNIGHT = (10, 14, 26)
CARD_BG = (18, 24, 38)
EMERALD = (16, 185, 129)
EMERALD_BRIGHT = (52, 211, 153)
GOLD = (245, 158, 11)
GOLD_BRIGHT = (251, 191, 36)
WHITE = (255, 255, 255)
MUTED = (148, 163, 184)
RED_DIM = (239, 68, 68)

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
    font_panel_title = ImageFont.truetype(fp, 20 * S)
    font_item = ImageFont.truetype(fp, 14 * S)
    font_vs = ImageFont.truetype(fp, 28 * S)

    img = Image.new("RGBA", (W, H), (*MIDNIGHT, 255))

    # Glows
    img = Image.alpha_composite(img, make_glow((W * 0.3, H * 0.3), 350 * S, EMERALD, 15))
    img = Image.alpha_composite(img, make_glow((W * 0.7, H * 0.7), 300 * S, GOLD, 15))

    left_x = 60 * S

    # Category badge
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    cat_text = "COMPARISON"
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
    draw.text((left_x, 95 * S), "Voice AI vs Traditional", font=font_title, fill=(*WHITE, 255))
    draw.text((left_x, 140 * S), "Virtual Assistants", font=font_title, fill=(*EMERALD_BRIGHT, 255))
    img = Image.alpha_composite(img, layer)

    # Subtitle
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    draw.text((left_x, 200 * S), "Which solution delivers better ROI?", font=font_subtitle, fill=(*MUTED, 200))
    img = Image.alpha_composite(img, layer)

    # Two comparison panels
    panel_y = 255 * S
    panel_w = 220 * S
    panel_h = 250 * S
    gap = 25 * S

    # LEFT PANEL - Traditional VA
    lx0 = left_x
    lx1 = lx0 + panel_w
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    draw_rounded_rect(draw, (lx0, panel_y, lx1, panel_y + panel_h), 16 * S,
                      fill=(*CARD_BG, 200))
    draw_rounded_rect(draw, (lx0, panel_y, lx1, panel_y + panel_h), 16 * S,
                      outline=(*MUTED, 30), width=S)

    bb = draw.textbbox((0, 0), "Traditional VA", font=font_panel_title)
    tw = bb[2] - bb[0]
    draw.text(((lx0 + lx1) // 2 - tw // 2, panel_y + 18 * S), "Traditional VA",
              font=font_panel_title, fill=(*MUTED, 220))

    items_left = [
        ("\u2717", "$1,500+/mo", RED_DIM),
        ("\u2717", "Limited hours", RED_DIM),
        ("\u2713", "Creative judgment", EMERALD_BRIGHT),
        ("\u2717", "2-4 week onboard", RED_DIM),
    ]
    for i, (check, text, color) in enumerate(items_left):
        y = panel_y + 65 * S + i * 40 * S
        draw.text((lx0 + 20 * S, y), check, font=font_item, fill=(*color, 220))
        draw.text((lx0 + 42 * S, y), text, font=font_item, fill=(*WHITE, 180))

    img = Image.alpha_composite(img, layer)

    # VS circle
    vs_cx = lx1 + gap // 2
    vs_cy = panel_y + panel_h // 2
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    r = 22 * S
    draw.ellipse([vs_cx - r, vs_cy - r, vs_cx + r, vs_cy + r], fill=(*MIDNIGHT, 255))
    draw.ellipse([vs_cx - r, vs_cy - r, vs_cx + r, vs_cy + r], outline=(*EMERALD, 80), width=2*S)
    bb = draw.textbbox((0, 0), "VS", font=font_vs)
    vw = bb[2] - bb[0]
    vh = bb[3] - bb[1]
    draw.text((vs_cx - vw // 2, vs_cy - vh // 2 - 4*S), "VS", font=font_vs, fill=(*EMERALD_BRIGHT, 255))
    img = Image.alpha_composite(img, layer)

    # RIGHT PANEL - Voice AI
    rx0 = lx1 + gap
    rx1 = rx0 + panel_w
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    draw_rounded_rect(draw, (rx0, panel_y, rx1, panel_y + panel_h), 16 * S,
                      fill=(*CARD_BG, 200))
    draw_rounded_rect(draw, (rx0, panel_y, rx1, panel_y + panel_h), 16 * S,
                      outline=(*EMERALD, 30), width=S)

    bb = draw.textbbox((0, 0), "Voice AI", font=font_panel_title)
    tw = bb[2] - bb[0]
    draw.text(((rx0 + rx1) // 2 - tw // 2, panel_y + 18 * S), "Voice AI",
              font=font_panel_title, fill=(*EMERALD_BRIGHT, 255))

    items_right = [
        ("\u2713", "$79/mo", EMERALD_BRIGHT),
        ("\u2713", "24/7/365", EMERALD_BRIGHT),
        ("\u2713", "Instant execution", EMERALD_BRIGHT),
        ("\u2713", "Zero setup", EMERALD_BRIGHT),
    ]
    for i, (check, text, color) in enumerate(items_right):
        y = panel_y + 65 * S + i * 40 * S
        draw.text((rx0 + 20 * S, y), check, font=font_item, fill=(*color, 220))
        draw.text((rx0 + 42 * S, y), text, font=font_item, fill=(*WHITE, 180))

    img = Image.alpha_composite(img, layer)

    # Right side visual: big "90%" savings callout
    right_cx = W * 0.78
    right_cy = H * 0.45

    img = Image.alpha_composite(img, make_glow((right_cx, right_cy), 200 * S, EMERALD, 25))

    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    font_big = ImageFont.truetype(fp, 72 * S)
    font_save_label = ImageFont.truetype(fp, 18 * S)

    bb = draw.textbbox((0, 0), "90%", font=font_big)
    tw = bb[2] - bb[0]
    draw.text((int(right_cx) - tw // 2, int(right_cy) - 55 * S), "90%",
              font=font_big, fill=(*EMERALD_BRIGHT, 255))

    label = "Cost Savings"
    bb = draw.textbbox((0, 0), label, font=font_save_label)
    tw = bb[2] - bb[0]
    draw.text((int(right_cx) - tw // 2, int(right_cy) + 50 * S), label,
              font=font_save_label, fill=(*MUTED, 200))

    label2 = "with Voice AI"
    bb = draw.textbbox((0, 0), label2, font=font_save_label)
    tw = bb[2] - bb[0]
    draw.text((int(right_cx) - tw // 2, int(right_cy) + 75 * S), label2,
              font=font_save_label, fill=(*EMERALD_BRIGHT, 160))
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
