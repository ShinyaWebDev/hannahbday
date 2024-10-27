// Initial References and variable declarations
const card = document.querySelector(".card");
const heartsContainer = document.querySelector(".hearts-container");
const touchMessage = document.querySelector(".touch-message");
const fireworkBtn = document.querySelector(".firework-btn");
const fireworksOverlay = document.querySelector(".fireworks-overlay");
const goBackBtn = document.querySelector(".go-back-btn");

// Heart Animation for Card
if (card) {
  card.addEventListener("mouseenter", () => {
    if (heartsContainer) heartsContainer.style.display = "block";
    startFallingHearts();
    changeMessage("Thank you 🥰");
  });
  card.addEventListener("mouseleave", () => {
    if (heartsContainer) {
      heartsContainer.style.display = "none";
      heartsContainer.innerHTML = ""; // Clear hearts to reset
    }
  });
}

function startFallingHearts() {
  const heartsInterval = setInterval(() => {
    const heart = document.createElement("div");
    heart.classList.add("heart");

    // Set random position and size
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${Math.random() * 2 + 3}s`;

    // Set random size for the heart
    const randomSize = Math.random() * 20 + 10; // Size range between 10px and 30px
    heart.style.width = `${randomSize}px`;
    heart.style.height = `${randomSize}px`;

    if (heartsContainer) heartsContainer.appendChild(heart);

    // Remove each heart after animation ends
    setTimeout(() => heart.remove(), 4000); // Matches animation duration
  }, 300);

  card.addEventListener("mouseleave", () => clearInterval(heartsInterval));
}

function changeMessage(newMessage) {
  if (touchMessage) {
    touchMessage.textContent = newMessage;
    touchMessage.classList.add("animated-message");

    // Remove animation class after animation ends to allow replay
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
    if (typeof resetParticles === "function") resetParticles(); // Clear particles
  });
}
