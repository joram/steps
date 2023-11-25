import abc


class BaseMode(abc.ABC):
    name: str
    description: str
    image_url: str
    running: bool = False
    config: dict = {}

    def to_dict(self):
        return {
            "name": self.name,
            "description": self.description,
            "image_url": self.image_url,
        }

    @abc.abstractmethod
    def update_frame(self, pixels):
        pass

    def start(self, pixels, config=None):
        self.config = config
        self.running = True
        while self.running:
            self.update_frame(pixels)

    def stop(self):
        self.running = False
