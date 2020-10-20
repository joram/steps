import time

from utils import wheel, get_state, _color_tuple, state_key, _color_between, set_pixel_circle


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
<<<<<<< HEAD
    while key == state_key():
        color = _color_between(c1, c2, i/100)
=======
    while key == _state_key():
        color = _color_between(c1, c2, float(i)/100.0)
        print(color)
>>>>>>> a589f4999a2ddc6c232eb3cb7d27ecd18516c3a9
        pixels.fill(color)
        pixels.show()
        time.sleep(0.01)
        if i >= 100:
            delta = -1
        if i <= 0:
            delta = 1
        i += delta


def mode_solid_rainbow(key, pixels):
    h = 0
    while key == state_key():
        h = h % 255
        color = wheel(h)
        pixels.fill(color)
        pixels.show()
        time.sleep(0.01)
        h += 1


def mode_per_step(key, pixels):
    colors = [
        (255, 50, 0),
        (0, 0, 0),
      #  (0, 0, 255),
    ]
    o = int(pixels.n/2)
    for i in range(0, o):
        index = int(i/21) % len(colors)
        pixels[i] = colors[index]
        pixels[i+o] = colors[index]
    pixels.show()
    time.sleep(5)


def mode_sliding_circle_rainbow(key, pixels):
    h = 0
    while key == state_key():
        for i in range(0, pixels.n):
            hue = (h+i) % 255
            color = wheel(hue)
            set_pixel_circle(pixels, i, color)
        pixels.show()
        time.sleep(0.01)
<<<<<<< HEAD
        h += 10


def mode_nyan_cat(key, pixels):
    nyan_pixels = [
        (255, 255, 255)*20,
        (255, 0, 0)*5,
        (255, 88, 0)*5,
        (255, 255, 0)*5,
        (0, 255, 0)*5,
        (0, 0, 255)*5,
        (255, 0, 255)*5,
    ]

    offset = 0
    while key == state_key():
        pixels.fill((0, 0, 0))
        for i in range(0, len(nyan_pixels)):
            # pixels[i + offset] = nyan_pixels[i]
            set_pixel_circle(pixels, i+offset, nyan_pixels[i])
        pixels.show()
        time.sleep(0.01)
        offset += 1
=======
        h += 1
>>>>>>> a589f4999a2ddc6c232eb3cb7d27ecd18516c3a9
