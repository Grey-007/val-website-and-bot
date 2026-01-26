import discord
from discord import app_commands
import random
import string
import qrcode
from io import BytesIO
import os
import os
print("TOKEN FOUND:", os.getenv("DISCORD_TOKEN"))

TOKEN = os.getenv("DISCORD_TOKEN")

intents = discord.Intents.default()
intents.message_content = True

client = discord.Client(intents=intents)
tree = app_commands.CommandTree(client)

def generate_id(length=6):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

@client.event
async def on_ready():
    print(f"Bot is online as {client.user}")
    await tree.sync()

@tree.command(name="valentine", description="Create a personalized Valentine link")
@app_commands.describe(name="Name of your valentine")
async def valentine(interaction: discord.Interaction, name: str):
    
    unique_id = generate_id()
    link = f"https://your-site.com/v/{unique_id}"

    # Generate QR Code
    qr = qrcode.make(link)
    buffer = BytesIO()
    qr.save(buffer, format="PNG")
    buffer.seek(0)

    file = discord.File(buffer, filename="valentine_qr.png")

    message = f"""
💌 **Valentine Link Created!**

Name: **{name}**
Link: {link}
"""

    await interaction.response.send_message(message, file=file)

client.run(TOKEN)
