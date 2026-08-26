"use strict";


/* =====================================================
   TAB SYSTEM
===================================================== */

let activeGame = "runner";

const tabs = document.querySelectorAll(".tab");
const games = document.querySelectorAll(".game");


tabs.forEach(tab => {

  tab.addEventListener("click", () => {

    const gameName = tab.dataset.game;

    tabs.forEach(t => {
      t.classList.remove("active");
    });

    games.forEach(game => {
      game.classList.remove("active-game");
    });

    tab.classList.add("active");

    const selectedGame = document.getElementById(gameName);

    if (selectedGame) {
      selectedGame.classList.add("active-game");
    }

    activeGame = gameName;

    /* Stop games when leaving them */

    if (gameName !== "runner") {
      stopRunner();
    }

    if (gameName !== "snake") {
      stopSnake();
    }

    if (gameName !== "cps") {
      stopCPS();
    }

    if (gameName !== "timeattack") {
      stopTimeAttack();
    }

    if (gameName !== "reaction") {
      stopReaction();
    }

  });

});


/* =====================================================
   CHESS RUNNER
===================================================== */

const runnerCanvas = document.getElementById("runnerCanvas");
const rctx = runnerCanvas.getContext("2d");

let knightY = 160;
let velocityY = 0;
let jumping = false;

let spikes = [];

let runnerScore = 0;
let runnerRunning = false;

let runnerBest =
  Number(localStorage.getItem("runnerBest")) || 0;

document.getElementById("runnerBest").textContent = runnerBest;


/* ---------- START ---------- */

function startRunner() {

  if (activeGame !== "runner") {
    return;
  }

  if (runnerRunning) {
    return;
  }

  resetRunner();

  runnerRunning = true;

  document.getElementById("jumpButton").disabled = false;

  document.getElementById("runnerStart").textContent =
    "RUNNING...";

}


/* ---------- STOP ---------- */

function stopRunner() {

  runnerRunning = false;

  jumping = false;
  velocityY = 0;

  document.getElementById("jumpButton").disabled = true;

  document.getElementById("runnerStart").textContent =
    "START RUNNER";

}


/* ---------- RESET ---------- */

function resetRunner() {

  knightY = 160;
  velocityY = 0;
  jumping = false;

  spikes = [];

  runnerScore = 0;

  document.getElementById("runnerScore").textContent = "0";

}


/* ---------- JUMP ---------- */

function jump() {

  if (
    activeGame !== "runner" ||
    !runnerRunning
  ) {
    return;
  }

  if (!jumping) {

    velocityY = -13;

    jumping = true;

  }

}


document.getElementById("runnerStart")
  .addEventListener("click", startRunner);


document.getElementById("runnerStop")
  .addEventListener("click", stopRunner);


document.getElementById("jumpButton")
  .addEventListener("pointerdown", event => {

    event.preventDefault();

    jump();

  });


document.addEventListener("keydown", event => {

  if (
    activeGame === "runner" &&
    runnerRunning &&
    (
      event.code === "Space" ||
      event.code === "ArrowUp"
    )
  ) {

    event.preventDefault();

    jump();

  }

});


/* ---------- UPDATE ---------- */

function updateRunner() {

  if (
    activeGame !== "runner" ||
    !runnerRunning
  ) {
    return;
  }


  /* Gravity */

  velocityY += 0.7;

  knightY += velocityY;


  if (knightY >= 160) {

    knightY = 160;

    velocityY = 0;

    jumping = false;

  }


  /* Score */

  runnerScore++;

  const displayedScore =
    Math.floor(runnerScore / 5);


  document.getElementById("runnerScore").textContent =
    displayedScore;


  /* Speed increases every 100 score */

  const speedLevel =
    Math.floor(displayedScore / 100);

  const runnerSpeed =
    6 + speedLevel;


  /* Spike spawning */

  const lastSpike =
    spikes.length > 0
      ? spikes[spikes.length - 1]
      : null;


  /*
    Minimum distance between spikes.
    This prevents impossible double/triple spikes.
  */

  const minimumGap = 330;


  if (
    (
      !lastSpike ||
      lastSpike.x < minimumGap
    ) &&
    Math.random() < 0.012
  ) {

    spikes.push({

      x: runnerCanvas.width,

      width: 20 + Math.random() * 12

    });

  }


  /* Move spikes */

  spikes.forEach(spike => {

    spike.x -= runnerSpeed;

  });


  /* Remove old spikes */

  spikes = spikes.filter(spike => {

    return spike.x > -60;

  });


  /* Collision */

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

}


