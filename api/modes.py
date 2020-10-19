import time

from utils import wheel, get_state, _color_tuple, _state_key, _color_between


def mode_solid(key, pixels):
    state = get_state()
    color = state.get("color")
    print(f"solid: {color}")
    pixels.fill((
        color.get("r", 255),
        color.get("g", 255),
        color.get("b", 255),
    ))
    pixels.show()
    time.sleep(5)


def mode_off(key, pixels):
    pixels.fill((0, 0, 0))
    pixels.show()
    time.sleep(5)


def mode_fading(key, pixels):
    state = get_state()
    colors = state.get("colors", [
        {"r": 255, "g": 255, "b": 255},
        {"r": 0, "g": 0, "b": 0},
    ])
    c1 = _color_tuple(colors[0])
    c2 = _color_tuple(colors[1])
    i = 0
    delta = 1
    while key == _state_key():
        color = _color_between(c1, c2, float(i)/100.0)
        print(color)
        pixels.fill(color)
        pixels.show()
        time.sleep(0.1)
        if i >= 100:
            delta = -1
        if i <= 0:
            delta = 1
        i += delta


def mode_solid_rainbow(key, pixels):
    h = 0
    while key == _state_key():
        h = h % 255
        color = wheel(h)
        pixels.fill(color)
        pixels.show()
        time.sleep(0.01)
        h += 1


def mode_sliding_rainbow(key, pixels):
    h = 0
    while key == _state_key():
        for i in range(0, pixels.n):
            hue = (h+i) % 255
            color = wheel(hue)
            pixels[i] = color
        pixels.show()
        time.sleep(0.01)
        h += 2
