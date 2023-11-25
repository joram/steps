import asyncio
import time

import neopixel

from .base_mode import BaseMode
from .utils.colours import wheel


class RainbowSolidMode(BaseMode):
    name = "Solid Rainbow"
    description = "Solid Colour Shifting Through The Rainbow"
    image_url = "https://cdn-icons-png.flaticon.com/512/458/458842.png"
    wait_ms = 25

    def update_frame(self, pixels: neopixel.NeoPixel):
        self.frame_count = (self.frame_count + 1) % 255
        colour = wheel(self.frame_count & 255)
        pixels.fill(colour)
        pixels.show()
