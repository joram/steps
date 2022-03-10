import os

from flask import Flask
from flask_cors import CORS

dir_path = os.path.dirname(os.path.realpath(__file__))
build_dir = os.path.join(dir_path, "build")

app = Flask(__name__, static_folder=build_dir)
CORS(app)

from main_leds import *
from main_camera import *

if __name__ == '__main__':
    register_button(button_callback)
    pixels.fill((255, 255, 255))
    atexit.register(stop_leds)
    app.run(host="0.0.0.0", debug=True)
