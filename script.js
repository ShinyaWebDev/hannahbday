// Initial References and variable declarations
const card = document.querySelector(".card");
const heartsContainer = document.querySelector(".hearts-container");
const touchMessage = document.querySelector(".touch-message");
const fireworkBtn = document.querySelector(".firework-btn");
const fireworksOverlay = document.querySelector(".fireworks-overlay");
const goBackBtn = document.querySelector(".go-back-btn");

// Example messages to alternate between
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

let lastMessageIndex = 0; // Track last shown message index

// Add a click event to open the card only when it is closed
if (card) {
  card.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent the click from propagating to the document

    // Check if the card is not already flipped
    if (!card.classList.contains("flipped")) {
      card.classList.add("flipped"); // Only add flipped class if it's not already flipped

      // Show hearts and update message when card is flipped open
      if (heartsContainer) heartsContainer.style.display = "block";
      startFallingHearts();
      showRandomMessage(); // Show alternating messages
    }
  });
}

// Detect click outside the card to close it
document.addEventListener("click", (e) => {
  if (card.classList.contains("flipped") && !card.contains(e.target)) {
    card.classList.remove("flipped"); // Close the card by removing the flipped class
    resetHearts();
  }
});

// Function to reset hearts when closing the card
function resetHearts() {
  if (heartsContainer) {
    heartsContainer.style.display = "none";
    heartsContainer.innerHTML = ""; // Clear hearts to reset
  }
}

// Function to show a random message each time the card is opened
function showRandomMessage() {
  // Choose a new message index, different from the last shown message
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * messages.length);
  } while (newIndex === lastMessageIndex);

  // Update the message and save the new index
  changeMessage(messages[newIndex]);
  lastMessageIndex = newIndex;
}

// Falling hearts animation
function startFallingHearts() {
  const heartsInterval = setInterval(() => {
    const heart = document.createElement("div");
    heart.classList.add("heart");

    // Set random position and size for each heart
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${Math.random() * 2 + 3}s`;
    const randomSize = Math.random() * 20 + 10; // Size range between 10px and 30px
    heart.style.width = `${randomSize}px`;
    heart.style.height = `${randomSize}px`;

    if (heartsContainer) heartsContainer.appendChild(heart);

    // Remove heart after animation ends
    setTimeout(() => heart.remove(), 4000);
  }, 300);

  // Stop hearts animation on card close
  document.addEventListener("click", () => clearInterval(heartsInterval), {
    once: true,
  });
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
    if (typeof resetParticles === "function") resetParticles(); // Clear particles
  });
}
