import os
from slack import WebhookClient
import dotenv

dotenv.load_dotenv()


def post_message_to_lack(msg="Hello world!"):
    client = WebhookClient(url=os.environ["SLACK_WEBHOOK_URL"])
    client.send(text=msg)