/* ---------- DRAW ---------- */

function drawRunner() {

  rctx.clearRect(
    0,
    0,
    runnerCanvas.width,
    runnerCanvas.height
  );


  /* Ground */

  rctx.strokeStyle = "#555";

  rctx.beginPath();

  rctx.moveTo(0, 200);

  rctx.lineTo(
    runnerCanvas.width,
    200
  );

  rctx.stroke();


  /* Knight */

  rctx.font = "55px Arial";

  rctx.fillStyle = "white";

  rctx.fillText(
    "♞",
    55,
    knightY + 40
  );


  /* Spikes */

  rctx.fillStyle = "#ff2020";


  spikes.forEach(spike => {

    rctx.beginPath();

    rctx.moveTo(
      spike.x,
      200
    );

    rctx.lineTo(
      spike.x + spike.width / 2,
      160
    );

    rctx.lineTo(
      spike.x + spike.width,
      200
    );

    rctx.fill();

  });

}


/* ---------- GAME OVER ---------- */

function gameOverRunner() {

  const score =
    Math.floor(runnerScore / 5);


  if (score > runnerBest) {

    runnerBest = score;

    localStorage.setItem(
      "runnerBest",
      runnerBest
    );

    document.getElementById(
      "runnerBest"
    ).textContent = runnerBest;

  }


  stopRunner();

  resetRunner();


  setTimeout(() => {

    if (activeGame === "runner") {

      alert(
        "GAME OVER!\nScore: " + score
      );

    }

  }, 50);

}


/* ---------- LOOP ---------- */

function runnerLoop() {

  updateRunner();

  drawRunner();

  requestAnimationFrame(runnerLoop);

}

runnerLoop();


/* =====================================================
   COLOR SORT
===================================================== */

const colors = [
  "red",
  "blue",
  "green",
  "yellow"
];

let selectedBall = null;


function startSortGame() {

  const balls =
    document.getElementById("balls");

  balls.innerHTML = "";

  selectedBall = null;

  document.getElementById(
    "sortMessage"
  ).textContent = "";


  for (let i = 0; i < 8; i++) {

    const color =
      colors[
        Math.floor(
          Math.random() * colors.length
        )
      ];


    const ball =
      document.createElement("div");

    ball.className = "ball";

    ball.style.background = color;

    ball.dataset.color = color;


    ball.addEventListener("click", () => {

      document
        .querySelectorAll(".ball")
        .forEach(b => {

          b.classList.remove("selected");

        });


      selectedBall = ball;

      ball.classList.add("selected");

    });


    balls.appendChild(ball);

  }

}


document
  .querySelectorAll(".zone")
  .forEach(zone => {

    zone.addEventListener("click", () => {

      if (!selectedBall) {

        document.getElementById(
          "sortMessage"
        ).textContent =
          "Pick a ball first!";

        return;

      }


      if (
        selectedBall.dataset.color ===
        zone.dataset.color
      ) {

        selectedBall.remove();

        selectedBall = null;

        document.getElementById(
          "sortMessage"
        ).textContent =
          "Correct!";


        if (
          document.querySelectorAll(".ball")
            .length === 0
        ) {

          document.getElementById(
            "sortMessage"
          ).textContent =
            "YOU SORTED EVERYTHING!";

        }

      } else {

        document.getElementById(
          "sortMessage"
        ).textContent =
          "Wrong color!";

      }

    });

  });


document.getElementById(
  "newSortButton"
).addEventListener(
  "click",
  startSortGame
);


startSortGame();


/* =====================================================
   TIME ATTACK
===================================================== */

let timeAttackScore = 0;
let timeAttackStartTime = 0;
let timeAttackTimer = null;
let timeAttackRunning = false;


let timeAttackBest =
  Number(
    localStorage.getItem("timeAttackBest")
  ) || 0;


const targetArea =
  document.getElementById("targetArea");

const timeAttackStartButton =
  document.getElementById("timeAttackStart");


/* ---------- Start ---------- */

