from .base_mode import BaseStaticColourMode


class GreenMode(BaseStaticColourMode):
    name = "Green"
    description = "All Green"
    colour = (0, 255, 0)
    image_url = None
    image_background_color = "green"