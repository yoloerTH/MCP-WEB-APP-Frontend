"""
OG Image for Blog: "How to Streamline Team Communication in Google Workspace with AI"
Connected Google services flowing through a central AI hub
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os, math

S = 2
W, H = 1200 * S, 630 * S

BASE_DIR = "/Users/thanospangios/Downloads/AI ASSITANT FULL/voice-ai-client/public/blog"
OUTPUT = os.path.join(BASE_DIR, "streamline-team-communication-google-workspace.png")
LOGO_PATH = "/Users/thanospangios/Downloads/Naurra App/NaurraAI/src/assets/logo.png"
ICONS_DIR = "/Users/thanospangios/Downloads/AI ASSITANT FULL/voice-ai-client/public/google-icons"

MIDNIGHT = (10, 14, 26)
CARD_BG = (18, 24, 38)
EMERALD = (16, 185, 129)
EMERALD_BRIGHT = (52, 211, 153)
WHITE = (255, 255, 255)
MUTED = (148, 163, 184)
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
    icons = {}
    for name in ["gmail", "calendar", "drive", "docs", "sheets", "meet"]:
        icons[name] = Image.open(os.path.join(ICONS_DIR, f"{name}.png")).convert("RGBA")

    fp = "/System/Library/Fonts/SFNS.ttf"
    if not os.path.exists(fp):
        fp = "/System/Library/Fonts/HelveticaNeue.ttc"

    font_category = ImageFont.truetype(fp, 16 * S)
    font_title = ImageFont.truetype(fp, 34 * S)
    font_subtitle = ImageFont.truetype(fp, 18 * S)
    font_url = ImageFont.truetype(fp, 16 * S)
    font_stat_num = ImageFont.truetype(fp, 28 * S)
    font_stat_label = ImageFont.truetype(fp, 12 * S)
    font_flow = ImageFont.truetype(fp, 10 * S)

    img = Image.new("RGBA", (W, H), (*MIDNIGHT, 255))

    img = Image.alpha_composite(img, make_glow((W * 0.75, H * 0.4), 350 * S, EMERALD, 15))
    img = Image.alpha_composite(img, make_glow((W * 0.3, H * 0.7), 250 * S, TEAL, 10))

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
    draw.text((left_x, 95 * S), "Streamline Team", font=font_title, fill=(*WHITE, 255))
    draw.text((left_x, 140 * S), "Communication with AI", font=font_title, fill=(*EMERALD_BRIGHT, 255))
    img = Image.alpha_composite(img, layer)

    # Subtitle
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    draw.text((left_x, 200 * S), "One voice command across all Google Workspace tools",
              font=font_subtitle, fill=(*MUTED, 200))
    img = Image.alpha_composite(img, layer)

    # Stats
    stats = [("15+", "Hours Saved\nWeekly"), ("74x", "Daily Email\nChecks Reduced"), ("1,200", "App Switches\nEliminated")]
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

    # Right side: flow diagram — icons on left flowing through Naurra hub to output
    flow_cx = W * 0.75
    flow_cy = H * 0.43

    # Input icons (left column)
    input_icons = ["gmail", "calendar", "drive"]
    input_x = flow_cx - 130 * S
    for i, name in enumerate(input_icons):
        iy = flow_cy - 80 * S + i * 80 * S
        # Arrow line to center
        layer = make_layer()
        draw = ImageDraw.Draw(layer)
        draw.line([(int(input_x + 25 * S), int(iy)), (int(flow_cx - 35 * S), int(flow_cy))],
                  fill=(*EMERALD, 30), width=2*S)
        img = Image.alpha_composite(img, layer)
        img = paste_centered(img, icons[name], int(input_x), int(iy), 40 * S)

    # Central Naurra hub
    img = Image.alpha_composite(img, make_glow((flow_cx, flow_cy), 120 * S, EMERALD, 30))
    img = paste_centered(img, logo, int(flow_cx), int(flow_cy), 55 * S)

    # Output icons (right column)
    output_icons = ["docs", "sheets", "meet"]
    output_x = flow_cx + 130 * S
    for i, name in enumerate(output_icons):
        oy = flow_cy - 80 * S + i * 80 * S
        # Arrow from center
        layer = make_layer()
        draw = ImageDraw.Draw(layer)
        draw.line([(int(flow_cx + 35 * S), int(flow_cy)), (int(output_x - 25 * S), int(oy))],
                  fill=(*EMERALD, 30), width=2*S)
        img = Image.alpha_composite(img, layer)
        img = paste_centered(img, icons[name], int(output_x), int(oy), 40 * S)

    # "One AI" label under hub
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    label = "One AI Hub"
    bb = draw.textbbox((0, 0), label, font=font_flow)
    lw = bb[2] - bb[0]
    draw.text((int(flow_cx) - lw // 2, int(flow_cy + 40 * S)), label,
              font=font_flow, fill=(*EMERALD_BRIGHT, 180))
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
