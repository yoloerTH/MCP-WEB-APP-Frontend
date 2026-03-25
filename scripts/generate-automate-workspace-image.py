"""
Blog hero image: "Automate Google Workspace in 5 Minutes"
Left: title text. Right: "5:00" timer with Google service icons orbiting it.
Clean, editorial, dark midnight bg.
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math
import os

S = 3
W, H = 1200 * S, 630 * S
OUTPUT = "/Users/thanospangios/Downloads/AI ASSITANT FULL/voice-ai-client/public/blog/automate-google-workspace-in-5-minutes.png"
ASSETS_DIR = "/Users/thanospangios/Downloads/Naurra App/NaurraAI/src/assets"
LOGO_PATH = os.path.join(ASSETS_DIR, "logo.png")
ICONS_DIR = os.path.join(ASSETS_DIR, "google-icons")

EMERALD = (16, 185, 129)
EMERALD_BRIGHT = (52, 211, 153)
AMBER = (245, 158, 11)
MIDNIGHT = (10, 14, 26)
WHITE = (255, 255, 255)
MUTED = (148, 163, 184)
CARD_BG = (18, 24, 38)
NODE_BG = (22, 30, 48)


def make_layer():
    return Image.new("RGBA", (W, H), (0, 0, 0, 0))


def draw_rounded_rect(draw, bbox, radius, fill=None, outline=None, width=1):
    x0, y0, x1, y1 = [int(v) for v in bbox]
    if x1 <= x0 or y1 <= y0:
        return
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


def make_glow(center, radius, color, intensity=40):
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    cx, cy = int(center[0]), int(center[1])
    r = max(int(radius * 0.35), 2)
    draw.ellipse([cx - r, cy - r, cx + r, cy + r],
                 fill=(*color, int(min(intensity, 255))))
    blur_r = max(int(radius * 0.65), 1)
    layer = layer.filter(ImageFilter.GaussianBlur(radius=blur_r))
    return layer


def paste_centered(img, icon, cx, cy, size):
    resized = icon.resize((size, size), Image.LANCZOS)
    layer = make_layer()
    layer.paste(resized, (int(cx) - size // 2, int(cy) - size // 2), resized)
    return Image.alpha_composite(img, layer)


def measure_text(draw, text, font):
    bb = draw.textbbox((0, 0), text, font=font)
    return bb[2] - bb[0], bb[3] - bb[1]


def main():
    logo = Image.open(LOGO_PATH).convert("RGBA")

    # Load Google icons
    icons = {}
    for name in ["gmail", "calendar", "sheets", "drive", "docs"]:
        path = os.path.join(ICONS_DIR, f"{name}.png")
        if os.path.exists(path):
            icons[name] = Image.open(path).convert("RGBA")

    fp = "/System/Library/Fonts/SFNS.ttf"
    if not os.path.exists(fp):
        fp = "/System/Library/Fonts/HelveticaNeue.ttc"

    font_heading = ImageFont.truetype(fp, 36 * S)
    font_sub = ImageFont.truetype(fp, 14 * S)
    font_timer = ImageFont.truetype(fp, 52 * S)
    font_timer_label = ImageFont.truetype(fp, 11 * S)
    font_tool_name = ImageFont.truetype(fp, 9 * S)
    font_url = ImageFont.truetype(fp, 13 * S)
    font_step = ImageFont.truetype(fp, 10 * S)

    img = Image.new("RGBA", (W, H), (*MIDNIGHT, 255))

    # Background glows
    glow1 = make_glow((W * 0.25, H * 0.45), 350 * S, EMERALD, intensity=8)
    img = Image.alpha_composite(img, glow1)
    glow2 = make_glow((W * 0.72, H * 0.48), 280 * S, EMERALD, intensity=10)
    img = Image.alpha_composite(img, glow2)

    # ── LEFT SIDE: Title ──
    left_x = 65 * S

    layer = make_layer()
    draw = ImageDraw.Draw(layer)

    t1 = "Automate Google"
    draw.text((left_x, 110 * S), t1, font=font_heading, fill=(*WHITE, 255))
    t2 = "Workspace in"
    draw.text((left_x, 155 * S), t2, font=font_heading, fill=(*WHITE, 255))
    t3 = "5 Minutes"
    draw.text((left_x, 200 * S), t3, font=font_heading, fill=(*EMERALD_BRIGHT, 255))

    # Accent line
    draw.rectangle([left_x, 250 * S, left_x + 60 * S, 250 * S + 3 * S],
                   fill=(*EMERALD, 200))

    # Subtitle
    sub = "21 voice commands. Zero setup."
    draw.text((left_x, 264 * S), sub, font=font_sub, fill=(*MUTED, 190))

    img = Image.alpha_composite(img, layer)

    # Steps preview (compact)
    steps = [
        ("1", "Sign in with Google"),
        ("2", "Grant permissions"),
        ("3", "Start commanding"),
    ]
    step_y = 310 * S
    for num, text in steps:
        layer = make_layer()
        draw = ImageDraw.Draw(layer)

        # Number circle
        nr = 11 * S
        draw.ellipse([left_x - nr + 11*S, step_y - nr + 1*S,
                      left_x + nr + 11*S, step_y + nr + 1*S],
                     fill=(*EMERALD, 40))
        ntw, nth = measure_text(draw, num, font_step)
        draw.text((left_x + 11*S - ntw//2, step_y - nth//2 + 1*S), num,
                  font=font_step, fill=(*EMERALD_BRIGHT, 220))

        # Step text
        draw.text((left_x + 30 * S, step_y - 5 * S), text,
                  font=font_step, fill=(*MUTED, 160))
        img = Image.alpha_composite(img, layer)
        step_y += 30 * S

    # naurra.ai bottom left
    img = paste_centered(img, logo, left_x + 14 * S, 555 * S, 28 * S)
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    draw.text((left_x + 32 * S, 546 * S), "naurra.ai", font=font_url, fill=(*MUTED, 120))
    img = Image.alpha_composite(img, layer)

    # ── RIGHT SIDE: Timer + Icons ──
    center_x = W * 0.70
    center_y = H * 0.46

    # Outer ring
    ring_r = 140 * S
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    draw.ellipse([int(center_x - ring_r), int(center_y - ring_r),
                  int(center_x + ring_r), int(center_y + ring_r)],
                 outline=(*EMERALD, 18), width=2 * S)
    img = Image.alpha_composite(img, layer)

    # Progress arc (about 300 degrees — almost complete)
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    arc_r = ring_r - 4 * S
    draw.arc([int(center_x - arc_r), int(center_y - arc_r),
              int(center_x + arc_r), int(center_y + arc_r)],
             -90, 210, fill=(*EMERALD_BRIGHT, 60), width=4 * S)
    img = Image.alpha_composite(img, layer)

    # Inner circle background
    inner_r = 80 * S
    hub_glow = make_glow((center_x, center_y), 100 * S, EMERALD, intensity=15)
    img = Image.alpha_composite(img, hub_glow)

    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    draw.ellipse([int(center_x - inner_r), int(center_y - inner_r),
                  int(center_x + inner_r), int(center_y + inner_r)],
                 fill=(*CARD_BG, 230))
    draw.ellipse([int(center_x - inner_r), int(center_y - inner_r),
                  int(center_x + inner_r), int(center_y + inner_r)],
                 outline=(*EMERALD, 35), width=2 * S)
    img = Image.alpha_composite(img, layer)

    # Timer text "5:00"
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    timer = "5:00"
    ttw, tth = measure_text(draw, timer, font_timer)
    draw.text((int(center_x) - ttw // 2, int(center_y) - tth // 2 - 8 * S),
              timer, font=font_timer, fill=(*EMERALD_BRIGHT, 240))
    # "minutes" label
    ml = "minutes"
    mw, mh = measure_text(draw, ml, font_timer_label)
    draw.text((int(center_x) - mw // 2, int(center_y) + tth // 2 - 8 * S),
              ml, font=font_timer_label, fill=(*MUTED, 130))
    img = Image.alpha_composite(img, layer)

    # Google service icons on the outer ring
    services = [
        ("gmail", "Gmail", (234, 67, 53)),
        ("calendar", "Calendar", (66, 133, 244)),
        ("drive", "Drive", (245, 158, 11)),
        ("docs", "Docs", (66, 133, 244)),
        ("sheets", "Sheets", (15, 157, 88)),
    ]

    icon_size = 32 * S
    for i, (icon_name, label, color) in enumerate(services):
        angle = -math.pi / 2 + (2 * math.pi * i / len(services))
        ix = center_x + ring_r * math.cos(angle)
        iy = center_y + ring_r * math.sin(angle)

        # Glow behind icon
        ig = make_glow((ix, iy), 30 * S, color, intensity=15)
        img = Image.alpha_composite(img, ig)

        # Icon background circle
        layer = make_layer()
        draw = ImageDraw.Draw(layer)
        ibr = 22 * S
        draw.ellipse([int(ix - ibr), int(iy - ibr),
                      int(ix + ibr), int(iy + ibr)],
                     fill=(*NODE_BG, 235))
        draw.ellipse([int(ix - ibr), int(iy - ibr),
                      int(ix + ibr), int(iy + ibr)],
                     outline=(*color, 40), width=1 * S)
        img = Image.alpha_composite(img, layer)

        # Actual icon
        if icon_name in icons:
            img = paste_centered(img, icons[icon_name], int(ix), int(iy), icon_size)

        # Label below/beside based on position
        layer = make_layer()
        draw = ImageDraw.Draw(layer)
        lw, lh = measure_text(draw, label, font_tool_name)
        # Place label outside the ring
        label_dist = ibr + 14 * S
        lx = ix + label_dist * math.cos(angle) - lw // 2
        ly = iy + label_dist * math.sin(angle) - lh // 2
        draw.text((int(lx), int(ly)), label, font=font_tool_name, fill=(*MUTED, 140))
        img = Image.alpha_composite(img, layer)

    # "80+ min/day saved" badge at bottom right
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    badge_text = "80+ min saved daily"
    btw, bth = measure_text(draw, badge_text, font_timer_label)
    bx = int(center_x) - btw // 2
    by = int(center_y) + ring_r + 50 * S
    draw_rounded_rect(draw, (bx - 14*S, by - 6*S, bx + btw + 14*S, by + bth + 6*S),
                      (bth + 12*S) // 2, fill=(*EMERALD, 15))
    draw_rounded_rect(draw, (bx - 14*S, by - 6*S, bx + btw + 14*S, by + bth + 6*S),
                      (bth + 12*S) // 2, outline=(*EMERALD, 30), width=1*S)
    draw.text((bx, by), badge_text, font=font_timer_label, fill=(*EMERALD_BRIGHT, 180))
    img = Image.alpha_composite(img, layer)

    # Final
    img = img.convert("RGB")
    img.save(OUTPUT, "PNG", quality=100)
    print(f"Done: {OUTPUT} ({os.path.getsize(OUTPUT) / 1024:.0f} KB)")


if __name__ == "__main__":
    main()
