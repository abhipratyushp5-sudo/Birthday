const screens = [...document.querySelectorAll(".screen")];
const loader = document.getElementById("loader");
const petalLayer = document.getElementById("petalLayer");
const flowerMessage = document.getElementById("flowerMessage");
const flowerContinue = document.getElementById("flowerContinue");
const memoryMessage = document.getElementById("memoryMessage");
const modal = document.getElementById("flowerModal");
const modalMessage = document.getElementById("modalMessage");
const modalFlower = document.getElementById("modalFlower");
const bgMusic = document.getElementById("bgMusic");

let musicPlaying = false;
let soundOn = true;
let petalTimer;

// ================= PERSONALIZE THESE =================
const HER_NAME = "My Princess My Jaan";
const YOUR_NAME = "Gadhdu";

const LETTER = `Hey meri jaan ❤️,

Aaj tumhara birthday hai 🎂🥳… aur pata hai, sabse zyada ajeeb kya lag raha hai?  
Ki aaj ke itne special din par main tumhare paas nahi hoon 😔. Tumhare saamne nahi hoon, tumhe wish karte waqt tumhara face nahi dekh pa raha, tumhe tang nahi kar pa raha, aur na hi tumhare saath baithkar tumhari birthday wali smile dekh pa raha hoon 🥺❤️.

Pichhli baar bhi hum saath nahi the… aur iss baar bhi nahi hain. 🙁  
Lekin ek cheez hai jo distance kabhi nahi badal sakta—hum dono ka connection❤️

Main chahta hoon ki jab bhi tum mujhe yaad karo, tumhe aisa lage ki main tumhare bilkul paas hoon… tumhari har khushi mein, tumhari har tension mein, tumhari har chhoti si smile mein. 😊❤️

Main aaj ye ginane nahi baithunga ki main tumse kitna pyaar karta hoon ya tum mujhe kitna chahti ho… kyunki hum dono ko pata hai. Itne time se ek-doosre ko jaante, samajhte aur saath nibhate-nibhate humne apne rishte ko words se kahin zyada feel kiya hai. 🫶

Tum mere liye sirf ek person nahi ho… tum meri aadat ho, meri comfort ho, meri strength ho aur meri sabse beautiful feeling ho ❤️

Jab main kisi problem mein hota hoon, jab dimag mein hazaar cheezein chal rahi hoti hain, jab mujhe lagta hai ki sab kuch difficult ho raha hai… tab pata nahi kaise, tum meri life mein ek umeed bankar aa jaati ho. 💞

Kabhi meri tension ki dawa bankar 💆‍♂️,  
kabhi meri princess bankar 👸,  
kabhi meri best friend bankar 🤝,  
aur kabhi meri jaan bankar 🧡…

Tumne mujhe sirf pyaar nahi diya, tumne mujhe sambhala hai 
Meri problems mein mera saath diya, mujhe mentally support kiya, meri baatein suni, meri stupidity jheli 😂, mere gusse ko tolerate kiya aur phir bhi mere saath rahi. ❤️

Sach bolun toh… tum meri life ki un kuchh cheezon mein se ho jinko main kabhi khona nahi chahta🥺

Haan, main maanta hoon… kabhi-kabhi main tum par unnecessary gussa karta hoon 😤, chillata hoon, mood kharab karta hoon… aur shayad har baar tumhe ye feel bhi nahi kara pata ki tum mere liye kitni important ho.

Lekin meri jaan, ek baat hamesha yaad rakhna—

Mera gussa kuch minutes ka ho sakta hai, par tumhare liye mera pyaar usse kahin zyada bada hai. ❤️

Main tumhe khona nahi chahta. 🫥  
Mujhe tumhare saath rehna hai… sirf aaj nahi, sirf kal nahi… aage ki poori journey mein.🫶

Saath mein job karni hai 💼,  
saath mein grow karna hai 📈,  
saath mein apne dreams poore karne hain ✨,  
aur jab life difficult ho, tab ek-doosre ka haath pakad kar kehna hai—  
“Chal, saath hain na… ho jayega.” ❤️

Isliye bas ek request hai…  
Aise hi meri saathi bankar rehna.  
Kabhi dost bankar mujhe samajhna,  
kabhi guide bankar mujhe sahi direction dena 🤓,  
kabhi partner bankar mera saath dena,  
aur kabhi meri jaan bankar bas mere paas rehna. ❤️

Aur tumhare birthday par meri sabse special wish hai—

Tumhara har din khushiyon se bhar jaaye. 🌸  
God tumhe bahut saari success de. 🙏✨  
Tumhe ek bahut achhi job mile. 💼  
Tumhare saare dreams poore hon. 🌟  
Tum hamesha healthy, happy aur smiling raho. 😊  
Aur haan… tum hamesha mujhse aise hi pyaar karti raho. ❤️**

Baaki duniya tumhe birthday par gifts degi 🎁…  
main tumhe ek promise deta hoon—

Chahe kitni bhi problems aayein, kitni bhi distance ho, kitne bhi difficult days aayein… main tumhara saath nahi chhodna chahta. ❤️

Love you babu 💓  
Love you sona 🫶  
Love you meri princess 👸  
Love you meri jaan 🧡  
Aur haan… meri cute si kutiya 🐶😂❤️

Tum meri patakha ho 💣😂,  
meri happiness ho,  
meri pagalpan ho,  
aur meri favourite person ho. ❤️

Aur haan madam… 😌  
Birthday party pending hai. 🥳
Main bhoola nahi hoon. 😂  
Aakar party chahiye mereko! 😤🎂

Miss you so much jaan 😢❤️  
Kaash aaj tumhare paas hota… tumhe hug karta 🤗, tumhe birthday wish karta aur bas tumhari smile dekhta rehta. 🥺❤️

Filhaal distance hai… par dil se toh tum mere paas hi ho. 🫶

Aao… intezaar rahega tumhara. ❤️

Once again…

HAPPY HAPPY BIRTHDAY MERI JAAAAAAAN 🎂🥳🎉❤️

Khush raho, muskurati raho, successful bano…  
aur meri bani raho. ❤️😘

Love you infinity, babu. ❤️🫠😘`;
// =====================================================

