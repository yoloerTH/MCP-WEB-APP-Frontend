"""
OG Image for Blog: "Organize Google Drive Like a Pro with AI"
Drive icon + folder structure visual
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

S = 2
W, H = 1200 * S, 630 * S

BASE_DIR = "/Users/thanospangios/Downloads/AI ASSITANT FULL/voice-ai-client/public/blog"
OUTPUT = os.path.join(BASE_DIR, "google-drive-organization-ai.png")
LOGO_PATH = "/Users/thanospangios/Downloads/Naurra App/NaurraAI/src/assets/logo.png"
ICONS_DIR = "/Users/thanospangios/Downloads/AI ASSITANT FULL/voice-ai-client/public/google-icons"

MIDNIGHT = (10, 14, 26)
CARD_BG = (18, 24, 38)
EMERALD = (16, 185, 129)
EMERALD_BRIGHT = (52, 211, 153)
WHITE = (255, 255, 255)
MUTED = (148, 163, 184)
DRIVE_GREEN = (15, 157, 88)
DRIVE_BLUE = (66, 133, 244)
DRIVE_YELLOW = (251, 188, 4)

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

def draw_folder_icon(draw, x, y, w, h, color, alpha=180):
    tab_w = w * 0.35
    tab_h = h * 0.18
    draw_rounded_rect(draw, (x, y, x + tab_w, y + tab_h + 4), 3 * S, fill=(*color, alpha))
    draw_rounded_rect(draw, (x, y + tab_h, x + w, y + h), 5 * S, fill=(*color, alpha))

def main():
    logo = Image.open(LOGO_PATH).convert("RGBA")
    drive_icon = Image.open(os.path.join(ICONS_DIR, "drive.png")).convert("RGBA")

    fp = "/System/Library/Fonts/SFNS.ttf"
    if not os.path.exists(fp):
        fp = "/System/Library/Fonts/HelveticaNeue.ttc"

    font_category = ImageFont.truetype(fp, 16 * S)
    font_title = ImageFont.truetype(fp, 34 * S)
    font_subtitle = ImageFont.truetype(fp, 18 * S)
    font_url = ImageFont.truetype(fp, 16 * S)
    font_folder = ImageFont.truetype(fp, 11 * S)
    font_stat_num = ImageFont.truetype(fp, 28 * S)
    font_stat_label = ImageFont.truetype(fp, 12 * S)

    img = Image.new("RGBA", (W, H), (*MIDNIGHT, 255))

    img = Image.alpha_composite(img, make_glow((W * 0.72, H * 0.35), 350 * S, DRIVE_GREEN, 12))
    img = Image.alpha_composite(img, make_glow((W * 0.25, H * 0.75), 250 * S, EMERALD, 10))

    left_x = 60 * S

    # Category
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
    draw.text((left_x, 95 * S), "Organize Google Drive", font=font_title, fill=(*WHITE, 255))
    draw.text((left_x, 140 * S), "Like a Pro with AI", font=font_title, fill=(*EMERALD_BRIGHT, 255))
    img = Image.alpha_composite(img, layer)

    # Subtitle
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    draw.text((left_x, 200 * S), "Stop wasting 19% of your time searching for files",
              font=font_subtitle, fill=(*MUTED, 200))
    img = Image.alpha_composite(img, layer)

    # Stats
    stats = [("15s", "File Search\nTime"), ("95%", "Files\nOrganized"), ("8hr", "Weekly\nSaved")]
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

    # Right side: folder tree structure
    tree_x = W * 0.62
    tree_y = 55 * S

    # Drive icon at top
    img = paste_centered(img, drive_icon, int(tree_x + 140 * S), int(tree_y + 25 * S), 50 * S)

    # Folder tree
    folders = [
        (0, "Work", DRIVE_BLUE),
        (1, "Clients", EMERALD),
        (2, "Client A", DRIVE_GREEN),
        (2, "Client B", DRIVE_GREEN),
        (1, "Internal", DRIVE_BLUE),
        (2, "Finance", DRIVE_YELLOW),
        (2, "Marketing", (168, 85, 247)),
        (0, "Archive", MUTED),
        (1, "2025", MUTED),
        (1, "2024", MUTED),
    ]

    fy = tree_y + 65 * S
    folder_h = 32 * S
    indent = 30 * S

    for depth, name, color in folders:
        fx = int(tree_x + depth * indent)
        layer = make_layer()
        draw = ImageDraw.Draw(layer)

        # Folder icon
        fw, fh = 22 * S, 16 * S
        draw_folder_icon(draw, fx, int(fy + 3 * S), fw, fh, color, 160)

        # Folder name
        draw.text((fx + fw + 8 * S, int(fy + 2 * S)), name,
                  font=font_folder, fill=(*WHITE, 190))

        # Connector line
        if depth > 0:
            line_x = int(tree_x + (depth - 1) * indent + 11 * S)
            draw.line([(line_x, int(fy)), (line_x, int(fy + folder_h // 2))],
                      fill=(*MUTED, 40), width=S)
            draw.line([(line_x, int(fy + folder_h // 2)), (fx, int(fy + folder_h // 2))],
                      fill=(*MUTED, 40), width=S)

        img = Image.alpha_composite(img, layer)
        fy += folder_h

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
