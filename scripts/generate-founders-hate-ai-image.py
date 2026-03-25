#!/usr/bin/env python3
"""Generate blog hero image: AI for Founders Who Hate AI
Concept: A crossed-out AI chip/brain icon on the left, transforming into
a clean checkmark on the right. Skeptic to convert visual."""

from PIL import Image, ImageDraw, ImageFont
import math

S = 3
W, H = 1200 * S, 630 * S

img = Image.new('RGBA', (W, H), (10, 14, 26, 255))
draw = ImageDraw.Draw(img)

def font(size):
    try:
        return ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", size * S)
    except:
        return ImageFont.truetype("/System/Library/Fonts/SFNSText.ttf", size * S)

def font_bold(size):
    try:
        return ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", size * S, index=1)
    except:
        return ImageFont.truetype("/System/Library/Fonts/SFNSTextBold.ttf", size * S)

# Background gradient
for y in range(H):
    frac = y / H
    r = int(10 + frac * 6)
    g = int(14 + frac * 5)
    b = int(26 + frac * 12)
    draw.line([(0, y), (W, y)], fill=(r, g, b, 255))

# Subtle dot grid
for x in range(30 * S, W, 40 * S):
    for y in range(30 * S, H, 40 * S):
        draw.ellipse([x - 1, y - 1, x + 1, y + 1], fill=(255, 255, 255, 10))

# Soft glow orbs
glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
gd = ImageDraw.Draw(glow)
for r in range(180 * S, 0, -3):
    a = max(0, int(5 * (r / (180 * S))))
    gd.ellipse([200 * S - r, 320 * S - r, 200 * S + r, 320 * S + r], fill=(239, 68, 68, a))
for r in range(180 * S, 0, -3):
    a = max(0, int(5 * (r / (180 * S))))
    gd.ellipse([1000 * S - r, 320 * S - r, 1000 * S + r, 320 * S + r], fill=(16, 185, 129, a))
img = Image.alpha_composite(img, glow)
draw = ImageDraw.Draw(img)

# Top accent line
draw.rectangle([(0, 0), (W, 3 * S)], fill=(245, 158, 11, 80))

