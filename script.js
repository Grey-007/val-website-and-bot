function getParam(key) {
  const params = new URLSearchParams(window.location.search);
  const value = params.get(key);
  return value ? decodeURIComponent(value) : null;
}

// ================= CUSTOM SETTINGS =================

const YOUR_NAME = "Rudra";
const GIRL_NAME = getParam("name") || "Aarohi";
const CUSTOM_MESSAGE = "Everyone deserves a second chance... us too... please 🥺";

// Backend API URL (NOT Discord webhook)
const BACKEND_API = "http://127.0.0.1:5000/webhook";

// ===================================================

// UI Setup
document.getElementById("yourName").innerText = YOUR_NAME + " 💚";

const chat = document.getElementById("chat");
const typingBubble = document.getElementById("typingBubble");

// ================= TRACKING SYSTEM =================

// Unique session ID
const SESSION_ID = Math.random().toString(36).substring(2, 10);

// Start time
const startTime = Date.now();

// Analytics data
let analytics = {
  sessionId: SESSION_ID,
  girlName: GIRL_NAME,
  yourName: YOUR_NAME,
  noClicks: 0,
  yesClicked: false,
  messages: [],
  device: getDeviceInfo(),
  timeline: []
};

// Device info
function getDeviceInfo() {
  return {
    type: /Mobi|Android/i.test(navigator.userAgent) ? "Mobile 📱" : "Desktop 💻",
    browser: navigator.userAgent.split(") ")[0] + ")",
    screen: `${window.innerWidth}x${window.innerHeight}`
  };
}

// Time helper
function now() {
  return new Date().toLocaleString();
}

// Timeline logger
function logEvent(event) {
  analytics.timeline.push({
    time: now(),
    event
  });
}

// ================= CHAT FUNCTIONS =================

function addBubble(text, side = "left") {
  const div = document.createElement("div");
  div.className = `bubble ${side}`;
  div.innerText = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;

  analytics.messages.push(`${side === "left" ? YOUR_NAME : GIRL_NAME}: ${text}`);
  if (analytics.messages.length > 12) analytics.messages.shift();

  logEvent(`${side === "left" ? "YOU" : "HER"}: ${text}`);
}

function showTyping() {
  typingBubble.style.display = "block";
}

function hideTyping() {
  typingBubble.style.display = "none";
}

// ================= SEND DATA TO BACKEND =================

function sendDiscordReport(result) {
  const duration = Math.floor((Date.now() - startTime) / 1000);

  const payload = {
    result: result,
    sessionId: analytics.sessionId,
    girlName: GIRL_NAME,
    yourName: YOUR_NAME,
    duration: duration,
    noClicks: analytics.noClicks,
    device: analytics.device,
    messages: analytics.messages,
    timeline: analytics.timeline
  };

  fetch(BACKEND_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
  .catch(err => console.error("Backend error:", err));
}

// ================= CHAT FLOW =================

setTimeout(showTyping, 800);
setTimeout(() => {
  hideTyping();
  addBubble("Hey 🙂", "left");
}, 1500);

setTimeout(showTyping, 2200);
setTimeout(() => {
  hideTyping();
  addBubble("I wanted to tell you something...", "left");
}, 3000);

setTimeout(showTyping, 3800);
setTimeout(() => {
  hideTyping();
  addBubble(CUSTOM_MESSAGE, "left");
}, 4600);

setTimeout(showTyping, 5400);
setTimeout(() => {
  hideTyping();
  addBubble("Will you be my Valentine? 💖", "left");
}, 6200);

// ================= YES PATH ❤️ =================

document.getElementById("yesBtn").addEventListener("click", () => {
  analytics.yesClicked = true;

  addBubble("Yes ❤️", "right");

  logEvent("HER clicked YES");

  sendDiscordReport("YES");

  setTimeout(() => {
    addBubble("I was scared to say it... but yes 💖", "right");
  }, 600);

  setTimeout(() => {
    document.body.innerHTML = `
      <div style="width:100vw;height:100vh;display:flex;justify-content:center;align-items:center;
      background:#0b141a;color:white;font-size:2.4rem;text-align:center;">
        ${GIRL_NAME} said YES 😍💖<br>
        Love unlocked 🔓❤️
      </div>
    `;
  }, 2000);
});

// ================= NO PATH 💔 =================

const herReplies = [
  "No 💔",
  "I don’t think so...",
  "I’m not ready 😔",
  "I’m sorry... I can’t 🥺",
  "Maybe we should stop here..."
];

const yourMessages = [
  "Please... just think about it 🥺",
  "I know I messed up, but I’ve changed 💔",
  "You still mean everything to me 😞",
  "I don’t want to lose you...",
  "Okay... I understand 😔"
];

let i = 0;

document.getElementById("noBtn").addEventListener("click", () => {
  analytics.noClicks++;

  addBubble(herReplies[i], "right");
  logEvent("HER clicked NO");

  setTimeout(() => {
    addBubble(yourMessages[i], "left");
  }, 700);

  i++;

  if (i >= herReplies.length) {
    sendDiscordReport("NO");
    i = 0;
  }
});
