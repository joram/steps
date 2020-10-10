import atexit
import os
from flask import Flask, request, send_from_directory, jsonify
from concurrent.futures import ThreadPoolExecutor
from flask_cors import CORS
from neopixel import Adafruit_NeoPixel, Color

from api.leds import colorWipe, theaterChase, rainbow, rainbowCycle, theaterChaseRainbow

done = False
dir_path = os.path.dirname(os.path.realpath(__file__))
build_dir = os.path.join(dir_path, "build")
app = Flask(__name__, static_folder=build_dir)
CORS(app)

state = {}


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


# LED strip configuration:
LED_COUNT = 16  # Number of LED pixels.
LED_PIN = 18  # GPIO pin connected to the pixels (18 uses PWM!).
LED_FREQ_HZ = 800000  # LED signal frequency in hertz (usually 800khz)
LED_DMA = 10  # DMA channel to use for generating signal (try 10)
LED_BRIGHTNESS = 255  # Set to 0 for darkest and 255 for brightest
LED_INVERT = False  # True to invert the signal (when using NPN transistor level shift)
LED_CHANNEL = 0  # set to '1' for GPIOs 13, 19, 41, 45 or 53


def drive_leds():
    # Create NeoPixel object with appropriate configuration.
    strip = Adafruit_NeoPixel(LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT, LED_BRIGHTNESS, LED_CHANNEL)
    # Intialize the library (must be called once before other functions).
    strip.begin()
    while not done:
        print('Color wipe animations.')
        colorWipe(strip, Color(255, 0, 0))  # Red wipe
        colorWipe(strip, Color(0, 255, 0))  # Blue wipe
        colorWipe(strip, Color(0, 0, 255))  # Green wipe
        print('Theater chase animations.')
        theaterChase(strip, Color(127, 127, 127))  # White theater chase
        theaterChase(strip, Color(127, 0, 0))  # Red theater chase
        theaterChase(strip, Color(0, 0, 127))  # Blue theater chase
        print('Rainbow animations.')
        rainbow(strip)
        rainbowCycle(strip)
        theaterChaseRainbow(strip)


def stop_leds():
    global done
    done = True


if __name__ == '__main__':
   executor = ThreadPoolExecutor(2)
   executor.submit(drive_leds)
   atexit.register(stop_leds)
   app.run(host="0.0.0.0", debug=True)

