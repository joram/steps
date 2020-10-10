import atexit
import os
from flask import Flask, request, send_from_directory
from time import sleep
from concurrent.futures import ThreadPoolExecutor

done = False
dir_path = os.path.dirname(os.path.realpath(__file__))
build_dir = os.path.join(dir_path, "build")
app = Flask(__name__, static_folder=build_dir)
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
    return state


def drive_leds():
    while not done:
        print(f"lights 2 tick: {state}")
        sleep(1)


def stop_leds():
    global done
    done = True


if __name__ == '__main__':
#    executor = ThreadPoolExecutor(2)
 #   executor.submit(drive_leds)
#    atexit.register(stop_leds)
    app.run(host="0.0.0.0", debug=True)