function startTimeAttack() {

  /* Make absolutely sure no old timer exists */

  stopTimeAttack();


  timeAttackScore = 0;

  timeAttackRunning = true;

  timeAttackStartTime =
    performance.now();


  document.getElementById(
    "timeAttackScore"
  ).textContent = "0";


  document.getElementById(
    "timeAttackTime"
  ).textContent = "0.00";


  document.getElementById(
    "timeAttackMessage"
  ).textContent =
    "GO!";


  timeAttackStartButton.textContent =
    "RESTART";


  spawnTarget();


  /*
    Update the displayed time frequently.
  */

  timeAttackTimer =
    setInterval(() => {

      if (!timeAttackRunning) {
        return;
      }


      const elapsed =
        (
          performance.now() -
          timeAttackStartTime
        ) / 1000;


      document.getElementById(
        "timeAttackTime"
      ).textContent =
        elapsed.toFixed(2);

    }, 50);

}


/* ---------- Spawn Target ---------- */

function spawnTarget() {

  if (!timeAttackRunning) {
    return;
  }


  targetArea.innerHTML = "";


  const target =
    document.createElement("div");


  target.className = "target";


  /*
    Use the actual target area dimensions.
    This works on desktop AND mobile.
  */

  const areaWidth =
    targetArea.clientWidth;

  const areaHeight =
    targetArea.clientHeight;


  const targetSize = 35;


  const maxX =
    Math.max(
      0,
      areaWidth - targetSize
    );


  const maxY =
    Math.max(
      0,
      areaHeight - targetSize
    );


  target.style.left =
    Math.random() * maxX + "px";


  target.style.top =
    Math.random() * maxY + "px";


  target.addEventListener(
    "pointerdown",
    event => {

      event.preventDefault();

      event.stopPropagation();


      if (!timeAttackRunning) {
        return;
      }


      timeAttackScore++;


      document.getElementById(
        "timeAttackScore"
      ).textContent =
        timeAttackScore;


      if (timeAttackScore >= 30) {

        finishTimeAttack();

      } else {

        spawnTarget();

      }

    }
  );


  targetArea.appendChild(target);

}


/* ---------- Finish ---------- */

function finishTimeAttack() {

  if (!timeAttackRunning) {
    return;
  }


  const finalTime =
    (
      performance.now() -
      timeAttackStartTime
    ) / 1000;


  timeAttackRunning = false;


  clearInterval(timeAttackTimer);

  timeAttackTimer = null;


  targetArea.innerHTML = "";


  document.getElementById(
    "timeAttackTime"
  ).textContent =
    finalTime.toFixed(2);


  document.getElementById(
    "timeAttackMessage"
  ).textContent =
    "FINISHED! " +
    finalTime.toFixed(2) +
    " seconds";


  timeAttackStartButton.textContent =
    "PLAY AGAIN";


  if (
    timeAttackBest === 0 ||
    finalTime < timeAttackBest
  ) {

    timeAttackBest = finalTime;


    localStorage.setItem(
      "timeAttackBest",
      timeAttackBest
    );


    document.getElementById(
      "timeAttackBest"
    ).textContent =
      timeAttackBest.toFixed(2) + "s";

  }

}


/* ---------- Stop ---------- */

function stopTimeAttack() {

  timeAttackRunning = false;

  clearInterval(timeAttackTimer);

  timeAttackTimer = null;

  targetArea.innerHTML = "";

}


/* ---------- Best ---------- */

if (timeAttackBest > 0) {

  document.getElementById(
    "timeAttackBest"
  ).textContent =
    timeAttackBest.toFixed(2) + "s";

}


timeAttackStartButton.addEventListener(
  "click",
  startTimeAttack
);


/* =====================================================
   SNAKE
===================================================== */

const snakeCanvas =
  document.getElementById("snakeCanvas");

const sctx =
  snakeCanvas.getContext("2d");


let snake = null;
let food = null;

let snakeDX = 20;
let snakeDY = 0;

let snakeInterval = null;


/* ---------- Food ---------- */

function randomFood() {

  return {

    x:
      Math.floor(
        Math.random() * 20
      ) * 20,

    y:
      Math.floor(
        Math.random() * 20
      ) * 20

  };

}


/* ---------- Start ---------- */

function startSnake() {

  clearInterval(snakeInterval);


  snake = [
    {
      x: 200,
      y: 200
    }
  ];


  food = randomFood();


  snakeDX = 20;
  snakeDY = 0;


  document.getElementById(
    "snakeScore"
  ).textContent = "0";


  drawSnake();


  /* Slower snake */

  snakeInterval =
    setInterval(
      updateSnake,
      180
    );

}


/* ---------- Stop ---------- */

