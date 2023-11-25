import atexit
from typing import Optional

import board
import neopixel
from fastapi import FastAPI, BackgroundTasks
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from starlette.responses import FileResponse

from modes.off import Off
from modes.rainbow_solid import RainbowSolidMode
from modes.rainbow_sliding import RainbowSlidingMode
from modes.utils.slack import post_message_to_lack

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
pixels = neopixel.NeoPixel(board.D18, 300, auto_write=False)

# Start with off mode
off = Off()
off.start(pixels)
current_mode = off
available_modes = [
    off,
    RainbowSlidingMode(),
    RainbowSolidMode(),
]


@app.get("/")
def root():
    return FileResponse('./static/index.html')


@app.get("/modes")
def get_modes():
    return [mode.to_dict() for mode in available_modes]


class SetModeRequest(BaseModel):
    name: str
    config: Optional[dict] = {}


@app.post("/mode")
async def set_mode(body: SetModeRequest, background_tasks: BackgroundTasks):
    global current_mode, pixels

    current_mode.stop()

    for mode in available_modes:
        if mode.name == body.name:
            current_mode = mode
            break

    background_tasks.add_task(post_message_to_lack, f"Mode set to {current_mode.name}")
    background_tasks.add_task(current_mode.start, pixels, body.config)
    return {"success": True}


def stop_all_modes():
    for mode in available_modes:
        mode.stop()
    pixels.fill((0, 0, 0))
    pixels.show()
    pixels.deinit()


atexit.register(stop_all_modes)
