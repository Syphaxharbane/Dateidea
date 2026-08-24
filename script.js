const question = document.getElementById("question");
const booking = document.getElementById("booking");
const success = document.getElementById("success");
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const tease = document.getElementById("tease");
const buttonsArea = document.getElementById("buttonsArea");
const form = document.getElementById("dateForm");
const statusEl = document.getElementById("formStatus");
const confirmBtn = document.getElementById("confirmBtn");

const teasingTexts = [
  "Tu es sûre ? 👀",
  "Le bouton NON est timide aujourd'hui 😂",
  "Réfléchis encore... 🥺",
  "Même le bouton ne veut pas partir 😭",
  "Allez... dis OUI ❤️",
  "Je prends ça pour un OUI alors ? 😏",
  "Dernière chance... 😌💕"
];

let teaseIndex = 0;

function moveNoButton() {
  const area = buttonsArea.getBoundingClientRect();
  const btn = noBtn.getBoundingClientRect();

  const padding = 5;
  const maxX = Math.max(padding, area.width - btn.width - padding);
  const maxY = Math.max(padding, area.height - btn.height - padding);

  const x = padding + Math.random() * maxX;
  const y = padding + Math.random() * maxY;

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
  noBtn.style.transform = "none";

  tease.textContent = teasingTexts[teaseIndex % teasingTexts.length];
  teaseIndex++;
}

["mouseenter", "pointerdown", "touchstart", "focus"].forEach(evt => {
  noBtn.addEventListener(evt, e => {
    e.preventDefault();
    moveNoButton();
  }, { passive: false });
});

noBtn.addEventListener("click", e => {
  e.preventDefault();
  moveNoButton();
});

yesBtn.addEventListener("click", () => {
  question.classList.add("hidden");
  booking.classList.remove("hidden");
  booking.scrollIntoView({ behavior: "smooth", block: "center" });
  launchHearts(20);
});

const dateInput = document.getElementById("date");
const today = new Date();
const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  .toISOString().split("T")[0];
dateInput.min = localDate;

function formatDate(dateValue) {
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(`${dateValue}T12:00:00`));
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const date = dateInput.value;
  const time = document.getElementById("time").value;
  const place = document.getElementById("place").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!date || !time || !place) return;

  if (
    !EMAILJS_CONFIG.publicKey ||
    EMAILJS_CONFIG.publicKey === "YOUR_PUBLIC_KEY" ||
    !EMAILJS_CONFIG.serviceId ||
    EMAILJS_CONFIG.serviceId === "YOUR_SERVICE_ID" ||
    !EMAILJS_CONFIG.templateId ||
    EMAILJS_CONFIG.templateId === "YOUR_TEMPLATE_ID"
  ) {
    statusEl.textContent = "⚠️ Configure EmailJS dans config.js avant de tester l'envoi.";
    return;
  }

  confirmBtn.disabled = true;
  confirmBtn.textContent = "ENVOI EN COURS... 💌";
  statusEl.textContent = "";

  const formattedDate = formatDate(date);

  const templateParams = {
    date: formattedDate,
    time,
    place,
    message: message || "Aucun message.",
    submitted_at: new Date().toLocaleString("fr-FR")
  };

  try {
    await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      { publicKey: EMAILJS_CONFIG.publicKey }
    );

    document.getElementById("summary").innerHTML = `
      <strong>📅 ${escapeHtml(formattedDate)}</strong><br>
      <strong>🕐 ${escapeHtml(time)}</strong><br>
      <strong>📍 ${escapeHtml(place)}</strong>
      ${message ? `<br><strong>💌</strong> ${escapeHtml(message)}` : ""}
    `;

    booking.classList.add("hidden");
    success.classList.remove("hidden");
    success.scrollIntoView({ behavior: "smooth", block: "center" });
    launchHearts(45);
  } catch (error) {
    console.error(error);
    statusEl.textContent = "❌ L'e-mail n'a pas pu être envoyé. Vérifie ta configuration EmailJS.";
  } finally {
    confirmBtn.disabled = false;
    confirmBtn.textContent = "CONFIRMER NOTRE DATE ❤️";
  }
});

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;",
    '"': "&quot;", "'": "&#039;"
  }[char]));
}

function launchHearts(count) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.textContent = ["❤️", "💕", "💖", "💗", "💘"][Math.floor(Math.random() * 5)];
      heart.style.left = `${Math.random() * 100}vw`;
      heart.style.animationDuration = `${3 + Math.random() * 4}s`;
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 7500);
    }, i * 70);
  }
}