function stopSnake() {

  clearInterval(snakeInterval);

  snakeInterval = null;

}


/* ---------- Direction ---------- */

function changeSnakeDirection(direction) {

  if (!snake) {
    return;
  }


  if (
    direction === "up" &&
    snakeDY === 0
  ) {

    snakeDX = 0;
    snakeDY = -20;

  }


  if (
    direction === "down" &&
    snakeDY === 0
  ) {

    snakeDX = 0;
    snakeDY = 20;

  }


  if (
    direction === "left" &&
    snakeDX === 0
  ) {

    snakeDX = -20;
    snakeDY = 0;

  }


  if (
    direction === "right" &&
    snakeDX === 0
  ) {

    snakeDX = 20;
    snakeDY = 0;

  }

}


document
  .querySelectorAll("[data-snake]")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        changeSnakeDirection(
          button.dataset.snake
        );

      }
    );

  });


document.getElementById(
  "snakeStart"
).addEventListener(
  "click",
  startSnake
);


/* ---------- Update ---------- */

function updateSnake() {

  if (
    activeGame !== "snake" ||
    !snake
  ) {

    return;

  }


  const head = {

    x:
      snake[0].x + snakeDX,

    y:
      snake[0].y + snakeDY

  };


  /* Wall collision */

  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= 400 ||
    head.y >= 400
  ) {

    snakeGameOver();

    return;

  }


  /* Self collision */

  if (
    snake.some(part =>
      part.x === head.x &&
      part.y === head.y
    )
  ) {

    snakeGameOver();

    return;

  }


  snake.unshift(head);


  /* Food */

  if (
    head.x === food.x &&
    head.y === food.y
  ) {

    food = randomFood();


    document.getElementById(
      "snakeScore"
    ).textContent =
      snake.length - 1;

  } else {

    snake.pop();

  }


  drawSnake();

}


/* ---------- Game Over ---------- */

function snakeGameOver() {

  stopSnake();

  snake = null;

  drawSnake();

  setTimeout(() => {

    if (activeGame === "snake") {

      alert("GAME OVER!");

    }

  }, 50);

}


/* ---------- Draw ---------- */

function drawSnake() {

  sctx.clearRect(
    0,
    0,
    400,
    400
  );


  if (!snake || !food) {
    return;
  }


  sctx.fillStyle = "#ff2020";


  snake.forEach(part => {

    sctx.fillRect(
      part.x,
      part.y,
      18,
      18
    );

  });


  sctx.fillStyle = "white";


  sctx.fillRect(
    food.x,
    food.y,
    18,
    18
  );

}


/* =====================================================
   REACTION TEST
===================================================== */

let reactionReady = false;
let reactionStartTime = 0;
let reactionTimer = null;


const reactionBox =
  document.getElementById("reactionBox");


function stopReaction() {

  reactionReady = false;

  clearTimeout(reactionTimer);

  reactionTimer = null;

}


document.getElementById(
  "reactionStart"
).addEventListener(
  "click",
  () => {

    stopReaction();


    reactionBox.style.background =
      "#222";


    reactionBox.textContent =
      "WAIT...";


    reactionTimer =
      setTimeout(() => {

        if (activeGame !== "reaction") {
          return;
        }


        reactionReady = true;


        reactionStartTime =
          performance.now();


        reactionBox.style.background =
          "#ff2020";


        reactionBox.textContent =
          "CLICK!";


      }, 1000 + Math.random() * 3000);

  }
);


reactionBox.addEventListener(
  "pointerdown",
  () => {

    if (!reactionReady) {
      return;
    }


    const reactionTime =
      performance.now() -
      reactionStartTime;


    reactionReady = false;


    reactionBox.style.background =
      "#222";


    reactionBox.textContent =
      Math.round(reactionTime) +
      " ms";

  }
);


/* =====================================================
   CPS TEST
===================================================== */

let cpsRunning = false;
let cpsClicks = 0;
let cpsTime = 5;
let cpsInterval = null;


function stopCPS() {

  clearInterval(cpsInterval);

  cpsInterval = null;

  cpsRunning = false;

  cpsTime = 5;

}


