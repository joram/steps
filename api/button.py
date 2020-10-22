import RPi.GPIO as GPIO # Import Raspberry Pi GPIO library
import time
import datetime


last_pressed = datetime.datetime.now()
def button_callback(channel):
    global last_pressed
    since = datetime.datetime.now() - last_pressed
    if since >= datetime.timedelta(seconds=5):
        last_pressed = datetime.datetime.now()
        print("Button was pushed!")


def register_button():
    pin = 15
    GPIO.setwarnings(False)
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(pin, GPIO.IN, pull_up_down=GPIO.PUD_UP) 
    GPIO.add_event_detect(pin, GPIO.RISING, callback=button_callback)

