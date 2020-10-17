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

dir_path = os.path.dirname(os.path.realpath(__file__))
build_dir = os.path.join(dir_path, "build")
app = Flask(__name__, static_folder=build_dir)
CORS(app)

done = False
thread = None
state = {
  "color": {"r": 255, "g": 255, "b":255}
}
pixels = NeoPixel(board.D18, 300)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/api/v0/state', methods=["GET", "POST"])
def state_view():
    global state
    if request.method == "POST":
        print(request.json)
        state = request.json.get("state")
    return jsonify(state)


def _state_key():
    return json.dumps(state, sort_keys=True)


def mode_solid(key):
    while key == _state_key():
        color = state.get("color")
        pixels.fill((
            color.get("r", 255),
            color.get("g", 255),
            color.get("b", 255),
        ))
        time.sleep(1)


def _color_tuple(data):
    return (
        data.get("r", 255),
        data.get("g", 255),
        data.get("b", 255),
    )


def _color_between(c1, c2, ratio):
    (h1, l1, s1) = colorsys.rgb_to_hls(c1[0], c1[1], c1[2])
    (h2, l2, s2) = colorsys.rgb_to_hls(c2[0], c2[1], c2[2])
    h3 = h1*ratio + h2*(1-ratio)
    l3 = l1*ratio + l2*(1-ratio)
    s3 = s1*ratio + s2*(1-ratio)
    return colorsys.hls_to_rgb(h3, l3, s3)


def mode_fading(key):
    colors = state.get("colors", [
        {"r": 255, "g": 255, "b": 255},
        {"r": 0, "g": 0, "b": 0},
    ])
    c1 = _color_tuple(colors[0])
    c2 = _color_tuple(colors[1])
    i = 0
    while key == _state_key():
        i = i % 100
        color = _color_between(c1, c2, i/100)
        pixels.fill(color)
        time.sleep(0.1)
        i += 1


def wheel(pos):
    """Generate rainbow colors across 0-255 positions."""
    if pos < 85:
        return (pos * 3, 255 - pos * 3, 0)
    elif pos < 170:
        pos -= 85
        return (255 - pos * 3, 0, pos * 3)
    pos -= 170
    return (0, pos * 3, 255 - pos * 3)


def mode_rainbow(key):
    h = 0
    while key == _state_key():
        h = h % 255
        color = wheel(h)
        pixels.fill(color)
        time.sleep(0.1)
        h += 1


def drive_leds():
    global done
    key = _state_key()
    while not done:
        new_key = _state_key()
        if new_key != key:
            key = new_key
            mode = state.get("mode", "solid")
            if mode == "solid":
                worker_thread = threading.Thread(target=mode_solid, args=(key,))
                worker_thread.daemon = True
                worker_thread.start()

            if mode == "fading":
                worker_thread = threading.Thread(target=mode_fading, args=(key,))
                worker_thread.daemon = True
                worker_thread.start()

            if mode == "rainbow":
                worker_thread = threading.Thread(target=mode_rainbow, args=(key,))
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
    pixels.fill((0,0,0))


if __name__ == '__main__':
    pixels.fill((255, 255, 255))
    atexit.register(stop_leds)
    app.run(host="0.0.0.0", debug=True)