document.querySelectorAll(".editable").forEach((el) => {
  if (el.dataset.placeholder === "her name") el.textContent = HER_NAME;
  if (el.dataset.placeholder === "your name") el.textContent = YOUR_NAME;
});

function createPetal() {
  const p = document.createElement("span");
  p.className = "petal";
  p.style.left = `${Math.random() * 100}vw`;
  p.style.setProperty("--drift", `${Math.random() * 260 - 130}px`);
  p.style.setProperty("--sway", `${Math.random() * 110 - 55}px`);
  p.style.animationDuration = `${7 + Math.random() * 8}s`;
  p.style.animationDelay = `${Math.random() * 1.5}s`;
  p.style.width = `${9 + Math.random() * 9}px`;
  p.style.height = `${13 + Math.random() * 11}px`;
  petalLayer.appendChild(p);
  setTimeout(() => p.remove(), 17000);
}

function startPetals() {
  for (let i = 0; i < 16; i++) setTimeout(createPetal, i * 130);
  petalTimer = setInterval(createPetal, 700);
}

function createTulipField() {
  const field = document.getElementById("tulipField");
  const count = Math.min(30, Math.floor(window.innerWidth / 38));
  field.innerHTML = "";

  for (let i = 0; i < count; i++) {
    const t = document.createElement("span");
    t.className = "field-tulip";
    t.style.left = `${(i / Math.max(count - 1, 1)) * 100 + (Math.random() * 3 - 1.5)}%`;
    t.style.height = `${95 + Math.random() * 65}px`;
    t.style.setProperty("--speed", `${2.8 + Math.random() * 2.4}s`);
    t.style.opacity = `${0.35 + Math.random() * 0.5}`;
    t.innerHTML = `
      <span class="field-stem"></span>
      <span class="field-leaf"></span>
      <span class="field-head"></span>
    `;
    field.appendChild(t);
  }

  document.querySelectorAll(".field-tulip").forEach((t) => {
    t.querySelector(".field-stem").style.cssText =
      "position:absolute;bottom:0;left:50%;width:3px;height:75%;background:linear-gradient(#71906b,#2f4e35);border-radius:99px;transform:translateX(-50%);";
    t.querySelector(".field-leaf").style.cssText =
      "position:absolute;bottom:18%;left:3%;width:32px;height:12px;background:#557b52;border-radius:100% 0 100% 0;transform:rotate(-24deg);";
    t.querySelector(".field-head").style.cssText =
      "position:absolute;top:0;left:50%;width:32px;height:34px;transform:translateX(-50%);background:linear-gradient(135deg,#ffd0d8,#df5271 65%,#9c2947);border-radius:55% 55% 45% 45%/70% 70% 35% 35%;box-shadow:inset 4px 3px 6px rgba(255,255,255,.18);";
  });
}

