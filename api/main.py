import os

from flask import Flask
from flask_cors import CORS
import threading
import time
import datetime

try:
    import board
    from neopixel import NeoPixel
    from button import register_button
except:
    pass
from flask import Flask, request, send_from_directory, jsonify
from flask_cors import CORS

from modes import (
    mode_solid_rainbow,
    mode_fading,
    mode_solid,
    mode_sliding_circle_rainbow,
    mode_off,
    mode_per_step,
    mode_nyan_cat,
    mode_nyan_cats,
    mode_solid_sparkly,
    mode_chaos_colors, mode_solid_rough, mode_halloween,
)
from utils import state_key, set_state, get_state
from slack_util import post_message_to_lack

dir_path = os.path.dirname(os.path.realpath(__file__))
build_dir = os.path.join(dir_path, "build")

app = Flask(__name__, static_folder=build_dir)
CORS(app)

from main_leds import *
from main_camera import *

if __name__ == '__main__':
    if os.getenv('WERKZEUG_RUN_MAIN') == 'true':
        post_message_to_lack("stairs pi has booted")
        # register_button(button_callback)
        pixels.fill((255, 255, 255))
        atexit.register(stop_leds)
        start_worker()
    app.run(host="0.0.0.0", debug=True)
