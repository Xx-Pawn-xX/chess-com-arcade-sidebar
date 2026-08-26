/* =========================
   TABS
========================= */

let activeGame = "runner";

const tabs = document.querySelectorAll(".tab");
const games = document.querySelectorAll(".game");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const gameName = tab.dataset.game;

    tabs.forEach(t => t.classList.remove("active"));
    games.forEach(g => g.classList.remove("active-game"));

    tab.classList.add("active");
    document.getElementById(gameName).classList.add("active-game");

    activeGame = gameName;
  });
});


/* =========================
   CHESS RUNNER
========================= */

const runnerCanvas = document.getElementById("runnerCanvas");
const rctx = runnerCanvas.getContext("2d");

let knightY = 160;
let velocityY = 0;
let jumping = false;

let spikes = [];
let runnerScore = 0;

let runnerBest =
  Number(localStorage.getItem("runnerBest")) || 0;

document.getElementById("runnerBest").textContent = runnerBest;

function jump() {
  if (activeGame !== "runner") return;

  if (!jumping) {
    velocityY = -13;
    jumping = true;
  }
}

document.getElementById("jumpButton").addEventListener("pointerdown", event => {
  event.preventDefault();
  jump();
});

document.addEventListener("keydown", event => {
  if (
    activeGame === "runner" &&
    (event.code === "Space" || event.code === "ArrowUp")
  ) {
    event.preventDefault();
    jump();
  }
});

function resetRunner() {
  knightY = 160;
  velocityY = 0;
  jumping = false;
  spikes = [];
  runnerScore = 0;

  document.getElementById("runnerScore").textContent = "0";
}

function updateRunner() {
  /* Stops the game from progressing while another tab is open */
  if (activeGame !== "runner") return;

  velocityY += 0.7;
  knightY += velocityY;

  if (knightY >= 160) {
    knightY = 160;
    velocityY = 0;
    jumping = false;
  }

const lastSpike = spikes[spikes.length - 1];

if (
  (!lastSpike || lastSpike.x < 100) &&
  Math.random() < 0.012
) {
  spikes.push({
    x: runnerCanvas.width,
    width: 20 + Math.random() * 12
  });
}

const lastSpike = spikes[spikes.length - 1];

if (
  (!lastSpike || lastSpike.x < 330) &&
  Math.random() < 0.012
) {
  spikes.push({
    x: runnerCanvas.width,
    width: 20 + Math.random() * 12
  });
}

  spikes = spikes.filter(spike => spike.x > -50);

  for (const spike of spikes) {
    const knightLeft = 65;
    const knightRight = 105;
    const knightBottom = knightY + 40;

    if (
      knightRight > spike.x &&
      knightLeft < spike.x + spike.width &&
      knightBottom > 170
    ) {
      gameOverRunner();
      return;
    }
  }

  runnerScore++;

  document.getElementById("runnerScore").textContent =
    Math.floor(runnerScore / 5);
}

function drawRunner() {
  rctx.clearRect(0, 0, runnerCanvas.width, runnerCanvas.height);

  rctx.strokeStyle = "#555";
  rctx.beginPath();
  rctx.moveTo(0, 200);
  rctx.lineTo(runnerCanvas.width, 200);
  rctx.stroke();

  rctx.font = "55px Arial";
  rctx.fillStyle = "white";
  rctx.fillText("♞", 55, knightY + 40);

  rctx.fillStyle = "#ff2020";

  spikes.forEach(spike => {
    rctx.beginPath();
    rctx.moveTo(spike.x, 200);
    rctx.lineTo(spike.x + spike.width / 2, 160);
    rctx.lineTo(spike.x + spike.width, 200);
    rctx.fill();
  });
}

function gameOverRunner() {
  const score = Math.floor(runnerScore / 5);

  if (score > runnerBest) {
    runnerBest = score;
    localStorage.setItem("runnerBest", runnerBest);

    document.getElementById("runnerBest").textContent = runnerBest;
  }

  resetRunner();

  setTimeout(() => {
    alert("GAME OVER!\nScore: " + score);
  }, 50);
}

function runnerLoop() {
  updateRunner();

  if (activeGame === "runner") {
    drawRunner();
  }

  requestAnimationFrame(runnerLoop);
}

runnerLoop();


/* =========================
   COLOR SORT
========================= */

const colors = ["red", "blue", "green", "yellow"];
let selectedBall = null;

function startSortGame() {
  const balls = document.getElementById("balls");

  balls.innerHTML = "";
  selectedBall = null;

  document.getElementById("sortMessage").textContent = "";

  for (let i = 0; i < 8; i++) {
    const color = colors[Math.floor(Math.random() * colors.length)];

    const ball = document.createElement("div");

    ball.className = "ball";
    ball.style.background = color;
    ball.dataset.color = color;

    ball.addEventListener("click", () => {
      document.querySelectorAll(".ball").forEach(b => {
        b.classList.remove("selected");
      });

      selectedBall = ball;
      ball.classList.add("selected");
    });

    balls.appendChild(ball);
  }
}