function typeLetter() {
  const el = document.getElementById("letterText");
  if (el.dataset.done === "true") return;
  el.textContent = "";
  let i = 0;
  const tick = () => {
    if (i < LETTER.length) {
      el.textContent += LETTER[i++];
      setTimeout(tick, 15);
    } else {
      el.dataset.done = "true";
    }
  };
  tick();
}

function showScreen(id) {
  const current = document.querySelector(".screen.active");
  const next = document.getElementById(id);
  if (!next || next === current) return;

  if (window.gsap) {
    gsap.to(current, {
      opacity: 0,
      y: -25,
      duration: 0.45,
      ease: "power2.in",
      onComplete: () => activateScreen(next, id),
    });
  } else {
    activateScreen(next, id);
  }
}

function activateScreen(next, id) {
  const current = document.querySelector(".screen.active");
  if (current) {
    current.classList.remove("active");
    current.style.opacity = "";
    current.style.transform = "";
  }
  next.classList.add("active");
  window.scrollTo({ top: 0, behavior: "instant" });

  if (window.gsap) {
    gsap.fromTo(
      next,
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: "power3.out",
        onComplete: () =>
          next.querySelector(".section-content")?.classList.add("revealed"),
      },
    );
  }

  if (id === "letter") typeLetter();
  if (id === "finale") finalBloom();
}

document.querySelectorAll("[data-next]").forEach((btn) => {
  btn.addEventListener("click", () => showScreen(btn.dataset.next));
});

document.querySelectorAll(".flower-card").forEach((card) => {
  card.addEventListener("click", () => {
    const msg = card.dataset.message;
    flowerMessage.textContent = msg;
    flowerContinue.classList.remove("hidden");

    const type = card.dataset.flower;
    modalFlower.innerHTML = "";
    const flower = document.createElement("span");
    if (type === "tulip") {
      flower.className = "real-flower tulip-art";
      flower.innerHTML = "<i></i><i></i><i></i><i></i>";
    } else {
      flower.className = "real-flower rose-svg rose-red";
      flower.innerHTML = `<svg viewBox="0 0 180 220" aria-hidden="true">
        <defs><radialGradient id="modalRose" cx="38%" cy="25%" r="78%"><stop offset="0" stop-color="#ffd7dc"/><stop offset=".35" stop-color="#ef7188"/><stop offset=".72" stop-color="#bd294d"/><stop offset="1" stop-color="#76142f"/></radialGradient></defs>
        <path d="M91 112 C91 142 91 173 89 205" stroke="#527650" stroke-width="6" stroke-linecap="round" fill="none"/>
        <path d="M88 160 C63 144 45 148 30 164 C55 174 73 174 88 165Z" fill="#557d50"/>
        <path d="M92 176 C111 154 133 153 151 160 C137 179 114 184 92 181Z" fill="#638c59"/>
        <g fill="url(#modalRose)" stroke="#a82345" stroke-opacity=".28" stroke-width="1.5">
          <path d="M91 116 C50 122 25 102 30 73 C35 44 64 32 87 51 C57 46 48 67 60 81 C68 91 80 95 92 98Z"/>
          <path d="M91 114 C54 101 44 70 63 49 C81 29 111 34 121 60 C99 46 83 55 81 70 C78 84 85 96 97 103Z"/>
          <path d="M93 114 C90 79 108 50 135 52 C163 55 173 85 154 104 C151 79 133 70 119 80 C107 89 107 101 112 112Z"/>
          <path d="M92 113 C120 90 150 96 159 120 C168 143 143 158 119 148 C138 138 137 122 124 115 C112 110 102 115 95 124Z"/>
          <path d="M91 113 C72 144 42 148 29 126 C15 104 34 84 60 89 C42 101 49 117 64 121 C77 125 85 119 91 108Z"/>
          <path d="M91 112 C79 97 81 77 98 68 C117 58 137 71 136 92 C121 77 105 83 102 96 C99 106 105 114 113 120Z"/>
          <path d="M91 112 C101 101 116 103 122 114 C128 126 119 137 106 135 C114 126 109 118 101 118 C96 118 92 121 88 125Z" fill="#a81f43"/>
        </g></svg>`;
    }
    modalFlower.appendChild(flower);

    modalMessage.textContent = msg;
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    burst(card);
  });
});

