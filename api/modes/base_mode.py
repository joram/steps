import abc
import asyncio
import time


class BaseMode(abc.ABC):
    name: str
    description: str
    image_url: str

    wait_ms = 100
    frame_count = 0
    config: dict = {}

    def to_dict(self):
        return {
            "name": self.name,
            "description": self.description,
            "image_url": self.image_url,
        }

    def start(self, pixels):
        pass

    def update_frame(self, pixels):
        pass

    def stop(self, pixels):
        pass

class BaseStaticColourMode(BaseMode):

    colour = (255, 255, 255)

    def start(self, pixels):
        pixels.fill(self.colour)
        pixels.show()
