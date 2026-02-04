function getParam(key) {
  const params = new URLSearchParams(window.location.search);
  const value = params.get(key);
  return value ? decodeURIComponent(value) : null;
}

// 🔥 Discord Webhook URL
const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1465364757480608040/fQ9dXbZvLurEeYuvUciQUuPpF8QXUhxUdHjE-oBFbr2PgEOAwd2vyCUGBZdtWmABsjv_";

// ===== CUSTOM SETTINGS =====
const GIRL_NAME = getParam("name") || "Piona";
const YOUR_NAME = getParam("you") || "Someone";
const HER_NAME = GIRL_NAME;
const MESSAGE_TEXT = "Everyone deserves a second chance... us too... please 🥺";
// ===========================

// Cinematic Intro 🎬
window.addEventListener("load", () => {
  const card = document.getElementById("card");

  setTimeout(() => {
    card.classList.remove("hidden");
    setTimeout(() => card.classList.add("show"), 100);
  }, 2800);
});

// Typing Effect 💌
let index = 0;
function typeEffect() {
  if (index < MESSAGE_TEXT.length) {
    document.getElementById("typing").innerHTML += MESSAGE_TEXT.charAt(index);
    index++;
    setTimeout(typeEffect, 45);
  }
}
setTimeout(typeEffect, 3000);

// Floating Hearts 💖
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerHTML = "💖";
  heart.style.left = Math.random() * window.innerWidth + "px";
  heart.style.fontSize = Math.random() * 22 + 14 + "px";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 6000);
}
setInterval(createHeart, 260);

// Background Music 🎵
document.body.addEventListener("click", () => {
  const music = document.getElementById("bgMusic");
  if (music) music.play();
}, { once: true });

const buttonsBox = document.querySelector(".buttons");

// NO button looping text 💔
const noBtn = document.getElementById("noBtn");

const noTexts = [
  "No 💔",
  "Are you sure?",
  "Please don’t 😭",
  "Think again 🥺",
  "Last chance 💞"
];

let noIndex = 0;

// Unique session ID
const SESSION_ID = Math.random().toString(36).substring(2, 10);

// Start time
const startTime = Date.now();

// Device info (safe)
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

// Add event to timeline
function logEvent(event) {
  analytics.timeline.push({
    time: now(),
    event
  });
}

// NO button logic
noBtn.addEventListener("click", () => {
  analytics.noClicks++;
  logEvent("Clicked NO");

  noIndex = (noIndex + 1) % noTexts.length;
  noBtn.innerText = noTexts[noIndex];

  noBtn.style.transform = "scale(1.06)";
  noBtn.style.boxShadow = "0 0 18px rgba(255,45,85,0.6)";

  setTimeout(() => {
    noBtn.style.transform = "scale(1)";
    noBtn.style.boxShadow = "0 6px 16px rgba(0,0,0,0.25)";
  }, 200);
});

// ================= DISCORD WEBHOOK =================

function sendDiscordReport(result) {
  const duration = Math.floor((Date.now() - startTime) / 1000);

  const embed = {
    title: "🧠 Valentine Interaction Report",
    color: result === "YES" ? 0xff2d55 : 0x555555,
    fields: [
      { name: "💘 Result", value: result === "YES" ? "YES ❤️" : "NO 💔", inline: true },
      { name: "🆔 Session ID", value: analytics.sessionId, inline: true },
      { name: "⏱ Duration", value: duration + " sec", inline: true },

      { name: "👧 Girl", value: GIRL_NAME, inline: true },
      { name: "👦 You", value: YOUR_NAME, inline: true },
      { name: "📊 No Clicks", value: analytics.noClicks.toString(), inline: true },

      { name: "💻 Device", value: analytics.device.type, inline: true },
      { name: "🖥 Screen", value: analytics.device.screen, inline: true },

      { name: "🧠 Behavior", value: analytics.noClicks > 2 ? "Hesitated 💔" : "Fast Decision 💖", inline: false },

      { name: "📜 Timeline", value: "```" + analytics.timeline.map(e => `${e.time} - ${e.event}`).join("\n") + "```", inline: false }
    ],
    footer: {
      text: "Valentine Analytics System 💻"
    }
  };

  fetch(DISCORD_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "Valentine Tracker 🤖",
      embeds: [embed]
    })
  }).catch(err => console.error("Discord webhook error:", err));
}

// YES Button 💘
document.getElementById("yesBtn").addEventListener("click", () => {
  analytics.yesClicked = true;
  logEvent("Clicked YES");

  const meter = document.getElementById("meterFill");

  let progress = 0;
  const interval = setInterval(() => {
    progress += 2;
    meter.style.width = progress + "%";
    if (progress >= 100) clearInterval(interval);
  }, 35);

  if (typeof confetti !== "undefined") {
    confetti({ particleCount: 220, spread: 120, origin: { y: 0.6 } });
  }

  // ✅ SEND DISCORD NOTIFICATION
  sendDiscordReport("YES");

  setTimeout(() => {
    document.body.innerHTML = `
      <div class="final-screen">
        <h1>
          ${HER_NAME} said YES 😍💖<br>
          Love unlocked 🔓❤️
        </h1>
      </div>
    `;
  }, 2200);
});
