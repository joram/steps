import RPi.GPIO as GPIO # Import Raspberry Pi GPIO library
import time
import datetime
import atexit

callback_func = None
last_pressed = datetime.datetime.now()


def debounced_input(pin):
    tries = 10
    ones = 0
    zeros = 0
    for i in range(0, tries):
        bit=GPIO.input(pin)
        if bit == 1:
           ones = ones + 1
           zeros = 0
        else:
           zeros = zeros + 1
           ones = 0
        if ones >= 3:
            return False
        if zeros >= 3:
            return True
        time.sleep(0.1) # wait a bit

    return False


def button_callback(channel):
    global callback_func
    global last_pressed
    since = datetime.datetime.now() - last_pressed
    #if True:
    if since >= datetime.timedelta(seconds=5) and debounced_input(channel):
        last_pressed = datetime.datetime.now()
        print(f"{channel} Button was pushed!", last_pressed)
        if callback_func is not None:
            callback_func()


def register_button(func):
    global callback_func
    callback_func = func

    pin = 15
    GPIO.setmode(GPIO.BCM)
    #GPIO.setup(pin, GPIO.IN, pull_up_down=GPIO.PUD_DOWN) 
    GPIO.setup(pin, GPIO.IN, pull_up_down=GPIO.PUD_UP) 
    #GPIO.add_event_detect(pin, GPIO.RISING, callback=button_callback)
    GPIO.add_event_detect(pin, GPIO.FALLING, callback=button_callback)
    atexit.register(GPIO.cleanup)


if __name__ == "__main__":
    register_button(None)
    print("registered")
    while True:
        time.sleep(10)
