import random
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
    while key == state_key():
        color = _color_between(c1, c2, float(i) / 100.0)
        print(color)
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
    o = int(pixels.n / 2)
    for i in range(0, o):
        index = int(i / 21) % len(colors)
        pixels[i] = colors[index]
        pixels[i + o] = colors[index]
    pixels.show()
    time.sleep(5)


def mode_sliding_circle_rainbow(key, pixels):
    h = 0
    while key == state_key():
        for i in range(0, pixels.n):
            hue = (h + i) % 255
            color = wheel(hue)
            set_pixel_circle(pixels, i, color)
        pixels.show()
        time.sleep(0.01)
        h += 1


def _nyan_pixels(x=3):
    nyan_pixels = []
    for i in range(0, x * 2):
        nyan_pixels.append((255, 255, 255))
    for i in range(0, x):
        nyan_pixels.append((255, 0, 0))
    for i in range(0, x):
        nyan_pixels.append((255, 88, 0))
    for i in range(0, x):
        nyan_pixels.append((255, 255, 0))
    for i in range(0, x):
        nyan_pixels.append((0, 255, 0))
    for i in range(0, x):
        nyan_pixels.append((0, 0, 255))
    for i in range(0, x):
        nyan_pixels.append((255, 0, 255))
    return nyan_pixels


## shortcut to set list of pixels using circle if necessary
def _set_pixels(offset, pixels, p):
    for i in range(0, len(p)):
        set_pixel_circle(pixels, (i + offset) % pixels.n, p[i])


def mode_nyan_cat(key, pixels):
    nyan_pixels = _nyan_pixels()
    offset = 0
    while key == state_key():
        offset = offset % pixels.n
        pixels.fill((0, 0, 0))
        _set_pixels(offset, pixels, nyan_pixels)
        pixels.show()
        time.sleep(0.01)
        offset -= 1


def mode_nyan_cats(key, pixels):
    nyan_pixels = _nyan_pixels()
    offset = 0
    num_cats = random.randint(2, 8)
    while key == state_key():
        offset = offset % pixels.n
        pixels.fill((0, 0, 0))
        for i in range(0, num_cats):
            _set_pixels(offset + int(pixels.n / num_cats) * i, pixels, nyan_pixels)
        pixels.show()
        time.sleep(0.01)
        offset -= 1


def mode_solid_sparkly(key, pixels):
    #####
    # To make John happy (he's worried you'll think he wrote this):
    # This function was written by Caitlin, who has not coded in rather
    # a long time. And who thinks all this formatting bullshit is exactly that.
    # But it means this code is not nearly as elegant as he would have it be.
    # And he can fucking deal with it. <3
    ######
    state = get_state()
    primary = state.get("primary")
    sparkles = state.get("sparkles")
    primary_color = (
        primary.get("r", 255),
        primary.get("g", 255),
        primary.get("b", 255),
    )
    sparkles_color = (
        sparkles.get("r", 255),
        sparkles.get("g", 255),
        sparkles.get("b", 255),
    )

    pixels.fill(primary_color)
    selected_pixels = random.sample(range(0, 300), 10)

    while key == state_key():
        pixels[selected_pixels[0]] = primary_color
        selected_pixels.pop(0)

        new_pixel = random.randint(0, 299)
        selected_pixels.append(new_pixel)
        pixels[new_pixel] = sparkles_color

        pixels.show()
        time.sleep(.25)


def mode_chaos_colors(key, pixels):
    #####
    # A bunch of flashing colors - by Caitlin
    #####
    state = get_state()

    # Init by setting all to random colors
    # for i in pixels:
    #     sparkles_color = (
    #         random.randint(0, 249),
    #         random.randint(0, 249),
    #         random.randint(0, 249)
    #     )
    #     pixels[i] = sparkles_color
    # time.sleep(.5)
    #
    # # Each .5s, change 10 pixels
    # while key == state_key():
    #     selected_pixels = random.sample(range(0, 300), 10)
    #     for i in selected_pixels:
    #         sparkles_color = (
    #             random.randint(0, 249),
    #             random.randint(0, 249),
    #             random.randint(0, 249)
    #         )
    #         pixels[i] = sparkles_color
    #     time.sleep(.5)

    while key == state_key():
        pixels.fill((0, 50, 0))

    pixels.show()
    time.sleep(1)


def mode_raindrops(key, pixels):
    time.sleep(0.01)


def mode_animation(frames, pixels):
    while 1:
        for frame in frames:
            if len(frame) == 300:
                for i in range(0, 300):
                    pixels[i] = frame[i]
                pixels.show()
            else:
                pixels.fill((255, 105, 180))
            time.sleep(0.01)
