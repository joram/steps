import atexit
import os
import threading
import time

from api.modes import mode_two_nyan_cats

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
)
from utils import state_key, set_state, get_state
from slack_util import post_message_to_lack

dir_path = os.path.dirname(os.path.realpath(__file__))
build_dir = os.path.join(dir_path, "build")
app = Flask(__name__, static_folder=build_dir)
CORS(app)

done = False
pixels = None
try:
    pixels = NeoPixel(board.D18, 300, auto_write=False)
except:
    pass


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
    return jsonify(get_state())


@app.route('/api/v0/file', methods=["POST"])
def file_view():
    state = request.files
    print(state)
    import pdb
    pdb.set_trace()
    # set_state(state)
    # print(state)
    return jsonify(get_state())


def drive_leds():
    global done
    key = ""
    while not done:
        new_key = state_key()
        if new_key != key:
            key = new_key
            state = get_state()
            mode = state.get("mode", "solid")
            print(f"change in state!: {state}")
            func = {
                "off": mode_off,
                "solid": mode_solid,
                "fading": mode_fading,
                "solid_rainbonyan_catw": mode_solid_rainbow,
                "sliding_rainbow": mode_sliding_circle_rainbow,
                "per_step": mode_per_step,
                "nyan_cat": mode_nyan_cat,
                "two_nyan_cats": mode_two_nyan_cats,
            }.get(mode, mode_solid)

            worker_thread = threading.Thread(target=func, args=(key, pixels))
            worker_thread.daemon = True
            worker_thread.start()

        time.sleep(0.1)

    pixels.fill((0, 0, 0))


@app.before_first_request
def start_worker():
    thread = threading.Thread(target=drive_leds)
    thread.daemon = True                            # Daemonize thread
    thread.start()                                  # Start the execution


def stop_leds():
    global done
    done = True
    pixels.fill((0, 0, 0))


def button_callback():
    post_message_to_lack()

    set_state({"mode": "nyan_cat"})
    time.sleep(10)
    set_state({"mode": "per_step"})


if __name__ == '__main__':
    if pixels is not None:
        register_button(button_callback)
        pixels.fill((255, 255, 255))
        atexit.register(stop_leds)
    app.run(host="0.0.0.0", debug=True)