document.querySelectorAll(".memory-card").forEach((card) => {
  card.addEventListener("click", () => {
    memoryMessage.textContent = card.dataset.memory;
    burst(card);
  });
});

document.getElementById("modalClose").addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
function closeModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}

function burst(el) {
  const r = el.getBoundingClientRect();
  for (let i = 0; i < 10; i++) {
    const s = document.createElement("span");
    s.textContent = Math.random() > 0.5 ? "♥" : "✦";
    s.style.position = "fixed";
    s.style.left = `${r.left + r.width / 2}px`;
    s.style.top = `${r.top + r.height / 2}px`;
    s.style.zIndex = 110;
    s.style.color = Math.random() > 0.5 ? "#ff91a9" : "#e6c08e";
    s.style.pointerEvents = "none";
    document.body.appendChild(s);

    if (window.gsap) {
      gsap.to(s, {
        x: (Math.random() - 0.5) * 180,
        y: (Math.random() - 0.65) * 170,
        opacity: 0,
        scale: 0.3,
        rotation: Math.random() * 180,
        duration: 0.8 + Math.random() * 0.5,
        ease: "power2.out",
        onComplete: () => s.remove(),
      });
    } else {
      s.remove();
    }
  }
}

// ================= MUSIC =================

const musicBtn = document.getElementById("musicBtn");

async function playMusic() {
  if (!bgMusic) return;

  try {
    bgMusic.volume = 1;
    bgMusic.muted = false;

    await bgMusic.play();

    musicPlaying = true;

    musicBtn.textContent = "Ⅱ";
    musicBtn.setAttribute("aria-label", "Mute music");

    console.log("Music started automatically ❤️");

  } catch (error) {

    musicPlaying = false;

    musicBtn.textContent = "♫";
    musicBtn.setAttribute("aria-label", "Play music");

    console.log(
      "Browser blocked autoplay. Music will start after user interaction."
    );
  }
}


function muteMusic() {

  if (!bgMusic) return;

  bgMusic.pause();

  musicPlaying = false;

  musicBtn.textContent = "♫";
  musicBtn.setAttribute("aria-label", "Play music");
}


async function toggleMusic() {

  if (musicPlaying) {

    // MUTE
    muteMusic();

  } else {

    // PLAY
    await playMusic();

  }
}


// Music button
musicBtn.addEventListener("click", toggleMusic);

window.addEventListener("load", () => {

  // Give browser a moment to load the audio
  setTimeout(() => {
    playMusic();
  }, 300);

});

let musicUnlocked = false;

async function unlockMusic() {

  if (musicUnlocked || musicPlaying) return;

  musicUnlocked = true;

  await playMusic();

}


// First click anywhere
document.addEventListener(
  "click",
  unlockMusic,
  { once: true }
);


// First touch anywhere
document.addEventListener(
  "touchstart",
  unlockMusic,
  { once: true }
);


// First keyboard interaction
document.addEventListener(
  "keydown",
  unlockMusic,
  { once: true }
);

function finalBloom() {
  for (let i = 0; i < 35; i++) setTimeout(createPetal, i * 70);

  const finalRose = document.querySelector(".final-rose");
  if (window.gsap) {
    gsap.fromTo(
      finalRose,
      { scale: 0.65, opacity: 0, rotate: -10 },
      {
        scale: 1,
        opacity: 1,
        rotate: 0,
        duration: 1.2,
        ease: "elastic.out(1,.5)",
      },
    );
    gsap.fromTo(
      document.querySelector("#finale h2"),
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.35, ease: "power3.out" },
    );
  }
}

document.getElementById("replayBtn").addEventListener("click", () => {
  document.getElementById("letterText").dataset.done = "false";
  document.getElementById("letterText").textContent = "";
  flowerMessage.textContent = "";
  memoryMessage.textContent = "";
  flowerContinue.classList.add("hidden");
  showScreen("hero");
});

window.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;
  document.querySelectorAll(".hero-content .parallax").forEach((el) => {
    el.style.transform = `translate(${x * 5}px, ${y * 4}px)`;
  });
});

window.addEventListener("resize", createTulipField);

document.fonts.ready.then(() => {
  setTimeout(() => loader.classList.add("hide"), 900);
});

createTulipField();
startPetals();
