from .base_mode import BaseStaticColourMode


class RedMode(BaseStaticColourMode):
    name = "Red"
    description = "All Red"
    colour = (255, 0, 0)
    image_url = None
    image_background_color = "red"
    wait_ms = 500

