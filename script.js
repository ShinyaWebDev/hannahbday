// References and variable declarations
const card = document.querySelector(".card");
const heartsContainer = document.querySelector(".hearts-container");
const touchMessage = document.querySelector(".touch-message");
const fireworkBtn = document.querySelector(".firework-btn");
const fireworksOverlay = document.querySelector(".fireworks-overlay");
const goBackBtn = document.querySelector(".go-back-btn");
const animatedElements = document.querySelectorAll(".color1, .contact-link");

const messages = [
  "Thank you 🥰",
  "So glad you’re here! 🎉",
  "Party time! 🎈",
  "Let’s have fun! 🎂",
  "You're awesome! 🌟",
  "Hooray! 🎊",
  "Smiles all around 😄",
  "Best day ever! ✨",
  "Let's celebrate 🎶",
  "Much love! 💖",
];

let lastMessageIndex = -1;

// Open card only if it is not already opened
if (card) {
  card.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent the click from propagating to the document

    if (!card.classList.contains("flipped")) {
      card.classList.add("flipped"); // Only add flipped class if it's not already flipped

      // Show hearts and update message when card is flipped open
      if (heartsContainer) heartsContainer.style.display = "block";
      startFallingHearts();
      showRandomMessage(); // Show alternating messages

      // Trigger animation for animated elements
      animatedElements.forEach((element) => {
        element.classList.add("clicked");
        setTimeout(() => element.classList.remove("clicked"), 1600); // Reset after animation duration
      });
    }
  });
}

// Close card on click outside
document.addEventListener("click", (e) => {
  if (card.classList.contains("flipped") && !card.contains(e.target)) {
    card.classList.remove("flipped");
    resetHearts();
  }
});

// Reset hearts when card is closed
function resetHearts() {
  if (heartsContainer) {
    heartsContainer.style.display = "none";
    heartsContainer.innerHTML = "";
  }
}

// Show a random message from the list
function showRandomMessage() {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * messages.length);
  } while (newIndex === lastMessageIndex);

  changeMessage(messages[newIndex]);
  lastMessageIndex = newIndex;
}

// Falling hearts animation using SVG
function startFallingHearts() {
  const heartsInterval = setInterval(() => {
    const heart = createSVGHeart();
    const randomSize = Math.random() * 20 + 10;
    heart.style.width = `${randomSize}px`;
    heart.style.height = `${randomSize}px`;
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${Math.random() * 2 + 3}s`;
    if (heartsContainer) heartsContainer.appendChild(heart);

    // Remove heart after animation ends
    setTimeout(() => heart.remove(), 4000);
  }, 300);

  // Stop hearts animation when closing the card
  document.addEventListener("click", () => clearInterval(heartsInterval), {
    once: true,
  });
}

// Create SVG heart element
function createSVGHeart() {
  const svgNS = "http://www.w3.org/2000/svg";
  const heartSVG = document.createElementNS(svgNS, "svg");
  heartSVG.setAttribute("viewBox", "0 0 24 24");
  heartSVG.setAttribute("class", "heart");

  const path = document.createElementNS(svgNS, "path");
  path.setAttribute(
    "d",
    "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
  );
  path.setAttribute("fill", "rgb(240, 120, 140)");
  heartSVG.appendChild(path);

  return heartSVG;
}

// Update touch message
function changeMessage(newMessage) {
  if (touchMessage) {
    touchMessage.textContent = newMessage;
    touchMessage.classList.add("animated-message");

    // Remove animation class after animation ends
    setTimeout(() => touchMessage.classList.remove("animated-message"), 600);
  }
}

// Fireworks Overlay Show/Hide
if (fireworkBtn) {
  fireworkBtn.addEventListener("click", () => {
    if (fireworksOverlay) fireworksOverlay.style.display = "block";
    startFireWork(); // Trigger startFireWork in fireWork.js
  });
}
if (goBackBtn) {
  goBackBtn.addEventListener("click", () => {
    if (fireworksOverlay) fireworksOverlay.style.display = "none";
    if (typeof resetParticles === "function") resetParticles();
  });
}