document.getElementById(
  "cpsButton"
).addEventListener(
  "pointerdown",
  event => {

    event.preventDefault();


    if (!cpsRunning) {

      cpsRunning = true;

      cpsClicks = 1;

      cpsTime = 5;


      document.getElementById(
        "cpsClicks"
      ).textContent =
        cpsClicks;


      document.getElementById(
        "cpsTime"
      ).textContent =
        cpsTime;


      document.getElementById(
        "cpsResult"
      ).textContent =
        "0";


      document.getElementById(
        "cpsButton"
      ).textContent =
        "CLICK FAST!";


      cpsInterval =
        setInterval(() => {

          cpsTime--;


          document.getElementById(
            "cpsTime"
          ).textContent =
            cpsTime;


          if (cpsTime <= 0) {

            clearInterval(cpsInterval);

            cpsInterval = null;

            cpsRunning = false;


            document.getElementById(
              "cpsResult"
            ).textContent =
              (
                cpsClicks / 5
              ).toFixed(1);


            document.getElementById(
              "cpsButton"
            ).textContent =
              "CLICK TO START";

          }

        }, 1000);

    } else {

      cpsClicks++;


      document.getElementById(
        "cpsClicks"
      ).textContent =
        cpsClicks;

    }

  }
);


/* =====================================================
   MEMORY
===================================================== */

const memorySymbols = [

  "♟",
  "♞",
  "♜",
  "♛",
  "🔥",
  "💎",
  "⚡",
  "🚀"

];


let flipped = [];
let memoryLocked = false;


function startMemory() {

  const board =
    document.getElementById(
      "memoryBoard"
    );


  board.innerHTML = "";

  flipped = [];

  memoryLocked = false;


  let cards = [
    ...memorySymbols,
    ...memorySymbols
  ];


  cards.sort(
    () => Math.random() - 0.5
  );


  cards.forEach(symbol => {

    const card =
      document.createElement("div");


    card.className =
      "memory-card hidden";


    card.textContent =
      symbol;


    card.dataset.symbol =
      symbol;


    card.addEventListener(
      "click",
      flipCard
    );


    board.appendChild(card);

  });

}


function flipCard() {

  if (
    memoryLocked ||
    !this.classList.contains("hidden") ||
    flipped.length >= 2
  ) {

    return;

  }


  /*
    Remove hidden.
    This makes the actual emoji visible.
  */

  this.classList.remove("hidden");


  flipped.push(this);


  if (flipped.length === 2) {

    memoryLocked = true;


    const first = flipped[0];
    const second = flipped[1];


    setTimeout(() => {

      if (
        first.dataset.symbol ===
        second.dataset.symbol
      ) {

        first.classList.add("matched");
        second.classList.add("matched");

      } else {

        first.classList.add("hidden");
        second.classList.add("hidden");

      }


      flipped = [];

      memoryLocked = false;

    }, 650);

  }

}


document.getElementById(
  "memoryStart"
).addEventListener(
  "click",
  startMemory
);


startMemory();


/* =====================================================
   TIC TAC TOE
===================================================== */

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

  const board =
    document.getElementById(
      "tttBoard"
    );


  board.innerHTML = "";


  tttPlayer = "X";

  tttGameActive = true;


  document.getElementById(
    "tttStatus"
  ).textContent =
    "X's turn";


  for (let i = 0; i < 9; i++) {

    const cell =
      document.createElement("div");


    cell.className =
      "ttt-cell";


    cell.addEventListener(
      "click",
      playTTT
    );


    board.appendChild(cell);

  }

}


function playTTT() {

  if (
    !tttGameActive ||
    this.textContent !== ""
  ) {

    return;

  }


  this.textContent =
    tttPlayer;


  const cells =
    [
      ...document.querySelectorAll(
        ".ttt-cell"
      )
    ];


  const won =
    winPatterns.some(pattern => {

      return pattern.every(index => {

        return (
          cells[index].textContent ===
          tttPlayer
        );

      });

    });


  if (won) {

    document.getElementById(
      "tttStatus"
    ).textContent =
      tttPlayer + " WINS!";


    tttGameActive = false;

    return;

  }


  const full =
    cells.every(cell =>
      cell.textContent !== ""
    );


  if (full) {

    document.getElementById(
      "tttStatus"
    ).textContent =
      "DRAW!";


    tttGameActive = false;

    return;

  }


  tttPlayer =
    tttPlayer === "X"
      ? "O"
      : "X";


  document.getElementById(
    "tttStatus"
  ).textContent =
    tttPlayer + "'s turn";

}


document.getElementById(
  "tttReset"
).addEventListener(
  "click",
  resetTTT
);


resetTTT();
