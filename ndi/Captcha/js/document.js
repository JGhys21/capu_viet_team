const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 400;

// Game settings
const player = {
  x: canvas.width / 2 - 25,
  y: canvas.height - 50,
  width: 50,
  height: 20,
  color: "lime",
  speed: 5,
  bullets: [],
};

const enemies = [];
const targets = ["green"]; // Images to target
const images = {
  green: "img_captcha/Green.png",
  red: "img_captcha/Red.png",
};

let gameMessage = document.getElementById("gameMessage");
let gameOver = false;

// Create enemies
for (let i = 0; i < 8; i++) {
  enemies.push({
    x: 70 * i + 10,
    y: 50,
    width: 40,
    height: 40,
    type: Math.random() > 0.5 ? "green" : "red", // Randomly assign types
    hit: false,
  });
}

// Draw player
function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Draw bullets
function drawBullets() {
  player.bullets.forEach((bullet, index) => {
    ctx.fillStyle = "red";
    ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    bullet.y -= 7;

    // Remove bullet if out of bounds
    if (bullet.y < 0) {
      player.bullets.splice(index, 1);
    }
  });
}

// Draw enemies
function drawEnemies() {
  enemies.forEach((enemy) => {
    if (!enemy.hit) {
      const img = new Image();
      img.src = images[enemy.type];
      ctx.drawImage(img, enemy.x, enemy.y, enemy.width, enemy.height);
    }
  });
}

// Collision detection
function detectCollisions() {
  player.bullets.forEach((bullet, bulletIndex) => {
    enemies.forEach((enemy) => {
      if (
        !enemy.hit &&
        bullet.x < enemy.x + enemy.width &&
        bullet.x + bullet.width > enemy.x &&
        bullet.y < enemy.y + enemy.height &&
        bullet.y + bullet.height > enemy.y
      ) {
        if (targets.includes(enemy.type)) {
          enemy.hit = true;
          player.bullets.splice(bulletIndex, 1);
        }
      }
    });
  });
}

// Check if all targets are hit
function checkWin() {
  if (enemies.every((enemy) => !targets.includes(enemy.type) || enemy.hit)) {
    gameMessage.textContent = "CAPTCHA validé avec succès !";
    gameOver = true;
    
    // Redirection après 2 secondes
    setTimeout(() => {
      window.location.href = ""; 
    }, 2000);
  }
}

// Game loop
function gameLoop() {
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPlayer();
  drawBullets();
  drawEnemies();
  detectCollisions();
  checkWin();

  requestAnimationFrame(gameLoop);
}

// Controls
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && player.x > 0) {
    player.x -= player.speed;
  } else if (e.key === "ArrowRight" && player.x < canvas.width - player.width) {
    player.x += player.speed;
  } else if (e.key === " ") {
    // Shoot bullet
    player.bullets.push({
      x: player.x + player.width / 2 - 2.5,
      y: player.y,
      width: 5,
      height: 10,
    });
  }
});

// Start game
gameLoop();
