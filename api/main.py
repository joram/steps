import atexit

from flask import Flask, request
from time import sleep
from concurrent.futures import ThreadPoolExecutor

done = False
app = Flask(__name__)
state = {}


@app.route('/')
def home():
    return 'Two jobs were launched in background!'


@app.route('/api/v0/state', methods=["GET", "POST"])
def state_view():
    global state
    if request.method == "POST":
        state = request.json.get("state")
    return state


def drive_leds():
    while not done:
        print(f"lights 2 tick: {state}")
        sleep(1)


def stop_leds():
    global done
    done = True


if __name__ == '__main__':
    executor = ThreadPoolExecutor(2)
    executor.submit(drive_leds)
    atexit.register(stop_leds)
    app.run(host="0.0.0.0", debug=True)
