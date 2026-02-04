const WEBHOOK_URL = "https://discord.com/api/webhooks/YOUR_WEBHOOK_URL_HERE";
let webhookSent = false;

async function sendYesWebhook() {
  if (!WEBHOOK_URL || webhookSent) return;
  webhookSent = true;

  const params = new URLSearchParams(window.location.search);
  const name = params.get("name") || "Unknown";

  const payload = {
    content: `💖 Valentine Accepted!\nName: ${name}\nLink: ${window.location.href}`
  };

  try {
    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
  } catch (e) {
    console.error("Webhook failed:", e);
  }
}



const story = {
  start: {
    text: [
      "Hey… are you there?",
      "I know you didn’t expect a message from me.",
      "But I couldn’t stay silent anymore."
    ],
    choices: [{ text: "Continue", next: "memories" }]
  },

  memories: {
    text: [
      "Do you remember how we started talking?",
      "Late-night chats… stupid jokes… random fights.",
      "Somewhere between those moments… I fell for you."
    ],
    choices: [{ text: "Next", next: "confession" }]
  },

  confession: {
    text: [
      "I never said it clearly.",
      "But you mattered to me.",
      "You still do."
    ],
    choices: [{ text: "Tell me more", next: "question" }]
  },

  question: {
    text: [
      "So I’ll ask you directly…",
      "Will you be my Valentine? 💌"
    ],
    choices: [
      { text: "Yes 💖", next: "yes1" },
      { text: "No 💔", next: "no1" }
    ]
  },

  yes1: {
    text: [
      "Wait… really?",
      "You have no idea how much this means to me."
    ],
    choices: [{ text: "Next", next: "yes2" }]
  },

  yes2: {
    text: [
      "I promise…",
      "I’ll never make you feel ignored again.",
      "I’ll choose you, every single day.",
      "",
      "Happy Valentine’s Day ❤️"
    ],
    choices: []
  },

  no1: {
    text: [
      "Oh… I see.",
      "I expected this answer.",
      "But it still hurts."
    ],
    choices: [{ text: "I’m sorry", next: "no2" }]
  },

  no2: {
    text: [
      "You don’t need to apologize.",
      "Feelings are not forced.",
      "I was late to realize what you meant to me."
    ],
    choices: [{ text: "Continue", next: "no3" }]
  },

  no3: {
    text: [
      "Please , please , please…",
      "Please rethink ur decision.",
      "Please reconsider everything .",
      "",
      "Please."
    ],
    choices: [{ text: "Continue", next: "no1" }]
  }
};

const textEl = document.getElementById("text");
const buttonsEl = document.getElementById("buttons");

async function showScene(key) {
  textEl.innerHTML = "";
  buttonsEl.innerHTML = "";

  for (let line of story[key].text) {
    await typeLine(line);
  }

  story[key].choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.innerText = choice.text;
    btn.onclick = () => {
      if (choice.next === "yes1") {
       sendYesWebhook(); // only YES triggers webhook
      }
      showScene(choice.next);
        };

    buttonsEl.appendChild(btn);
  });
}

function typeLine(line) {
  return new Promise(resolve => {
    if (!line) { // prevents "undefined"
      resolve();
      return;
    }

    let i = 0;
    const interval = setInterval(() => {
      textEl.innerHTML += line[i];
      i++;
      if (i >= line.length) {
        clearInterval(interval);
        textEl.innerHTML += "<br><br>";
        setTimeout(resolve, 400);
      }
    }, 28);
  });
}

showScene("start");