document.querySelectorAll(".zone").forEach(zone => {
  zone.addEventListener("click", () => {
    if (!selectedBall) {
      document.getElementById("sortMessage").textContent =
        "Pick a ball first!";
      return;
    }

    if (selectedBall.dataset.color === zone.dataset.color) {
      selectedBall.remove();
      selectedBall = null;

      document.getElementById("sortMessage").textContent = "Correct!";

      if (document.querySelectorAll(".ball").length === 0) {
        document.getElementById("sortMessage").textContent =
          "YOU SORTED EVERYTHING!";
      }
    } else {
      document.getElementById("sortMessage").textContent =
        "Wrong color!";
    }
  });
});

document.getElementById("newSortButton").addEventListener("click", startSortGame);

startSortGame();


/* =========================
   LUCKY EMOJIS
========================= */

const emojis = ["♟", "♞", "👑", "🔥", "💎", "⚡", "🚀", "🍕"];
let luckyScore = 0;

document.getElementById("spinButton").addEventListener("click", () => {
  const result = [];

  for (let i = 0; i < 3; i++) {
    result.push(emojis[Math.floor(Math.random() * emojis.length)]);
  }

  document.getElementById("slot1").textContent = result[0];
  document.getElementById("slot2").textContent = result[1];
  document.getElementById("slot3").textContent = result[2];

  let points = 0;
  let message = "No match...";

  if (result[0] === result[1] && result[1] === result[2]) {
    points = 100;
    message = "JACKPOT! +100";
  } else if (
    result[0] === result[1] ||
    result[1] === result[2] ||
    result[0] === result[2]
  ) {
    points = 20;
    message = "PAIR! +20";
  }

  luckyScore += points;

  document.getElementById("luckyScore").textContent = luckyScore;
  document.getElementById("luckyMessage").textContent = message;
});


/* =========================
   SNAKE
========================= */

const snakeCanvas = document.getElementById("snakeCanvas");
const sctx = snakeCanvas.getContext("2d");

let snake = null;
let food = null;
let snakeDX = 20;
let snakeDY = 0;
let snakeInterval = null;

function randomFood() {
  return {
    x: Math.floor(Math.random() * 20) * 20,
    y: Math.floor(Math.random() * 20) * 20
  };
}

function startSnake() {
  clearInterval(snakeInterval);

  snake = [{ x: 200, y: 200 }];
  food = randomFood();

  snakeDX = 20;
  snakeDY = 0;

  document.getElementById("snakeScore").textContent = "0";

  drawSnake();

  snakeInterval = setInterval(updateSnake, 120);
}

function changeSnakeDirection(direction) {
  if (!snake) return;

  if (direction === "up" && snakeDY === 0) {
    snakeDX = 0;
    snakeDY = -20;
  }

  if (direction === "down" && snakeDY === 0) {
    snakeDX = 0;
    snakeDY = 20;
  }

  if (direction === "left" && snakeDX === 0) {
    snakeDX = -20;
    snakeDY = 0;
  }

  if (direction === "right" && snakeDX === 0) {
    snakeDX = 20;
    snakeDY = 0;
  }
}

document.querySelectorAll("[data-snake]").forEach(button => {
  button.addEventListener("click", () => {
    changeSnakeDirection(button.dataset.snake);
  });
});

document.getElementById("snakeStart").addEventListener("click", startSnake);

function updateSnake() {
  /* Pause while not playing Snake */
  if (activeGame !== "snake") return;

  const head = {
    x: snake[0].x + snakeDX,
    y: snake[0].y + snakeDY
  };

  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= 400 ||
    head.y >= 400
  ) {
    clearInterval(snakeInterval);
    alert("GAME OVER!");
    return;
  }

  if (snake.some(part => part.x === head.x && part.y === head.y)) {
    clearInterval(snakeInterval);
    alert("GAME OVER!");
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = randomFood();

    document.getElementById("snakeScore").textContent =
      snake.length - 1;
  } else {
    snake.pop();
  }

  drawSnake();
}

function drawSnake() {
  if (!snake || !food) return;

  sctx.clearRect(0, 0, 400, 400);

  sctx.fillStyle = "#ff2020";

  snake.forEach(part => {
    sctx.fillRect(part.x, part.y, 18, 18);
  });

  sctx.fillStyle = "white";
  sctx.fillRect(food.x, food.y, 18, 18);
}


/* =========================
   REACTION TEST
========================= */

let reactionReady = false;
let reactionStartTime = 0;
let reactionTimer = null;

