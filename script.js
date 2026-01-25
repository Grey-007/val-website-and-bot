// ===== CUSTOM SETTINGS =====
const HER_NAME = "Piona"; // change name here
const MESSAGE_TEXT = "Everyone deserves a chance... us too... please 🥺";
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
  document.getElementById("bgMusic").play();
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

noBtn.addEventListener("click", () => {
  // move to next text
  noIndex = (noIndex + 1) % noTexts.length; // 🔁 LOOP HERE

  noBtn.innerText = noTexts[noIndex];

  // Apple-style micro animation 🍎
  noBtn.style.transform = "scale(1.06)";
  noBtn.style.boxShadow = "0 0 18px rgba(255,45,85,0.6)";

  setTimeout(() => {
    noBtn.style.transform = "scale(1)";
    noBtn.style.boxShadow = "0 6px 16px rgba(0,0,0,0.25)";
  }, 200);
});


// YES Button 💘
document.getElementById("yesBtn").addEventListener("click", () => {
  const meter = document.getElementById("meterFill");

  // Gradual Love Meter 📊
  let progress = 0;
  const interval = setInterval(() => {
    progress += 2;
    meter.style.width = progress + "%";
    if (progress >= 100) clearInterval(interval);
  }, 35);

  // Confetti 🎆
  confetti({ particleCount: 220, spread: 120, origin: { y: 0.6 } });

  // Final Screen 💞
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
