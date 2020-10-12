import atexit
import os
from flask import Flask, request, send_from_directory, jsonify
from flask_cors import CORS
from neopixel import NeoPixel
import board
import threading
import time
from leds import colorWipe, theaterChase, rainbow, rainbowCycle, theaterChaseRainbow

dir_path = os.path.dirname(os.path.realpath(__file__))
build_dir = os.path.join(dir_path, "build")
app = Flask(__name__, static_folder=build_dir)
CORS(app)

done = False
thread = None
state = {
  "color": {"r": 255, "g": 255, "b":255}
}
pixels = NeoPixel(board.D20, 150)


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
        state = request.json.get("state")
    return jsonify(state)


def drive_leds():
    global done
    mode = state.get("mode", "solid")
    while not done:
        print(state)
        if mode == "solid":
            color = state.get("color")
            pixels.fill((
                color.get("r", 255),
                color.get("g", 255),
                color.get("b", 255),
            ))
        time.sleep(1)
    pixels.fill((0,0,0))


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