const reactionBox = document.getElementById("reactionBox");

document.getElementById("reactionStart").addEventListener("click", () => {
  reactionReady = false;

  reactionBox.style.background = "#222";
  reactionBox.textContent = "WAIT...";

  clearTimeout(reactionTimer);

  reactionTimer = setTimeout(() => {
    reactionReady = true;
    reactionStartTime = Date.now();

    reactionBox.style.background = "#ff2020";
    reactionBox.textContent = "CLICK!";
  }, 1000 + Math.random() * 3000);
});

reactionBox.addEventListener("click", () => {
  if (!reactionReady) return;

  const time = Date.now() - reactionStartTime;

  reactionReady = false;

  reactionBox.style.background = "#222";
  reactionBox.textContent = time + " ms";
});


/* =========================
   CPS TEST
========================= */

let cpsRunning = false;
let cpsClicks = 0;
let cpsTime = 5;
let cpsInterval = null;

document.getElementById("cpsButton").addEventListener("click", () => {
  if (!cpsRunning) {
    cpsRunning = true;
    cpsClicks = 1;
    cpsTime = 5;

    document.getElementById("cpsClicks").textContent = cpsClicks;
    document.getElementById("cpsTime").textContent = cpsTime;
    document.getElementById("cpsResult").textContent = "0";

    document.getElementById("cpsButton").textContent = "CLICK FAST!";

    cpsInterval = setInterval(() => {
      cpsTime--;

      document.getElementById("cpsTime").textContent = cpsTime;

      if (cpsTime <= 0) {
        clearInterval(cpsInterval);

        cpsRunning = false;

        document.getElementById("cpsResult").textContent =
          (cpsClicks / 5).toFixed(1);

        document.getElementById("cpsButton").textContent =
          "CLICK TO START";
      }
    }, 1000);
  } else {
    cpsClicks++;

    document.getElementById("cpsClicks").textContent = cpsClicks;
  }
});


/* =========================
   MEMORY
========================= */

const memorySymbols = [
  "♟", "♞", "♜", "♛",
  "🔥", "💎", "⚡", "🚀"
];

let flipped = [];
let memoryLocked = false;

function startMemory() {
  const board = document.getElementById("memoryBoard");

  board.innerHTML = "";

  let cards = [...memorySymbols, ...memorySymbols];

  cards.sort(() => Math.random() - 0.5);

  cards.forEach(symbol => {
    const card = document.createElement("div");

    card.className = "memory-card hidden";
    card.textContent = symbol;
    card.dataset.symbol = symbol;

    card.addEventListener("click", flipCard);

    board.appendChild(card);
  });

  flipped = [];
  memoryLocked = false;
}

function flipCard() {
  if (
    memoryLocked ||
    !this.classList.contains("hidden") ||
    flipped.length === 2
  ) {
    return;
  }

  this.classList.remove("hidden");
  flipped.push(this);

  if (flipped.length === 2) {
    memoryLocked = true;

    setTimeout(() => {
      if (
        flipped[0].dataset.symbol ===
        flipped[1].dataset.symbol
      ) {
        flipped.forEach(card => card.classList.add("matched"));
      } else {
        flipped.forEach(card => card.classList.add("hidden"));
      }

      flipped = [];
      memoryLocked = false;
    }, 700);
  }
}

document.getElementById("memoryStart").addEventListener("click", startMemory);

startMemory();


/* =========================
   TIC TAC TOE
========================= */

let tttPlayer = "X";
let tttGameActive = true;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function resetTTT() {
  const board = document.getElementById("tttBoard");

  board.innerHTML = "";

  tttPlayer = "X";
  tttGameActive = true;

  document.getElementById("tttStatus").textContent = "X's turn";

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");

    cell.className = "ttt-cell";

    cell.addEventListener("click", playTTT);

    board.appendChild(cell);
  }
}

function playTTT() {
  if (!tttGameActive || this.textContent !== "") return;

  this.textContent = tttPlayer;

  const cells = [...document.querySelectorAll(".ttt-cell")];

  const won = winPatterns.some(pattern => {
    return pattern.every(index => {
      return cells[index].textContent === tttPlayer;
    });
  });

  if (won) {
    document.getElementById("tttStatus").textContent =
      tttPlayer + " WINS!";

    tttGameActive = false;
    return;
  }

  const full = cells.every(cell => cell.textContent !== "");

  if (full) {
    document.getElementById("tttStatus").textContent = "DRAW!";
    tttGameActive = false;
    return;
  }

  tttPlayer = tttPlayer === "X" ? "O" : "X";

  document.getElementById("tttStatus").textContent =
    tttPlayer + "'s turn";
}

document.getElementById("tttReset").addEventListener("click", resetTTT);

resetTTT();
