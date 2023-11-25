import asyncio
import time

import neopixel

from .base_mode import BaseMode
from .utils.colours import wheel


class RainbowSolidMode(BaseMode):
    name = "Sliding Rainbow"
    description = "Rainbows that slide"
    image_url = "https://cdn-icons-png.flaticon.com/512/458/458842.png"
    wait_ms = 50
    running = False
    frame_count = 0

    async def update_frame(self, pixels: neopixel.NeoPixel):
        self.frame_count = (self.frame_count + 1) % 255

        colour = wheel(self.frame_count)
        pixels.fill(colour)
        pixels.show()

        await asyncio.sleep(self.wait_ms / 1000.0)
