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
   COEURS
   ============================================================ */
function createFloatingHearts() {
  const bg = document.getElementById("heartsBg");
  const heartEmojis = ["💗", "💕", "💖", "❤️", "💓", "💞"];

  for (let i = 0; i < 18; i++) {
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = 14 + Math.random() * 18 + "px";
    heart.style.animationDuration = 8 + Math.random() * 10 + "s";
    heart.style.animationDelay = Math.random() * 10 + "s";
    bg.appendChild(heart);
  }
}
createFloatingHearts();

/* ============================================================
   NAVIGATION
   ============================================================ */
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(page => page.classList.remove("active"));
  const page = document.getElementById(pageId);
  if (page) page.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ============================================================
   BOUTON NON
   ============================================================ */
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const teaseMsg = document.getElementById("teaseMsg");

const teaseMessages = [
  "Tu es sûre ? 🥺",
  "Le NON est un peu timide… 😈",
  "Essaie encore 😂",
  "Il ne veut vraiment pas être cliqué 🙈",
  "Il semblerait que le OUI soit la bonne réponse ❤️"
];

let teaseIndex = 0;

function showTeaseMessage() {
  teaseMsg.textContent = teaseMessages[teaseIndex % teaseMessages.length];
  teaseMsg.classList.add("show");
  teaseIndex++;
}

function moveNoButton() {
  showTeaseMessage();

  if (!noBtn.classList.contains("roaming")) {
    const rect = noBtn.getBoundingClientRect();
    noBtn.style.top = rect.top + "px";
    noBtn.style.left = rect.left + "px";
    noBtn.classList.add("roaming");
  }

  const btnWidth = noBtn.offsetWidth;
  const btnHeight = noBtn.offsetHeight;
  const margin = 16;
  const maxX = Math.max(margin, window.innerWidth - btnWidth - margin);
  const maxY = Math.max(margin, window.innerHeight - btnHeight - margin);
  const yesRect = yesBtn.getBoundingClientRect();
  const padding = 70;

  let newX, newY, tries = 0;

  do {
    newX = margin + Math.random() * Math.max(1, maxX - margin);
    newY = margin + Math.random() * Math.max(1, maxY - margin);
    tries++;
  } while (
    tries < 20 &&
    newX < yesRect.right + padding &&
    newX + btnWidth > yesRect.left - padding &&
    newY < yesRect.bottom + padding &&
    newY + btnHeight > yesRect.top - padding
  );

  noBtn.style.left = newX + "px";
  noBtn.style.top = newY + "px";
}

noBtn.addEventListener("mouseenter", moveNoButton);

noBtn.addEventListener("touchstart", function (e) {
  e.preventDefault();
  moveNoButton();
}, { passive: false });

noBtn.addEventListener("click", function (e) {
  e.preventDefault();
  moveNoButton();
});

window.addEventListener("resize", function () {
  if (!noBtn.classList.contains("roaming")) return;

  const maxX = Math.max(16, window.innerWidth - noBtn.offsetWidth - 16);
  const maxY = Math.max(16, window.innerHeight - noBtn.offsetHeight - 16);

  const currentLeft = parseFloat(noBtn.style.left) || 16;
  const currentTop = parseFloat(noBtn.style.top) || 16;

  noBtn.style.left = Math.min(currentLeft, maxX) + "px";
  noBtn.style.top = Math.min(currentTop, maxY) + "px";
});

/* ============================================================
   OUI
   ============================================================ */
yesBtn.addEventListener("click", function () {
  yesBtn.classList.add("clicked");

  setTimeout(function () {
    showPage("page2");
    setMinDate();
  }, 350);
});

/* ============================================================
   FORMULAIRE
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
  dateInput.min = yyyy + "-" + mm + "-" + dd;
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

  if (selectedDate < dateInput.min) {
    formError.textContent = "La date choisie ne peut pas être dans le passé 😅";
    return;
  }

  sendEmail(selectedDate, selectedTime, selectedMessage);
});

/* ============================================================
   FORMATAGE
   ============================================================ */
function formatDateFR(dateStr) {
  const [year, month, day] = dateStr.split("-");
  return day + "/" + month + "/" + year;
}

function sendEmail(selectedDate, selectedTime, selectedMessage) {
  confirmBtn.disabled = true;
  loadingOverlay.classList.add("show");

  const templateParams = {
    date: formatDateFR(selectedDate),
    time: selectedTime,
    message: selectedMessage || "(aucun message)"
  };

  console.log("EmailJS:", {
    service: EMAILJS_SERVICE_ID,
    template: EMAILJS_TEMPLATE_ID,
    params: templateParams
  });

  emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    templateParams
  )
  .then(function (response) {
    console.log("EmailJS OK:", response);

    loadingOverlay.classList.remove("show");
    confirmBtn.disabled = false;

    document.getElementById("sumDate").textContent = templateParams.date;
    document.getElementById("sumTime").textContent = templateParams.time;
    document.getElementById("sumMessage").textContent = templateParams.message;

    showPage("page3");
  })
  .catch(function (error) {
    console.error("EMAILJS ERROR:", error);

    loadingOverlay.classList.remove("show");
    confirmBtn.disabled = false;

    const status = error && error.status ? error.status : "inconnu";
    const text = error && error.text ? error.text : "Aucun détail fourni.";

    formError.textContent =
      "Erreur EmailJS : " + status + " — " + text;

    alert(
      "EMAILJS

" +
      "Code : " + status + "

" +
      "Message : " + text
    );
  });
}
