"""
OG Image for Blog: "AI-Powered Email Etiquette: Write Better Professional Emails"
Email compose preview + tone selector
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

S = 2
W, H = 1200 * S, 630 * S

BASE_DIR = "/Users/thanospangios/Downloads/AI ASSITANT FULL/voice-ai-client/public/blog"
OUTPUT = os.path.join(BASE_DIR, "ai-email-etiquette-professional-communication.png")
LOGO_PATH = "/Users/thanospangios/Downloads/Naurra App/NaurraAI/src/assets/logo.png"
ICONS_DIR = "/Users/thanospangios/Downloads/AI ASSITANT FULL/voice-ai-client/public/google-icons"

MIDNIGHT = (10, 14, 26)
CARD_BG = (18, 24, 38)
EMERALD = (16, 185, 129)
EMERALD_BRIGHT = (52, 211, 153)
WHITE = (255, 255, 255)
MUTED = (148, 163, 184)
GMAIL_RED = (234, 67, 53)
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
    gmail_icon = Image.open(os.path.join(ICONS_DIR, "gmail.png")).convert("RGBA")

    fp = "/System/Library/Fonts/SFNS.ttf"
    if not os.path.exists(fp):
        fp = "/System/Library/Fonts/HelveticaNeue.ttc"

    font_category = ImageFont.truetype(fp, 16 * S)
    font_title = ImageFont.truetype(fp, 34 * S)
    font_subtitle = ImageFont.truetype(fp, 18 * S)
    font_url = ImageFont.truetype(fp, 16 * S)
    font_field = ImageFont.truetype(fp, 10 * S)
    font_body = ImageFont.truetype(fp, 9 * S)
    font_tone = ImageFont.truetype(fp, 11 * S)
    font_stat_num = ImageFont.truetype(fp, 28 * S)
    font_stat_label = ImageFont.truetype(fp, 12 * S)

    img = Image.new("RGBA", (W, H), (*MIDNIGHT, 255))

    img = Image.alpha_composite(img, make_glow((W * 0.73, H * 0.35), 320 * S, GMAIL_RED, 12))
    img = Image.alpha_composite(img, make_glow((W * 0.3, H * 0.75), 250 * S, EMERALD, 10))

    left_x = 60 * S

    # Category
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    cat_text = "COMMUNICATION"
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
    draw.text((left_x, 95 * S), "AI-Powered Email", font=font_title, fill=(*WHITE, 255))
    draw.text((left_x, 140 * S), "Etiquette & Writing", font=font_title, fill=(*EMERALD_BRIGHT, 255))
    img = Image.alpha_composite(img, layer)

    # Subtitle
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    draw.text((left_x, 200 * S), "Write better professional emails in half the time",
              font=font_subtitle, fill=(*MUTED, 200))
    img = Image.alpha_composite(img, layer)

    # Stats
    stats = [("50%", "Less Time\nWriting"), ("42%", "Higher\nResponse Rate"), ("< 1m", "Per\nEmail")]
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

    # Right side: email compose card
    email_x = W * 0.60
    email_y = 50 * S
    email_w = 300 * S
    email_h = 310 * S

    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    draw_rounded_rect(draw, (email_x, email_y, email_x + email_w, email_y + email_h), 14 * S,
                      fill=(*CARD_BG, 200))
    draw_rounded_rect(draw, (email_x, email_y, email_x + email_w, email_y + email_h), 14 * S,
                      outline=(*GMAIL_RED, 25), width=S)
    img = Image.alpha_composite(img, layer)

    # Gmail icon
    img = paste_centered(img, gmail_icon, int(email_x + 25 * S), int(email_y + 22 * S), 30 * S)

    # Email fields
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    fy = email_y + 45 * S
    pad = email_x + 15 * S

    # To field
    draw.text((int(pad), int(fy)), "To:", font=font_field, fill=(*MUTED, 150))
    draw.text((int(pad + 30 * S), int(fy)), "sarah@company.com", font=font_field, fill=(*WHITE, 180))
    fy += 22 * S
    draw.line([(int(pad), int(fy)), (int(email_x + email_w - 15 * S), int(fy))],
              fill=(*MUTED, 25), width=S)
    fy += 8 * S

    # Subject
    draw.text((int(pad), int(fy)), "Subject:", font=font_field, fill=(*MUTED, 150))
    draw.text((int(pad + 55 * S), int(fy)), "Q1 Budget Approval", font=font_field, fill=(*WHITE, 180))
    fy += 22 * S
    draw.line([(int(pad), int(fy)), (int(email_x + email_w - 15 * S), int(fy))],
              fill=(*MUTED, 25), width=S)
    fy += 12 * S

    # Body
    body_lines = [
        "Hi Sarah,",
        "",
        "Thank you for your detailed review of",
        "the Q1 budget proposal. I'd like to",
        "schedule a brief call to discuss the",
        "marketing allocation adjustments.",
        "",
        "Would Thursday at 2pm work for you?",
        "",
        "Best regards,",
    ]
    for line in body_lines:
        if line:
            draw.text((int(pad), int(fy)), line, font=font_body, fill=(*WHITE, 150))
        fy += 15 * S

    img = Image.alpha_composite(img, layer)

    # Tone selector badges below email
    tones = [
        ("Formal", False),
        ("Professional", True),
        ("Casual", False),
        ("Empathetic", False),
    ]
    tone_y = email_y + email_h + 15 * S
    tone_x = email_x

    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    for tone_name, active in tones:
        bb = draw.textbbox((0, 0), tone_name, font=font_tone)
        tw = bb[2] - bb[0] + 18 * S
        th = bb[3] - bb[1] + 12 * S

        if active:
            draw_rounded_rect(draw, (tone_x, tone_y, tone_x + tw, tone_y + th),
                              th // 2, fill=(*EMERALD, 60))
            draw_rounded_rect(draw, (tone_x, tone_y, tone_x + tw, tone_y + th),
                              th // 2, outline=(*EMERALD_BRIGHT, 120), width=S)
            draw.text((int(tone_x + 9 * S), int(tone_y + 4 * S)), tone_name,
                      font=font_tone, fill=(*EMERALD_BRIGHT, 255))
        else:
            draw_rounded_rect(draw, (tone_x, tone_y, tone_x + tw, tone_y + th),
                              th // 2, fill=(*CARD_BG, 120))
            draw.text((int(tone_x + 9 * S), int(tone_y + 4 * S)), tone_name,
                      font=font_tone, fill=(*MUTED, 160))

        tone_x += tw + 8 * S

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
