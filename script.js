const card = document.querySelector(".card");
const heartsContainer = document.querySelector(".hearts-container");
const touchMessage = document.querySelector(".touch-message");

// Show hearts on hover
card.addEventListener("mouseenter", () => {
  heartsContainer.style.display = "block"; // Show hearts container
  startFallingHearts();
  changeMessage("Thank you 🥰"); // Start the hearts animation
});

// Hide hearts when hover ends
card.addEventListener("mouseleave", () => {
  heartsContainer.style.display = "none"; // Hide hearts container
  heartsContainer.innerHTML = ""; // Clear hearts to reset
});

// Function to create falling hearts
function startFallingHearts() {
  const heartsInterval = setInterval(() => {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${Math.random() * 2 + 3}s`;
    heartsContainer.appendChild(heart);

    // Remove each heart after animation
    setTimeout(() => {
      heart.remove();
    }, 4000); // Matches animation duration
  }, 300);

  // Stop the interval after hover ends
  card.addEventListener("mouseleave", () => clearInterval(heartsInterval));
}

function changeMessage(newMessage) {
  touchMessage.textContent = newMessage;
  touchMessage.classList.add("animated-message");

  // Remove animation class after animation ends to allow replay
  setTimeout(() => {
    touchMessage.classList.remove("animated-message");
  }, 600); // Matches animation duration
}
