import atexit
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
            time.sleep(1)
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
                print("no outputframe")
                time.sleep(1)
                continue
            (flag, encodedImage) = cv2.imencode(".jpg", outputFrame)
            if not flag:
                print("no flag")
                continue
        yield b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + bytearray(encodedImage) + b'\r\n'


@app.route("/video_feed")
def video_feed():
    print("serving video feed")
    return Response(video_frames(), mimetype="multipart/x-mixed-replace; boundary=frame")



def release_video_feed():
    print("releasing")
    cap.release()
    cv2.destroyAllWindows()


t = threading.Thread(target=stream, daemon=True)
t.start()
atexit.register(release_video_feed)
