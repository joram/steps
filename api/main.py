#!/usr/bin/env python3
import uvicorn
import asyncio
from typing import Optional

import board
# import neopixel
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from starlette.responses import FileResponse

# from modes.off import Off
# from modes.rainbow_sliding import RainbowSlidingMode
# from modes.rainbow_solid import RainbowSolidMode
# from modes.red import RedMode
# from modes.green import GreenMode
# from modes.blue import BlueMode
# from modes.utils.slack import post_message_to_lack

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

# Start with off mode
# off = Off()
available_modes = [
    # off,
    # RainbowSlidingMode(),
    # RainbowSolidMode(),
    # RedMode(),
    # GreenMode(),
    # BlueMode(),
]
queue = asyncio.Queue()


# pixels = neopixel.NeoPixel(board.D18, 300, auto_write=False)
# pixels.fill((255,255,255))
# pixels.show()

class SetModeRequest(BaseModel):
    name: str
    config: Optional[dict] = {}


@app.get("/")
def root():
    return FileResponse('./static/index.html')


@app.get("/modes")
def get_modes():
    return [mode.to_dict() for mode in available_modes]


# @app.on_event("startup")
# def startup_event():
#     asyncio.create_task(mode_runner(pixels))


async def mode_runner(pixels):

    await asyncio.sleep(1)

    # mode = off
    # mode.start(pixels)
    while True:
        print("Running")
        await asyncio.sleep(1)
        # # Idle until we have a new mode to run
        # if queue.empty():
        #     mode.update_frame(pixels)
        #     await asyncio.sleep(mode.wait_ms/1000)
        #     continue
        #
        # # Get the next mode to run
        # request_body = await queue.get()
        #
        # # Find the next mode
        # next_mode = None
        # for m in available_modes:
        #     if m.name == request_body.name:
        #         next_mode = m
        #         break
        # if not next_mode:
        #     print(f"Unknown mode '{request_body.name}'")
        #     continue
        # if mode == next_mode:
        #     print(f"Already running '{mode.name}'")
        #     continue
        #
        # msg = f"Moving from '{mode.name}' to '{next_mode.name}'"
        # post_message_to_lack(msg)
        # print(msg)
        #
        # # Run the new mode
        # mode.stop(pixels)
        # mode = next_mode
        # mode.start(pixels)


@app.post("/mode")
async def set_mode(body: SetModeRequest):
    await queue.put(body)
    return {"success": True}

if __name__ == "__main__":
    uvicorn.run("main:app", port=5000, log_level="info")