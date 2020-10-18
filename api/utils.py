import colorsys
import json

state = {
  "color": {"r": 255, "g": 255, "b":255}
}


def set_state(new_state):
    global state
    state = new_state


def get_state():
    return state


def _state_key():
    return json.dumps(get_state(), sort_keys=True)


def _color_tuple(data):
    return (
        data.get("r", 255),
        data.get("g", 255),
        data.get("b", 255),
    )


def _color_between(c1, c2, ratio):
    (h1, l1, s1) = colorsys.rgb_to_hls(c1[0], c1[1], c1[2])
    (h2, l2, s2) = colorsys.rgb_to_hls(c2[0], c2[1], c2[2])
    h3 = h1*ratio + h2*(1-ratio)
    l3 = l1*ratio + l2*(1-ratio)
    s3 = s1*ratio + s2*(1-ratio)
    return colorsys.hls_to_rgb(h3, l3, s3)


def wheel(pos):
    """Generate rainbow colors across 0-255 positions."""
    if pos < 85:
        return (pos * 3, 255 - pos * 3, 0)
    elif pos < 170:
        pos -= 85
        return (255 - pos * 3, 0, pos * 3)
    pos -= 170
    return (0, pos * 3, 255 - pos * 3)

