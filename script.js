/* ============================================================
   CONFIGURATION EMAILJS
   ============================================================ */
const EMAILJS_PUBLIC_KEY = "hT9KB3hjI2a4XS4U";
const EMAILJS_SERVICE_ID = "service_1xzgh5v";
const EMAILJS_TEMPLATE_ID = "template_4bhs946";

emailjs.init({
  publicKey: EMAILJS_PUBLIC_KEY
});

/* ============================================================
   COEURS FLOTTANTS EN ARRIÈRE-PLAN
   ============================================================ */
function createFloatingHearts() {
  const bg = document.getElementById("heartsBg");
  const heartEmojis = ["💗", "💕", "💖", "❤️", "💓", "💞"];
  const count = 18;

  for (let i = 0; i < count; i++) {
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (14 + Math.random() * 18) + "px";
    heart.style.animationDuration = (8 + Math.random() * 10) + "s";
    heart.style.animationDelay = (Math.random() * 10) + "s";
    bg.appendChild(heart);
  }
}
createFloatingHearts();

/* ============================================================
   NAVIGATION ENTRE LES PAGES
   ============================================================ */
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(pageId).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ============================================================
   BOUTON NON : il fuit le curseur / le doigt
   ============================================================ */
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const buttonsZone = document.getElementById("buttonsZone");
const teaseMsg = document.getElementById("teaseMsg");

const teaseMessages = [
  "Tu es sûre ? 🥺",
  "Le NON est un peu timide… 😈",
  "Essaie encore 😂",
  "Il ne veut vraiment pas être cliqué 🙈",
  "Il semblerait que le OUI soit la bonne réponse ❤️"
];
let teaseIndex = 0;
let noAttempts = 0;

function showTeaseMessage() {
  teaseMsg.textContent = teaseMessages[teaseIndex % teaseMessages.length];
  teaseMsg.classList.add("show");
  teaseIndex++;
}

function moveNoButton() {
  noAttempts++;
  showTeaseMessage();

  // Passe le bouton en position fixed pour pouvoir le placer n'importe où à l'écran
  if (!noBtn.classList.contains("roaming")) {
    const rect = noBtn.getBoundingClientRect();
    noBtn.style.top = rect.top + "px";
    noBtn.style.left = rect.left + "px";
    noBtn.classList.add("roaming");
  }

  const btnWidth = noBtn.offsetWidth;
  const btnHeight = noBtn.offsetHeight;
  const margin = 16;

  const maxX = window.innerWidth - btnWidth - margin;
  const maxY = window.innerHeight - btnHeight - margin;

  // Zone à éviter : autour du bouton OUI, pour qu'il reste toujours facilement cliquable
  const yesRect = yesBtn.getBoundingClientRect();
  const safeZonePadding = 60;

  let newX, newY, tries = 0;
  do {
    newX = margin + Math.random() * (maxX - margin);
    newY = margin + Math.random() * (maxY - margin);
    tries++;
  } while (
    tries < 15 &&
    newX < yesRect.right + safeZonePadding &&
    newX + btnWidth > yesRect.left - safeZonePadding &&
    newY < yesRect.bottom + safeZonePadding &&
    newY + btnHeight > yesRect.top - safeZonePadding
  );

  noBtn.style.top = newY + "px";
  noBtn.style.left = newX + "px";
}

// Souris : le bouton fuit dès qu'on s'en approche (hover)
noBtn.addEventListener("mouseenter", moveNoButton);

// Tactile : le bouton fuit dès qu'on essaie de le toucher
noBtn.addEventListener("touchstart", function (e) {
  e.preventDefault();
  moveNoButton();
}, { passive: false });

// Sécurité supplémentaire : si jamais un clic aboutit, on le fait fuir quand même
noBtn.addEventListener("click", function (e) {
  e.preventDefault();
  moveNoButton();
});

// Recalcule une position sûre si la fenêtre est redimensionnée (ex: rotation du téléphone)
window.addEventListener("resize", function () {
  if (noBtn.classList.contains("roaming")) {
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;
    const maxX = window.innerWidth - btnWidth - 16;
    const maxY = window.innerHeight - btnHeight - 16;
    noBtn.style.left = Math.min(parseFloat(noBtn.style.left), maxX) + "px";
    noBtn.style.top = Math.min(parseFloat(noBtn.style.top), maxY) + "px";
  }
});

/* ============================================================
   BOUTON OUI
   ============================================================ */
yesBtn.addEventListener("click", function () {
  yesBtn.classList.add("clicked");
  setTimeout(() => {
    showPage("page2");
    // On réinitialise le champ date pour empêcher les dates passées
    setMinDate();
  }, 350);
});

/* ============================================================
   FORMULAIRE : DATE / HEURE / MESSAGE
   ============================================================ */
const dateForm = document.getElementById("dateForm");
const dateInput = document.getElementById("dateInput");
const timeInput = document.getElementById("timeInput");
const messageInput = document.getElementById("messageInput");
const charCount = document.getElementById("charCount");
const formError = document.getElementById("formError");
const confirmBtn = document.getElementById("confirmBtn");
const loadingOverlay = document.getElementById("loadingOverlay");

function setMinDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  dateInput.min = `${yyyy}-${mm}-${dd}`;
}
setMinDate();

messageInput.addEventListener("input", function () {
  charCount.textContent = messageInput.value.length;
});

dateForm.addEventListener("submit", function (e) {
  e.preventDefault();
  formError.textContent = "";

  const selectedDate = dateInput.value;
  const selectedTime = timeInput.value;
  const selectedMessage = messageInput.value.trim();

  if (!selectedDate) {
    formError.textContent = "Merci de choisir une date 📅";
    return;
  }

  if (!selectedTime) {
    formError.textContent = "Merci de choisir une heure ⏰";
    return;
  }

  // Vérifie que la date n'est pas dans le passé
  const todayStr = dateInput.min;
  if (selectedDate < todayStr) {
    formError.textContent = "La date choisie ne peut pas être dans le passé 😅";
    return;
  }

  sendEmail(selectedDate, selectedTime, selectedMessage);
});

function formatDateFR(dateStr) {
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
}

function formatTimeFR(timeStr) {
  return timeStr;
}

function sendEmail(selectedDate, selectedTime, selectedMessage) {
  confirmBtn.disabled = true;
  loadingOverlay.classList.add("show");

  const templateParams = {
    date: formatDateFR(selectedDate),
    time: formatTimeFR(selectedTime),
    message: selectedMessage || "(aucun message)"
  };

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
    .then(function () {
      loadingOverlay.classList.remove("show");
      confirmBtn.disabled = false;

      document.getElementById("sumDate").textContent = templateParams.date;
      document.getElementById("sumTime").textContent = templateParams.time;
      document.getElementById("sumMessage").textContent = templateParams.message;

      showPage("page3");
    })
    .catch(function (error) {
      console.error("Erreur EmailJS :", error);
      loadingOverlay.classList.remove("show");
      confirmBtn.disabled = false;

      // Message d'erreur détaillé pour faciliter le débogage
      let details = "";
      if (error && error.status) {
        details = ` (code ${error.status})`;
      }
      if (error && error.text) {
        console.error("Détail EmailJS :", error.text);
      }

      formError.textContent = "L'envoi a échoué 😭 Vérifie ta connexion et réessaie." + details;
    });
}
