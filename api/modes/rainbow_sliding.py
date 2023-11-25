import asyncio
import time

import neopixel

from .base_mode import BaseMode
from .utils.colours import wheel


class RainbowSlidingMode(BaseMode):
    name = "Sliding Rainbow"
    description = "Rainbows Sliding Through The Strip"
    image_url = "https://cdn-icons-png.flaticon.com/512/458/458842.png"
    wait_ms = 25

    def update_frame(self, pixels: neopixel.NeoPixel):
        self.frame_count = (self.frame_count + 1) % 255
        for i in range(pixels.n):
            colour = wheel((i + self.frame_count) & 255)
            pixels[i] = colour
        pixels.show()
