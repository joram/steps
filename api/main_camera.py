import os

from flask import Response, Flask, render_template
import threading
import argparse
import datetime, time
import imutils
import cv2
from main import app

# initialize the output frame and a lock used to ensure thread-safe
# exchanges of the output frames (useful when multiple browsers/tabs are viewing the stream)
outputFrame = None
lock = threading.Lock()


cap = cv2.VideoCapture(os.environ["CAMERA_URI"])


def stream():
    global outputFrame, lock

    if not cap.isOpened():
        print('camera open failed')
        time.sleep(1)
        return

    while True:
        ret_val, frame = cap.read()
        if frame is None:
            print("skipping bad frame")
            continue
        if frame.shape:
            frame = cv2.resize(frame, (1920, 1080))
            with lock:
                outputFrame = frame.copy()
        else:
            continue


def video_frames():
    global outputFrame, lock
    while True:
        with lock:
            if outputFrame is None:
                continue
            (flag, encodedImage) = cv2.imencode(".jpg", outputFrame)
            if not flag:
                continue
        yield b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + bytearray(encodedImage) + b'\r\n'


@app.route("/")
def video_feed():
    return Response(video_frames(), mimetype="multipart/x-mixed-replace; boundary=frame")


if __name__ == '__main__':
    t = threading.Thread(target=stream)
    t.daemon = True
    t.start()

    # start the flask app
    app.run(port=8000, debug=True, threaded=True, use_reloader=True)

# release the video stream pointer
cap.release()
cv2.destroyAllWindows()
