from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

OUT = Path("static/assets/trailers")
SIZE = (960, 540)

PRODUCTS = [
    ("aura-command", "Aura Command", "Never lose a WhatsApp lead again.", ["Lead captured", "AI qualified", "Owner assigned", "Follow-up ready"]),
    ("documind", "Documind", "Know every document expiry before it costs you money.", ["Docs uploaded", "Dates extracted", "Risk sorted", "Renewal ready"]),
    ("siteflow", "Siteflow", "Turn daily site chaos into signed reports.", ["Notes captured", "Snags logged", "Materials tracked", "Report signed"]),
    ("secureops", "SecureOps", "See business security risks before attackers or auditors do.", ["Assets scanned", "Risks ranked", "Impact explained", "Report ready"]),
]


def font(size, bold=False):
    candidates = [
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
        "C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf",
    ]
    for candidate in candidates:
        try:
            return ImageFont.truetype(candidate, size)
        except OSError:
            continue
    return ImageFont.load_default()


def wrap(draw, text, fnt, width):
    words = text.split()
    lines = []
    line = ""
    for word in words:
        test = f"{line} {word}".strip()
        if draw.textbbox((0, 0), test, font=fnt)[2] <= width:
            line = test
        else:
            if line:
                lines.append(line)
            line = word
    if line:
        lines.append(line)
    return lines


def make_gif(key, name, outcome, steps):
    screen = Image.open(OUT / f"{key}-screen.png").convert("RGB")
    frames = []
    title_font = font(52, True)
    name_font = font(22, True)
    body_font = font(25, True)
    small_font = font(17, True)

    for i in range(42):
        t = i / 41
        bg = screen.resize(SIZE, Image.Resampling.LANCZOS).filter(ImageFilter.GaussianBlur(radius=1.2))
        overlay = Image.new("RGBA", SIZE, (4, 4, 7, 182))
        frame = Image.alpha_composite(bg.convert("RGBA"), overlay)
        draw = ImageDraw.Draw(frame)

        for x in range(-180, SIZE[0] + 180, 64):
            offset = int(t * 88)
            draw.line((x + offset, 0, x - 170 + offset, SIZE[1]), fill=(255, 154, 70, 30), width=1)

        draw.text((52, 48), name.upper(), font=name_font, fill=(255, 154, 70, 255))
        y = 124
        for line in wrap(draw, outcome, title_font, 650):
            draw.text((52, y), line, font=title_font, fill=(248, 246, 241, 255))
            y += 58

        card_x = int(520 + 18 * (1 - abs(0.5 - t) * 2))
        card_y = 126
        draw.rounded_rectangle((card_x, card_y, 904, 420), radius=18, fill=(10, 10, 14, 218), outline=(255, 181, 107, 95), width=2)

        active = min(len(steps) - 1, int(t * len(steps)))
        for idx, step in enumerate(steps):
            sy = card_y + 58 + idx * 56
            fill = (255, 154, 70, 255) if idx <= active else (248, 246, 241, 118)
            draw.ellipse((card_x + 28, sy - 16, card_x + 50, sy + 6), fill=fill)
            draw.text((card_x + 68, sy - 22), step, font=body_font, fill=(248, 246, 241, 255) if idx <= active else (248, 246, 241, 145))

        draw.rounded_rectangle((52, 468, 760, 482), radius=7, fill=(255, 255, 255, 35))
        draw.rounded_rectangle((52, 468, 52 + int(708 * t), 482), radius=7, fill=(255, 154, 70, 255))
        draw.text((52, 504), "Private demo by Hamees Momin", font=small_font, fill=(248, 246, 241, 210))
        frames.append(frame.convert("RGB"))

    frames[0].save(
        OUT / f"{key}-linkedin.gif",
        save_all=True,
        append_images=frames[1:],
        duration=80,
        loop=0,
        disposal=2,
    )


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for item in PRODUCTS:
        make_gif(*item)


if __name__ == "__main__":
    main()
