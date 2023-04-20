// Set up the canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// Set up the stars
const numStars = 1000;
const stars = [];
for (let i = 0; i < numStars; i++) {
  stars.push({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() < 0.9 ? 1 : 1 + Math.random() * 1,
    speed: Math.random() + 0.2,
    blink: Math.random() * 10,
    twinkle: Math.random() < 0.5
  });
}

// Set up the background
const bgColor = '#000308';
const glowColor = 'rgba(173, 216, 230, 0.5)';
ctx.fillStyle = bgColor;
ctx.fillRect(0, 0, width, height);

// Draw the stars
function drawStars() {
  for (let i = 0; i < numStars; i++) {
    const star = stars[i];
    if (star.blink < 0) {
      star.twinkle = Math.random() < 0.5;
      star.blink = Math.random() * 5;
    }
    star.blink--;
    if (star.twinkle) {
      ctx.fillStyle = glowColor;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size * 1.2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = '#ADD8E6';
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Update the stars' positions and draw them
function update() {
  for (let i = 0; i < numStars; i++) {
    const star = stars[i];
    star.x += star.speed;
    if (star.x > width) {
      star.x = 0;
      star.y = Math.random() * height;
      star.speed = Math.random() + 1;
    }
  }
  drawStars();
}

// Run the animation
function loop() {
  requestAnimationFrame(loop);
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);
  update();
}

loop();