import os
from slack import WebhookClient
import dotenv

dotenv.load_dotenv()
client = WebhookClient(url=os.environ["SLACK_WEBHOOK_URL"])


def post_message_to_lack(msg="Hello world!"):
    client.send(text=msg)
