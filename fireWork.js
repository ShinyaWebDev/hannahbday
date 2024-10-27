// Canvas and Firework Animation Variables
const canvas = document.getElementById("canvas");
const context = canvas ? canvas.getContext("2d") : null;

let width = window.innerWidth;
let height = window.innerHeight;
let clicked = false;
let mouseX = 0,
  mouseY = 0;
let particles = [];
let particleSettings = { gravity: 0.05 };

// Check if canvas exists before initializing
if (canvas && context) {
  canvas.width = width;
  canvas.height = height;

  // Event listeners for fireworks on canvas
  const isTouchDevice = () => {
    try {
      document.createEvent("TouchEvent");
      return true;
    } catch (e) {
      return false;
    }
  };
  const events = isTouchDevice()
    ? { down: "touchstart", up: "touchend" }
    : { down: "mousedown", up: "mouseup" };

  canvas.addEventListener(events.down, (e) => {
    e.preventDefault();
    clicked = true;
    mouseX = isTouchDevice() ? e.touches[0].pageX : e.pageX;
    mouseY = isTouchDevice() ? e.touches[0].pageY : e.pageY;
    createFirework();
  });

  canvas.addEventListener(events.up, (e) => {
    e.preventDefault();
    clicked = false;
  });
}

// Random number generator
function randomNumberGenerator(min, max) {
  return Math.random() * (max - min) + min;
}

// Particle class for fireworks
function Particle() {
  this.width = randomNumberGenerator(0.1, 0.9) * 5;
  this.height = randomNumberGenerator(0.1, 0.9) * 5;
  this.x = mouseX - this.width / 2;
  this.y = mouseY - this.height / 2;
  this.vx = (Math.random() - 0.5) * 10;
  this.vy = (Math.random() - 0.5) * 10;
  this.color = `rgb(${randomNumberGenerator(0, 255)},${randomNumberGenerator(
    0,
    255
  )},${randomNumberGenerator(0, 255)})`;
}

Particle.prototype = {
  move: function () {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += particleSettings.gravity;
    if (this.x < 0 || this.x > canvas.width || this.y > canvas.height) {
      return false;
    }
    return true;
  },
  draw: function () {
    context.save();
    context.beginPath();
    context.translate(this.x, this.y);
    context.arc(0, 0, this.width, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.closePath();
    context.fill();
    context.restore();
  },
};

// Create fireworks particles
function createFirework() {
  let numberOfParticles = randomNumberGenerator(30, 200);
  for (let i = 0; i < numberOfParticles; i++) {
    let particle = new Particle();
    let vy = Math.sqrt(25 - particle.vx * particle.vx);
    particle.vy =
      Math.abs(particle.vy) > vy ? (particle.vy > 0 ? vy : -vy) : particle.vy;
    particles.push(particle);
  }
}

// Start fireworks animation
let animationFrameId; // Track the animation frame

// Start the fireworks animation
function startFireWork() {
  if (!canvas || !context) return;

  context.fillStyle = "rgba(0,0,0,0.1)";
  context.fillRect(0, 0, width, height);
  if (clicked) createFirework();

  particles = particles.filter((particle) => {
    particle.draw();
    return particle.move();
  });

  // Request the next frame and store its ID
  animationFrameId = window.requestAnimationFrame(startFireWork);
}

// Function to reset and stop the fireworks animation
function resetParticles() {
  particles = [];
  if (animationFrameId) {
    window.cancelAnimationFrame(animationFrameId); // Cancel ongoing animation frame
    animationFrameId = null; // Reset the ID to avoid re-cancelling
  }
}

// Load firework sounds
const sounds = [
  new Audio("sound/firework1.mp3"),
  new Audio("sound/firework2.mp3"),
];

// Function to play a random firework sound
function playFireworkSound() {
  const sound = sounds[Math.floor(Math.random() * sounds.length)];
  sound.currentTime = 0; // Reset to start in case it's still playing
  sound.play();
}

// Modified createFirework to include sound
function createFirework() {
  playFireworkSound(); // Play sound for each firework

  let numberOfParticles = randomNumberGenerator(30, 200);
  for (let i = 0; i < numberOfParticles; i++) {
    let particle = new Particle();
    let vy = Math.sqrt(25 - particle.vx * particle.vx);
    particle.vy =
      Math.abs(particle.vy) > vy ? (particle.vy > 0 ? vy : -vy) : particle.vy;
    particles.push(particle);
  }
}