# === Title ===
title_font = font_bold(40)
title = "AI for Founders Who Hate AI"
bbox_t = draw.textbbox((0, 0), title, font=title_font)
tw = bbox_t[2] - bbox_t[0]
draw.text(((W - tw) // 2, 45 * S), title, fill=(255, 255, 255, 240), font=title_font)

# Subtitle
sub_font = font(16)
subtitle = "A no-hype, skeptic-friendly guide to what AI actually does"
bbox_s = draw.textbbox((0, 0), subtitle, font=sub_font)
sw = bbox_s[2] - bbox_s[0]
draw.text(((W - sw) // 2, 100 * S), subtitle, fill=(245, 158, 11, 150), font=sub_font)

# === LEFT SIDE: Crossed out buzzwords (the "hate" side) ===
left_cx = 300 * S
buzzwords = [
    "Revolutionary",
    "10x Everything",
    "AI-Powered Synergy",
    "Paradigm Shift",
    "Digital Transformation",
]

bw_font = font(17)
bw_y_start = 190 * S
bw_spacing = 52 * S

for i, word in enumerate(buzzwords):
    y = bw_y_start + i * bw_spacing
    bbox = draw.textbbox((0, 0), word, font=bw_font)
    ww = bbox[2] - bbox[0]
    wh = bbox[3] - bbox[1]
    x = left_cx - ww // 2

    # Text in faded red
    draw.text((x, y), word, fill=(239, 68, 68, 80), font=bw_font)

    # Strikethrough line
    line_y = y + wh // 2 + 4 * S
    draw.line([(x - 10 * S, line_y), (x + ww + 10 * S, line_y)],
              fill=(239, 68, 68, 120), width=2 * S)

# === CENTER: Arrow / divider ===
center_x = W // 2
arrow_y = 315 * S

# Vertical dashed line
for y in range(160 * S, 490 * S, 12 * S):
    draw.line([(center_x, y), (center_x, y + 6 * S)], fill=(255, 255, 255, 20), width=1)

# Arrow pointing right
arrow_size = 16 * S
draw.polygon([
    (center_x + 15 * S, arrow_y),
    (center_x + 15 * S + arrow_size, arrow_y + arrow_size // 2),
    (center_x + 15 * S, arrow_y + arrow_size),
], fill=(16, 185, 129, 80))

# === RIGHT SIDE: What AI actually does (the "real" side) ===
right_cx = 900 * S
realities = [
    ("Email in 15 min", "not 90"),
    ("Meetings fully prepped", "in seconds"),
    ("Files found instantly", "across everything"),
    ("First drafts written", "you just review"),
    ("5-8 hours back", "every week"),
]

real_font = font_bold(16)
sub_real_font = font(13)
real_y_start = 185 * S
real_spacing = 52 * S

for i, (main, sub) in enumerate(realities):
    y = real_y_start + i * real_spacing

    # Small emerald check
    check_x = right_cx - 160 * S
    check_y = y + 4 * S
    check_size = 18 * S
    draw.rounded_rectangle(
        [check_x, check_y, check_x + check_size, check_y + check_size],
        radius=4 * S,
        fill=(16, 185, 129, 30),
        outline=(16, 185, 129, 80),
        width=1
    )
    # Checkmark
    cx, cy = check_x + check_size // 2, check_y + check_size // 2
    draw.line([
        (cx - 4 * S, cy),
        (cx - 1 * S, cy + 4 * S),
        (cx + 5 * S, cy - 4 * S)
    ], fill=(16, 185, 129, 180), width=2 * S)

    # Main text
    tx = check_x + check_size + 12 * S
    draw.text((tx, y), main, fill=(255, 255, 255, 200), font=real_font)

    # Sub text
    bbox_m = draw.textbbox((0, 0), main, font=real_font)
    draw.text((tx, y + (bbox_m[3] - bbox_m[1]) + 4 * S), sub,
              fill=(16, 185, 129, 120), font=sub_real_font)

# === Bottom section ===
# Divider line
draw.line([(80 * S, H - 80 * S), (W - 80 * S, H - 80 * S)], fill=(255, 255, 255, 10), width=1)

# Quote at bottom
quote_font = font(14)
quote = '"You do not need to believe the hype. You just need to run the math."'
bbox_q = draw.textbbox((0, 0), quote, font=quote_font)
qw = bbox_q[2] - bbox_q[0]
draw.text(((W - qw) // 2, H - 62 * S), quote, fill=(255, 255, 255, 70), font=quote_font)

# Logo + brand bottom left
logo_path = '/Users/thanospangios/Downloads/AI ASSITANT FULL/voice-ai-client/public/logo-transparent.png'
logo = Image.open(logo_path).convert('RGBA')
logo_h = 26 * S
logo_w = int(logo.width * (logo_h / logo.height))
logo = logo.resize((logo_w, logo_h), Image.LANCZOS)
img.paste(logo, (50 * S, H - 105 * S), logo)
draw = ImageDraw.Draw(img)

brand_font = font_bold(14)
draw.text((50 * S + logo_w + 8 * S, H - 100 * S), "naurra.ai",
          fill=(16, 185, 129, 150), font=brand_font)

# Category pill bottom right
tag_font = font(12)
tag = "AI Strategy"
bbox_tag = draw.textbbox((0, 0), tag, font=tag_font)
tagw = bbox_tag[2] - bbox_tag[0]
pill_x = W - tagw - 60 * S
pill_y = H - 105 * S
pill_h = 26 * S
draw.rounded_rectangle(
    [pill_x - 12 * S, pill_y, pill_x + tagw + 12 * S, pill_y + pill_h],
    radius=13 * S,
    fill=(16, 185, 129, 20),
    outline=(16, 185, 129, 40),
    width=1
)
draw.text((pill_x, pill_y + 4 * S), tag, fill=(16, 185, 129, 140), font=tag_font)

# Save
final = Image.new('RGB', (W, H), (10, 14, 26))
final.paste(img, mask=img.split()[3])

output_path = '/Users/thanospangios/Downloads/AI ASSITANT FULL/voice-ai-client/public/blog/ai-for-founders-who-hate-ai.png'
final.save(output_path, 'PNG', optimize=True)
print(f"Saved: {output_path}")
print(f"Size: {final.size[0]}x{final.size[1]}")
