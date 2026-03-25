#!/usr/bin/env python3
"""Generate blog hero image: The Hidden Cost of Not Using AI in 2026"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math

# 3x scale for crisp rendering
S = 3
W, H = 1200 * S, 630 * S

img = Image.new('RGBA', (W, H), (10, 14, 26, 255))
draw = ImageDraw.Draw(img)

# Load fonts
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
for x in range(40 * S, W, 40 * S):
    for y in range(40 * S, H, 40 * S):
        draw.ellipse([x - 1, y - 1, x + 1, y + 1], fill=(255, 255, 255, 12))

# Soft glow orbs (MUCH more subtle)
glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
glow_draw = ImageDraw.Draw(glow)

# Emerald glow - top left, subtle
for r in range(200 * S, 0, -3):
    a = max(0, int(6 * (r / (200 * S))))
    cx, cy = 100 * S, 80 * S
    glow_draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(16, 185, 129, a))

# Amber glow - bottom right, subtle
for r in range(180 * S, 0, -3):
    a = max(0, int(5 * (r / (180 * S))))
    cx, cy = 1100 * S, 550 * S
    glow_draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(245, 158, 11, a))

img = Image.alpha_composite(img, glow)
draw = ImageDraw.Draw(img)

# === Thin emerald accent line at top ===
draw.rectangle([(0, 0), (W, 3 * S)], fill=(16, 185, 129, 100))

# === Title ===
title_font = font_bold(36)
title = "The Hidden Cost of Not Using AI"
bbox_t = draw.textbbox((0, 0), title, font=title_font)
tw = bbox_t[2] - bbox_t[0]
draw.text(((W - tw) // 2, 48 * S), title, fill=(255, 255, 255, 240), font=title_font)

# Subtitle
sub_font = font(17)
subtitle = "What your business loses every year by waiting"
bbox_s = draw.textbbox((0, 0), subtitle, font=sub_font)
sw = bbox_s[2] - bbox_s[0]
draw.text(((W - sw) // 2, 100 * S), subtitle, fill=(16, 185, 129, 160), font=sub_font)

# === Large ghost dollar amount ===
ghost_font = font_bold(80)
ghost_text = "$247,000"
bbox = draw.textbbox((0, 0), ghost_text, font=ghost_font)
gw = bbox[2] - bbox[0]
gh = bbox[3] - bbox[1]
gx = (W - gw) // 2
gy = 145 * S

# Shadow layers
for offset in range(6, 0, -1):
    draw.text((gx + offset * S, gy + offset * S // 2), ghost_text,
              fill=(245, 158, 11, int(8 + offset * 2)), font=ghost_font)

# Main number - semi-transparent amber
draw.text((gx, gy), ghost_text, fill=(245, 158, 11, 70), font=ghost_font)

# "lost per year" label
yr_font = font(20)
yr_text = "lost per year"
bbox2 = draw.textbbox((0, 0), yr_text, font=yr_font)
yr_w = bbox2[2] - bbox2[0]
draw.text(((W - yr_w) // 2, gy + gh + 15 * S), yr_text, fill=(245, 158, 11, 55), font=yr_font)

# === Five cost bars ===
costs = [
    ("Time Tax", "$130,000", 1.0, (16, 185, 129)),
    ("Lost Leads", "$60,000", 0.46, (60, 180, 100)),
    ("Quality Drain", "$50,000", 0.38, (120, 175, 60)),
    ("Speed Gap", "$40,000", 0.31, (180, 165, 30)),
    ("Missed Opportunities", "???", 0.18, (245, 158, 11)),
]

# Layout: labels left, bars right
label_col_x = 80 * S
bar_start_x = 330 * S
bar_max_w = 680 * S
bar_h = 24 * S
bar_y_start = 365 * S
bar_spacing = 44 * S

label_font_r = font(15)
value_font_r = font_bold(15)

for i, (label, value, pct, color) in enumerate(costs):
    y = bar_y_start + i * bar_spacing
    bar_w = int(bar_max_w * pct)
    r, g, b = color

    # Label on left, right-aligned
    lbbox = draw.textbbox((0, 0), label, font=label_font_r)
    lw = lbbox[2] - lbbox[0]
    lh = lbbox[3] - lbbox[1]
    draw.text((bar_start_x - lw - 20 * S, y + (bar_h - lh) // 2 - 2 * S),
              label, fill=(255, 255, 255, 160), font=label_font_r)

    # Bar background track
    draw.rounded_rectangle(
        [bar_start_x, y, bar_start_x + bar_max_w, y + bar_h],
        radius=5 * S,
        fill=(255, 255, 255, 8)
    )

    if value == "???":
        # Dashed bar for unknown cost
        dash_w = 10 * S
        gap = 6 * S
        dx = 0
        while dx < bar_w:
            seg_end = min(dx + dash_w, bar_w)
            draw.rounded_rectangle(
                [bar_start_x + dx, y + 2 * S, bar_start_x + seg_end, y + bar_h - 2 * S],
                radius=3 * S,
                fill=(r, g, b, 35)
            )
            dx += dash_w + gap
        # Value
        vbbox = draw.textbbox((0, 0), value, font=value_font_r)
        draw.text((bar_start_x + bar_w + 18 * S, y + (bar_h - (vbbox[3] - vbbox[1])) // 2 - 2 * S),
                  value, fill=(245, 158, 11, 100), font=value_font_r)
    else:
        # Filled bar
        draw.rounded_rectangle(
            [bar_start_x, y, bar_start_x + bar_w, y + bar_h],
            radius=5 * S,
            fill=(r, g, b, 40)
        )
        # Highlight strip on top of bar
        draw.rounded_rectangle(
            [bar_start_x + 2 * S, y + 3 * S, bar_start_x + bar_w - 2 * S, y + 6 * S],
            radius=2 * S,
            fill=(r, g, b, 60)
        )
        # Value
        vbbox = draw.textbbox((0, 0), value, font=value_font_r)
        draw.text((bar_start_x + bar_w + 18 * S, y + (bar_h - (vbbox[3] - vbbox[1])) // 2 - 2 * S),
                  value, fill=(255, 255, 255, 170), font=value_font_r)

# === Bottom branding with logo ===
logo_path = '/Users/thanospangios/Downloads/AI ASSITANT FULL/voice-ai-client/public/logo-transparent.png'
logo = Image.open(logo_path).convert('RGBA')
logo_h = 28 * S
logo_w = int(logo.width * (logo_h / logo.height))
logo = logo.resize((logo_w, logo_h), Image.LANCZOS)
logo_x = 50 * S
logo_y = H - 50 * S - logo_h // 2 + 12 * S
img.paste(logo, (logo_x, logo_y), logo)
draw = ImageDraw.Draw(img)  # refresh draw after paste

brand_font = font_bold(15)
draw.text((logo_x + logo_w + 8 * S, H - 50 * S), "naurra.ai", fill=(16, 185, 129, 150), font=brand_font)

tag_font = font(12)
tag = "AI Strategy"
bbox_tag = draw.textbbox((0, 0), tag, font=tag_font)
tagw = bbox_tag[2] - bbox_tag[0]
# Small pill background
pill_x = W - tagw - 60 * S
pill_y = H - 52 * S
pill_h = 26 * S
draw.rounded_rectangle(
    [pill_x - 12 * S, pill_y, pill_x + tagw + 12 * S, pill_y + pill_h],
    radius=13 * S,
    fill=(16, 185, 129, 20),
    outline=(16, 185, 129, 40),
    width=1
)
draw.text((pill_x, pill_y + 4 * S), tag, fill=(16, 185, 129, 140), font=tag_font)

# Save as RGB
final = Image.new('RGB', (W, H), (10, 14, 26))
final.paste(img, mask=img.split()[3])

output_path = '/Users/thanospangios/Downloads/AI ASSITANT FULL/voice-ai-client/public/blog/the-hidden-cost-of-not-using-ai-in-2026.png'
final.save(output_path, 'PNG', optimize=True)
print(f"Saved: {output_path}")
print(f"Size: {final.size[0]}x{final.size[1]}")
