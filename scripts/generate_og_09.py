"""
OG Image for Blog: "Automate Google Docs & Sheets with AI"
Docs + Sheets icons prominent + document/spreadsheet preview
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

S = 2
W, H = 1200 * S, 630 * S

BASE_DIR = "/Users/thanospangios/Downloads/AI ASSITANT FULL/voice-ai-client/public/blog"
OUTPUT = os.path.join(BASE_DIR, "google-docs-sheets-ai-automation.png")
LOGO_PATH = "/Users/thanospangios/Downloads/Naurra App/NaurraAI/src/assets/logo.png"
ICONS_DIR = "/Users/thanospangios/Downloads/AI ASSITANT FULL/voice-ai-client/public/google-icons"

MIDNIGHT = (10, 14, 26)
CARD_BG = (18, 24, 38)
EMERALD = (16, 185, 129)
EMERALD_BRIGHT = (52, 211, 153)
WHITE = (255, 255, 255)
MUTED = (148, 163, 184)
DOCS_BLUE = (66, 133, 244)
SHEETS_GREEN = (15, 157, 88)

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
    docs_icon = Image.open(os.path.join(ICONS_DIR, "docs.png")).convert("RGBA")
    sheets_icon = Image.open(os.path.join(ICONS_DIR, "sheets.png")).convert("RGBA")

    fp = "/System/Library/Fonts/SFNS.ttf"
    if not os.path.exists(fp):
        fp = "/System/Library/Fonts/HelveticaNeue.ttc"

    font_category = ImageFont.truetype(fp, 16 * S)
    font_title = ImageFont.truetype(fp, 34 * S)
    font_subtitle = ImageFont.truetype(fp, 18 * S)
    font_url = ImageFont.truetype(fp, 16 * S)
    font_stat_num = ImageFont.truetype(fp, 28 * S)
    font_stat_label = ImageFont.truetype(fp, 12 * S)
    font_line = ImageFont.truetype(fp, 9 * S)
    font_cell = ImageFont.truetype(fp, 9 * S)

    img = Image.new("RGBA", (W, H), (*MIDNIGHT, 255))

    img = Image.alpha_composite(img, make_glow((W * 0.68, H * 0.3), 300 * S, DOCS_BLUE, 12))
    img = Image.alpha_composite(img, make_glow((W * 0.82, H * 0.6), 300 * S, SHEETS_GREEN, 12))

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
    draw.text((left_x, 95 * S), "Automate Google", font=font_title, fill=(*WHITE, 255))
    draw.text((left_x, 140 * S), "Docs & Sheets with AI", font=font_title, fill=(*EMERALD_BRIGHT, 255))
    img = Image.alpha_composite(img, layer)

    # Subtitle
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    draw.text((left_x, 200 * S), "Create documents in seconds, not hours",
              font=font_subtitle, fill=(*MUTED, 200))
    img = Image.alpha_composite(img, layer)

    # Stats
    stats = [("90%", "Time\nSaved"), ("11", "Docs Per\nWeek"), ("2min", "Avg Create\nTime")]
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

    # Right side: overlapping doc and sheet previews
    # Doc preview (back, slightly left)
    doc_x = W * 0.60
    doc_y = 55 * S
    doc_w = 190 * S
    doc_h = 260 * S

    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    draw_rounded_rect(draw, (doc_x, doc_y, doc_x + doc_w, doc_y + doc_h), 12 * S,
                      fill=(*CARD_BG, 200))
    draw_rounded_rect(draw, (doc_x, doc_y, doc_x + doc_w, doc_y + doc_h), 12 * S,
                      outline=(*DOCS_BLUE, 30), width=S)
    img = Image.alpha_composite(img, layer)

    # Docs icon
    img = paste_centered(img, docs_icon, int(doc_x + 30 * S), int(doc_y + 25 * S), 35 * S)

    # Doc lines (simulate text)
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    doc_lines = [
        ("Project Proposal", WHITE, 0.9),
        ("", WHITE, 0),
        ("Overview", DOCS_BLUE, 0.7),
        ("AI-powered workspace automation", MUTED, 0.5),
        ("delivers significant productivity", MUTED, 0.5),
        ("gains across all departments.", MUTED, 0.5),
        ("", WHITE, 0),
        ("Timeline", DOCS_BLUE, 0.7),
        ("Phase 1: Setup (Week 1)", MUTED, 0.5),
        ("Phase 2: Training (Week 2)", MUTED, 0.5),
    ]
    ly = doc_y + 55 * S
    for text, color, alpha_mult in doc_lines:
        if text:
            draw.text((int(doc_x + 15 * S), int(ly)), text,
                      font=font_line, fill=(*color, int(255 * alpha_mult)))
        ly += 18 * S
    img = Image.alpha_composite(img, layer)

    # Sheet preview (front, overlapping)
    sheet_x = W * 0.72
    sheet_y = 180 * S
    sheet_w = 210 * S
    sheet_h = 240 * S

    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    draw_rounded_rect(draw, (sheet_x, sheet_y, sheet_x + sheet_w, sheet_y + sheet_h), 12 * S,
                      fill=(*CARD_BG, 220))
    draw_rounded_rect(draw, (sheet_x, sheet_y, sheet_x + sheet_w, sheet_y + sheet_h), 12 * S,
                      outline=(*SHEETS_GREEN, 30), width=S)
    img = Image.alpha_composite(img, layer)

    # Sheets icon
    img = paste_centered(img, sheets_icon, int(sheet_x + 30 * S), int(sheet_y + 25 * S), 35 * S)

    # Spreadsheet grid
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    grid_x = sheet_x + 15 * S
    grid_y = sheet_y + 55 * S
    cols = [("Task", 70), ("Status", 50), ("Hours", 40)]
    rows = [
        ("Email", "Done", "6h"),
        ("Calendar", "Done", "3h"),
        ("Docs", "Active", "4h"),
        ("Drive", "Done", "2h"),
        ("Follow-up", "Active", "3h"),
    ]

    # Header
    cx = grid_x
    for col_name, col_w in cols:
        draw.text((int(cx), int(grid_y)), col_name, font=font_cell, fill=(*SHEETS_GREEN, 200))
        cx += col_w * S

    # Header line
    draw.line([(int(grid_x), int(grid_y + 16 * S)),
               (int(grid_x + 160 * S), int(grid_y + 16 * S))],
              fill=(*MUTED, 40), width=S)

    # Rows
    for ri, (task, status, hrs) in enumerate(rows):
        ry = grid_y + 22 * S + ri * 20 * S
        cx = grid_x
        draw.text((int(cx), int(ry)), task, font=font_cell, fill=(*WHITE, 160))
        cx += cols[0][1] * S
        status_color = EMERALD_BRIGHT if status == "Done" else (251, 191, 36)
        draw.text((int(cx), int(ry)), status, font=font_cell, fill=(*status_color, 180))
        cx += cols[1][1] * S
        draw.text((int(cx), int(ry)), hrs, font=font_cell, fill=(*MUTED, 160))

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
