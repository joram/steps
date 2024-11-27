from .base_mode import BaseStaticColourMode


class BlueMode(BaseStaticColourMode):
    name = "Blue"
    description = "All Blue"
    colour = (0, 0, 255)
    image_url = None
    image_background_color = "blue"

