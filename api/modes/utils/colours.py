def wheel(pos):
    """Generate rainbow colors across 0-255 positions."""
    if pos < 85:
        return pos * 3, 255 - pos * 3, 0
    elif pos < 170:
        pos -= 85
        return 255 - pos * 3, 0, pos * 3
    pos -= 170
    return 0, pos * 3, 255 - pos * 3


def _color_between(c1, c2, ratio):
     r = c1[0]*ratio + c2[0]*(1-ratio)
     g = c1[1]*ratio + c2[1]*(1-ratio)
     b = c1[2]*ratio + c2[2]*(1-ratio)
     return int(r), int(g), int(b)
