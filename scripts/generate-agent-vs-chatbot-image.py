"""
Blog hero image: "AI Agent vs Chatbot"
Split layout — left: chat bubble (chatbot), right: connected tool nodes (agent)
Central "vs" divider. Dark midnight bg, emerald/amber palette.
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math
import os

S = 3
W, H = 1200 * S, 630 * S
OUTPUT = "/Users/thanospangios/Downloads/AI ASSITANT FULL/voice-ai-client/public/blog/ai-agent-vs-chatbot-what-your-business-actually-needs.png"
ASSETS_DIR = "/Users/thanospangios/Downloads/Naurra App/NaurraAI/src/assets"
LOGO_PATH = os.path.join(ASSETS_DIR, "logo.png")

EMERALD = (16, 185, 129)
EMERALD_BRIGHT = (52, 211, 153)
AMBER = (245, 158, 11)
AMBER_BRIGHT = (251, 191, 36)
RED_MUTED = (220, 80, 70)
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

    fp = "/System/Library/Fonts/SFNS.ttf"
    if not os.path.exists(fp):
        fp = "/System/Library/Fonts/HelveticaNeue.ttc"

    font_heading = ImageFont.truetype(fp, 36 * S)
    font_vs = ImageFont.truetype(fp, 28 * S)
    font_label = ImageFont.truetype(fp, 14 * S)
    font_label_bold = ImageFont.truetype(fp, 15 * S)
    font_small = ImageFont.truetype(fp, 10 * S)
    font_chat = ImageFont.truetype(fp, 9 * S)
    font_tool = ImageFont.truetype(fp, 10 * S)
    font_url = ImageFont.truetype(fp, 13 * S)
    font_sub = ImageFont.truetype(fp, 12 * S)

    img = Image.new("RGBA", (W, H), (*MIDNIGHT, 255))

    # Background glows
    glow_left = make_glow((W * 0.25, H * 0.5), 300 * S, MUTED, intensity=6)
    img = Image.alpha_composite(img, glow_left)
    glow_right = make_glow((W * 0.75, H * 0.5), 300 * S, EMERALD, intensity=8)
    img = Image.alpha_composite(img, glow_right)

    mid_x = W // 2

    # ═══ TOP: Title ═══
    layer = make_layer()
    draw = ImageDraw.Draw(layer)

    title = "AI Agent vs Chatbot"
    tw, th = measure_text(draw, title, font_heading)
    draw.text(((W - tw) // 2, 40 * S), title, font=font_heading, fill=(*WHITE, 255))

    sub = "What your business actually needs"
    sw, sh = measure_text(draw, sub, font_sub)
    draw.text(((W - sw) // 2, 40 * S + th + 8 * S), sub, font=font_sub, fill=(*MUTED, 180))

    img = Image.alpha_composite(img, layer)

    # ═══ CENTRAL VS DIVIDER ═══
    # Vertical dashed line
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    dash_len = 8 * S
    gap_len = 6 * S
    y_start = 120 * S
    y_end = 530 * S
    y = y_start
    while y < y_end:
        draw.line([(mid_x, y), (mid_x, min(y + dash_len, y_end))],
                  fill=(*MUTED, 40), width=1 * S)
        y += dash_len + gap_len
    img = Image.alpha_composite(img, layer)

    # VS badge
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    vs_y = H // 2 - 5 * S
    vs_r = 24 * S
    draw.ellipse([mid_x - vs_r, vs_y - vs_r, mid_x + vs_r, vs_y + vs_r],
                 fill=(*CARD_BG, 255))
    draw.ellipse([mid_x - vs_r, vs_y - vs_r, mid_x + vs_r, vs_y + vs_r],
                 outline=(*MUTED, 50), width=2 * S)
    vtw, vth = measure_text(draw, "vs", font_vs)
    draw.text((mid_x - vtw // 2, vs_y - vth // 2), "vs",
              font=font_vs, fill=(*MUTED, 140))
    img = Image.alpha_composite(img, layer)

    # ═══ LEFT SIDE: Chatbot ═══
    left_cx = W * 0.25

    # Label
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    lbl = "Chatbot"
    lw, lh = measure_text(draw, lbl, font_label_bold)
    draw.text((left_cx - lw // 2, 125 * S), lbl, font=font_label_bold, fill=(*MUTED, 200))

    # Sublabel
    sl = "Responds with text"
    slw, slh = measure_text(draw, sl, font_small)
    draw.text((left_cx - slw // 2, 125 * S + lh + 6 * S), sl, font=font_small, fill=(*MUTED, 100))
    img = Image.alpha_composite(img, layer)

    # Chat bubbles
    chat_x = left_cx - 100 * S
    bubble_w = 200 * S
    bubbles = [
        ("user", "Draft a reply to Sarah"),
        ("bot", "Here's a draft you can\ncopy and paste:"),
        ("user", "Now send it"),
        ("bot", "I can't send emails.\nPlease do it manually."),
    ]

    bubble_y = 185 * S
    for sender, text in bubbles:
        is_user = sender == "user"
        lines = text.split("\n")
        line_h = 12 * S
        pad_x = 12 * S
        pad_y = 8 * S
        total_h = len(lines) * line_h + pad_y * 2

        # Measure widest line
        max_w = 0
        for line in lines:
            lw2, _ = measure_text(ImageDraw.Draw(make_layer()), line, font_chat)
            max_w = max(max_w, lw2)
        bw = max_w + pad_x * 2

        if is_user:
            bx = chat_x + bubble_w - bw
            bg_color = (*EMERALD, 30)
            border_color = (*EMERALD, 40)
            text_color = (*EMERALD_BRIGHT, 200)
        else:
            bx = chat_x
            bg_color = (*CARD_BG, 200)
            border_color = (*MUTED, 25)
            text_color = (*MUTED, 180)

        layer = make_layer()
        draw = ImageDraw.Draw(layer)
        draw_rounded_rect(draw, (bx, bubble_y, bx + bw, bubble_y + total_h),
                          10 * S, fill=bg_color)
        draw_rounded_rect(draw, (bx, bubble_y, bx + bw, bubble_y + total_h),
                          10 * S, outline=border_color, width=1 * S)
        for j, line in enumerate(lines):
            draw.text((bx + pad_x, bubble_y + pad_y + j * line_h), line,
                      font=font_chat, fill=text_color)
        img = Image.alpha_composite(img, layer)

        bubble_y += total_h + 10 * S

    # Red X at bottom left
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    x_text = "✗  Can't take action"
    xtw, xth = measure_text(draw, x_text, font_small)
    draw.text((left_cx - xtw // 2, 490 * S), x_text, font=font_small, fill=(*RED_MUTED, 180))
    img = Image.alpha_composite(img, layer)

    # ═══ RIGHT SIDE: Agent ═══
    right_cx = W * 0.75

    # Label
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    lbl = "AI Agent"
    lw, lh = measure_text(draw, lbl, font_label_bold)
    draw.text((right_cx - lw // 2, 125 * S), lbl, font=font_label_bold, fill=(*EMERALD_BRIGHT, 230))

    sl = "Executes across tools"
    slw, slh = measure_text(draw, sl, font_small)
    draw.text((right_cx - slw // 2, 125 * S + lh + 6 * S), sl, font=font_small, fill=(*EMERALD, 120))
    img = Image.alpha_composite(img, layer)

    # Central agent node (Naurra logo)
    agent_cy = H * 0.52
    hub_glow = make_glow((right_cx, agent_cy), 80 * S, EMERALD, intensity=18)
    img = Image.alpha_composite(img, hub_glow)

    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    hub_r = 30 * S
    draw.ellipse([int(right_cx - hub_r), int(agent_cy - hub_r),
                  int(right_cx + hub_r), int(agent_cy + hub_r)],
                 fill=(*CARD_BG, 240))
    draw.ellipse([int(right_cx - hub_r), int(agent_cy - hub_r),
                  int(right_cx + hub_r), int(agent_cy + hub_r)],
                 outline=(*EMERALD, 60), width=2 * S)
    img = Image.alpha_composite(img, layer)
    img = paste_centered(img, logo, int(right_cx), int(agent_cy), 38 * S)

    # Tool nodes around the agent
    tools = [
        ("Gmail", (234, 67, 53)),
        ("Calendar", (66, 133, 244)),
        ("Drive", (245, 158, 11)),
        ("Docs", (66, 133, 244)),
        ("Sheets", (15, 157, 88)),
    ]

    orbit_r = 105 * S
    for i, (name, color) in enumerate(tools):
        angle = -math.pi / 2 + (2 * math.pi * i / len(tools))
        tx = right_cx + orbit_r * math.cos(angle)
        ty = agent_cy + orbit_r * math.sin(angle)

        # Connection line
        layer = make_layer()
        draw = ImageDraw.Draw(layer)
        draw.line([(int(right_cx), int(agent_cy)), (int(tx), int(ty))],
                  fill=(*color, 30), width=2 * S)
        img = Image.alpha_composite(img, layer)

        # Tool pill
        layer = make_layer()
        draw = ImageDraw.Draw(layer)
        tw2, th2 = measure_text(draw, name, font_tool)
        pill_w = tw2 + 20 * S
        pill_h = th2 + 14 * S
        px = int(tx) - pill_w // 2
        py = int(ty) - pill_h // 2
        draw_rounded_rect(draw, (px, py, px + pill_w, py + pill_h),
                          pill_h // 2, fill=(*NODE_BG, 230))
        draw_rounded_rect(draw, (px, py, px + pill_w, py + pill_h),
                          pill_h // 2, outline=(*color, 50), width=1 * S)
        draw.text((int(tx) - tw2 // 2, int(ty) - th2 // 2), name,
                  font=font_tool, fill=(*color, 220))
        img = Image.alpha_composite(img, layer)

        # Tiny glow on node
        ng = make_glow((tx, ty), 25 * S, color, intensity=12)
        img = Image.alpha_composite(img, ng)

    # Green check at bottom right
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    c_text = "✓  Gets the job done"
    ctw, cth = measure_text(draw, c_text, font_small)
    draw.text((right_cx - ctw // 2, 490 * S), c_text, font=font_small, fill=(*EMERALD_BRIGHT, 200))
    img = Image.alpha_composite(img, layer)

    # ═══ BOTTOM: naurra.ai ═══
    img = paste_centered(img, logo, 65 * S + 14 * S, 555 * S, 28 * S)
    layer = make_layer()
    draw = ImageDraw.Draw(layer)
    draw.text((65 * S + 32 * S, 546 * S), "naurra.ai", font=font_url, fill=(*MUTED, 120))
    img = Image.alpha_composite(img, layer)

    # Final
    img = img.convert("RGB")
    img.save(OUTPUT, "PNG", quality=100)
    print(f"Done: {OUTPUT} ({os.path.getsize(OUTPUT) / 1024:.0f} KB)")


if __name__ == "__main__":
    main()
