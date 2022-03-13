import os

try:
    import board
    from neopixel import NeoPixel
    from button import register_button
except:
    pass
from flask import Flask
from flask_cors import CORS

dir_path = os.path.dirname(os.path.realpath(__file__))
build_dir = os.path.join(dir_path, "build")

app = Flask(__name__, static_folder=build_dir)
CORS(app)

from main_leds import *

if __name__ == '__main__':
    if os.getenv('WERKZEUG_RUN_MAIN') == 'true':
        post_message_to_lack("stairs pi has booted")
        # register_button(button_callback)
        pixels.fill((255, 255, 255))
        atexit.register(stop_leds)
        start_worker()
    app.run(host="0.0.0.0", debug=True)
