import atexit
import json
import os
from flask import Flask, request, send_from_directory, jsonify
from flask_cors import CORS
from neopixel import NeoPixel
import board
import threading
import time
import colorsys
import json

from modes import mode_solid_rainbow, mode_fading, mode_solid, mode_sliding_rainbow, mode_off, mode_per_step
from utils import _state_key, set_state, get_state

dir_path = os.path.dirname(os.path.realpath(__file__))
build_dir = os.path.join(dir_path, "build")
app = Flask(__name__, static_folder=build_dir)
CORS(app)

done = False
pixels = NeoPixel(board.D18, 300, auto_write=False)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/api/v0/state', methods=["GET", "POST"])
def state_view():
    if request.method == "POST":
        state = request.json.get("state")
        set_state(state)
        print(state)
    return jsonify(state)


def drive_leds():
    global done
    key = ""
    while not done:
        new_key = _state_key()
        if new_key != key:
            key = new_key
            state = get_state()
            mode = state.get("mode", "solid")
            print(f"change in state!: {state}")
            if mode == "solid":
                worker_thread = threading.Thread(target=mode_solid, args=(key, pixels))
            if mode == "off":
                worker_thread = threading.Thread(target=mode_off, args=(key, pixels))
            if mode == "fading":
                worker_thread = threading.Thread(target=mode_fading, args=(key, pixels))
            if mode == "solid_rainbow":
                worker_thread = threading.Thread(target=mode_solid_rainbow, args=(key, pixels))
            if mode == "sliding_rainbow":
                worker_thread = threading.Thread(target=mode_sliding_rainbow, args=(key, pixels))
            if mode == "per_steps":
                worker_thread = threading.Thread(target=mode_per_steps, args=(key, pixels))

            worker_thread.daemon = True
            worker_thread.start()

        time.sleep(0.1)

    pixels.fill((0, 0, 0))


@app.before_first_request
def start_worker():
    global thread
    thread = threading.Thread(target=drive_leds)
    thread.daemon = True                            # Daemonize thread
    thread.start()                                  # Start the execution


def stop_leds():
    global done
    done = True
    pixels.fill((0, 0, 0))


if __name__ == '__main__':
    pixels.fill((255, 255, 255))
    atexit.register(stop_leds)
    app.run(host="0.0.0.0", debug=True)


