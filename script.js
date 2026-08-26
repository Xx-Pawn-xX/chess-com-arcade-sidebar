/* =========================
   TABS
========================= */

let activeGame = "runner";

const tabs =
  document.querySelectorAll(".tab");

const games =
  document.querySelectorAll(".game");


tabs.forEach(tab => {

  tab.addEventListener("click", () => {

    const gameName =
      tab.dataset.game;

    tabs.forEach(t =>
      t.classList.remove("active")
    );

    games.forEach(g =>
      g.classList.remove("active-game")
    );

    tab.classList.add("active");

    document
      .getElementById(gameName)
      .classList.add("active-game");

    activeGame = gameName;


    if (gameName !== "runner") {
      stopRunner();
    }

    if (gameName !== "flappy") {
      stopFlappy();
    }

    if (gameName !== "snake") {
      clearInterval(snakeInterval);
    }

    if (gameName !== "timeattack") {
      stopTimeAttack();
    }

    if (gameName !== "cps") {
      clearInterval(cpsInterval);
      cpsRunning = false;
    }

  });

});


/* =========================
   CHESS RUNNER
========================= */

const runnerCanvas =
  document.getElementById("runnerCanvas");

const rctx =
  runnerCanvas.getContext("2d");

let knightY = 160;
let velocityY = 0;
let jumping = false;
let spikes = [];
let runnerScore = 0;
let runnerRunning = false;

let runnerBest =
  Number(localStorage.getItem("runnerBest")) || 0;

document.getElementById("runnerBest").textContent =
  runnerBest;


function startRunner() {

  if (activeGame !== "runner") return;

  if (!runnerRunning) {

    runnerRunning = true;

    document.getElementById(
      "jumpButton"
    ).disabled = false;

    document.getElementById(
      "runnerStart"
    ).textContent = "RUNNING";

  }

}


function stopRunner() {

  runnerRunning = false;

  document.getElementById(
    "jumpButton"
  ).disabled = true;

  document.getElementById(
    "runnerStart"
  ).textContent = "START";

}


document.getElementById(
  "runnerStart"
).addEventListener("click", startRunner);


document.getElementById(
  "runnerStop"
).addEventListener("click", stopRunner);


function jump() {

  if (
    activeGame !== "runner" ||
    !runnerRunning
  ) return;

  if (!jumping) {

    velocityY = -13;

    jumping = true;

  }

}


document.getElementById(
  "jumpButton"
).addEventListener(
  "pointerdown",
  event => {

    event.preventDefault();

    jump();

  }
);


document.addEventListener(
  "keydown",
  event => {

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

  }
);


function resetRunner() {

  knightY = 160;
  velocityY = 0;
  jumping = false;
  spikes = [];
  runnerScore = 0;

  document.getElementById(
    "runnerScore"
  ).textContent = "0";

}


function updateRunner() {

  if (
    activeGame !== "runner" ||
    !runnerRunning
  ) return;


  velocityY += 0.7;

  knightY += velocityY;


  if (knightY >= 160) {

    knightY = 160;

    velocityY = 0;

    jumping = false;

  }


  const displayedScore =
    Math.floor(runnerScore / 5);


  /* Faster every 100 score */

  const speedLevel =
    Math.floor(displayedScore / 100);

  const runnerSpeed =
    6 + speedLevel;


  const lastSpike =
    spikes[spikes.length - 1];


  /* Guaranteed spacing */

  if (
    (
      !lastSpike ||
      lastSpike.x < 250
    ) &&
    Math.random() < 0.012
  ) {

    spikes.push({

      x: runnerCanvas.width,

      width:
        22 +
        Math.random() * 10

    });

  }


  spikes.forEach(spike => {

    spike.x -= runnerSpeed;

  });


  spikes =
    spikes.filter(
      spike => spike.x > -60
    );


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

  document.getElementById(
    "runnerScore"
  ).textContent =
    displayedScore;

}


function drawRunner() {

  rctx.clearRect(
    0,
    0,
    runnerCanvas.width,
    runnerCanvas.height
  );


  rctx.strokeStyle = "#555";

  rctx.beginPath();

  rctx.moveTo(0, 200);

  rctx.lineTo(
    runnerCanvas.width,
    200
  );

  rctx.stroke();


  rctx.font = "55px Arial";

  rctx.fillStyle = "white";

  rctx.fillText(
    "♞",
    55,
    knightY + 40
  );


  rctx.fillStyle = "#ff2020";


  spikes.forEach(spike => {

    rctx.beginPath();

    rctx.moveTo(
      spike.x,
      200
    );

    rctx.lineTo(
      spike.x +
      spike.width / 2,
      160
    );

    rctx.lineTo(
      spike.x +
      spike.width,
      200
    );

    rctx.fill();

  });

}


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
    ).textContent =
      runnerBest;

  }


  stopRunner();

  resetRunner();


  setTimeout(() => {

    if (activeGame === "runner") {

      alert(
        "GAME OVER!\nScore: " +
        score
      );

    }

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
   FLAPPY PAWN
========================= */

const flappyCanvas =
  document.getElementById("flappyCanvas");

const fctx =
  flappyCanvas.getContext("2d");

let flappyRunning = false;
let pawnY = 180;
let pawnVelocity = 0;
let rookPairs = [];
let flappyScore = 0;

let flappyBest =
  Number(localStorage.getItem("flappyBest")) || 0;

document.getElementById(
  "flappyBest"
).textContent = flappyBest;


function startFlappy() {

  if (activeGame !== "flappy") return;

  flappyRunning = true;

  pawnY = 180;

  pawnVelocity = 0;

  rookPairs = [];

  flappyScore = 0;

  document.getElementById(
    "flappyScore"
  ).textContent = "0";

  document.getElementById(
    "flapButton"
  ).disabled = false;

}


function stopFlappy() {

  flappyRunning = false;

  document.getElementById(
    "flapButton"
  ).disabled = true;

}


function flap() {

  if (
    activeGame !== "flappy" ||
    !flappyRunning
  ) return;

  pawnVelocity = -8;

}


document.getElementById(
  "flappyStart"
).addEventListener(
  "click",
  startFlappy
);


document.getElementById(
  "flapButton"
).addEventListener(
  "pointerdown",
  event => {

    event.preventDefault();

    flap();

  }
);


document.addEventListener(
  "keydown",
  event => {

    if (
      activeGame === "flappy" &&
      flappyRunning &&
      (
        event.code === "Space" ||
        event.code === "ArrowUp"
      )
    ) {

      event.preventDefault();

      flap();

    }

  }
);


function updateFlappy() {

  if (
    activeGame !== "flappy" ||
    !flappyRunning
  ) return;


  pawnVelocity += 0.45;

  pawnY += pawnVelocity;


  if (
    pawnY < 0 ||
    pawnY + 40 >
    flappyCanvas.height
  ) {

    gameOverFlappy();

    return;

  }


  const lastPair =
    rookPairs[rookPairs.length - 1];


  if (
    !lastPair ||
    lastPair.x < 260
  ) {

    const gapSize = 145;

    const gapTop =
      70 +
      Math.random() * 140;


    rookPairs.push({

      x: flappyCanvas.width,

      gapTop: gapTop,

      gapBottom:
        gapTop + gapSize,

      passed: false

    });

  }


  const speed =
    3 +
    Math.floor(flappyScore / 10) *
    0.4;


  rookPairs.forEach(pair => {

    pair.x -= speed;

  });


  for (const pair of rookPairs) {

    const pawnLeft = 75;

    const pawnRight = 115;

    const pawnTop = pawnY;

    const pawnBottom =
      pawnY + 40;


    if (
      pawnRight > pair.x &&
      pawnLeft < pair.x + 55
    ) {

      if (
        pawnTop < pair.gapTop ||
        pawnBottom > pair.gapBottom
      ) {

        gameOverFlappy();

        return;

      }

    }


    if (
      !pair.passed &&
      pair.x + 55 < pawnLeft
    ) {

      pair.passed = true;

      flappyScore++;

      document.getElementById(
        "flappyScore"
      ).textContent =
        flappyScore;

    }

  }


  rookPairs =
    rookPairs.filter(
      pair => pair.x > -80
    );

}


function drawFlappy() {

  fctx.clearRect(
    0,
    0,
    flappyCanvas.width,
    flappyCanvas.height
  );


  fctx.font = "55px Arial";

  fctx.fillStyle = "white";

  fctx.fillText(
    "♟",
    70,
    pawnY + 40
  );


  fctx.fillStyle = "#ff2020";

  fctx.font = "55px Arial";


  rookPairs.forEach(pair => {

    for (
      let y = 45;
      y < pair.gapTop;
      y += 45
    ) {

      fctx.fillText(
        "♜",
        pair.x,
        y
      );

    }


    for (
      let y =
        pair.gapBottom + 45;

      y <
        flappyCanvas.height;

      y += 45
    ) {

      fctx.fillText(
        "♜",
        pair.x,
        y
      );

    }

  });

}


function gameOverFlappy() {

  const score = flappyScore;

  stopFlappy();


  if (score > flappyBest) {

    flappyBest = score;

    localStorage.setItem(
      "flappyBest",
      flappyBest
    );

    document.getElementById(
      "flappyBest"
    ).textContent =
      flappyBest;

  }


  setTimeout(() => {

    if (activeGame === "flappy") {

      alert(
        "GAME OVER!\nScore: " +
        score
      );

    }

  }, 50);

}


function flappyLoop() {

  updateFlappy();

  if (activeGame === "flappy") {
    drawFlappy();
  }

  requestAnimationFrame(flappyLoop);

}


flappyLoop();


/* =========================
   COLOR SORT
========================= */

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
          Math.random() *
          colors.length
        )
      ];

    const ball =
      document.createElement("div");

    ball.className = "ball";

    ball.style.background = color;

    ball.dataset.color = color;


    ball.addEventListener(
      "click",
      () => {

        document
          .querySelectorAll(".ball")
          .forEach(b =>
            b.classList.remove("selected")
          );

        selectedBall = ball;

        ball.classList.add("selected");

      }
    );


    balls.appendChild(ball);

  }

}


document
  .querySelectorAll(".zone")
  .forEach(zone => {

    zone.addEventListener(
      "click",
      () => {

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
            document.querySelectorAll(
              ".ball"
            ).length === 0
          ) {

            document.getElementById(
              "sortMessage"
            ).textContent =
              "YOU WIN!";

          }

        } else {

          document.getElementById(
            "sortMessage"
          ).textContent =
            "Wrong color!";

        }

      }
    );

  });


document.getElementById(
  "newSortButton"
).addEventListener(
  "click",
  startSortGame
);


startSortGame();


/* =========================
   TIME ATTACK
========================= */

let timeAttackScore = 0;
let timeAttackStartTime = 0;
let timeAttackTimer = null;
let timeAttackRunning = false;

let timeAttackBest =
  Number(
    localStorage.getItem(
      "timeAttackBest"
    )
  ) || 0;


const targetArea =
  document.getElementById("targetArea");


if (timeAttackBest > 0) {

  document.getElementById(
    "timeAttackBest"
  ).textContent =
    timeAttackBest.toFixed(2) + "s";

}


function startTimeAttack() {

  clearInterval(timeAttackTimer);

  targetArea.innerHTML = "";

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
  ).textContent = "";


  timeAttackTimer =
    setInterval(() => {

      if (!timeAttackRunning) return;

      const elapsed =
        (
          performance.now() -
          timeAttackStartTime
        ) / 1000;

      document.getElementById(
        "timeAttackTime"
      ).textContent =
        elapsed.toFixed(2);

    }, 30);


  spawnTarget();

}


document.getElementById(
  "timeAttackStart"
).addEventListener(
  "click",
  startTimeAttack
);


function spawnTarget() {

  if (!timeAttackRunning) return;

  targetArea.innerHTML = "";


  const target =
    document.createElement("div");

  target.className = "target";


  const size = 40;

  const maxX =
    Math.max(
      0,
      targetArea.clientWidth - size
    );

  const maxY =
    Math.max(
      0,
      targetArea.clientHeight - size
    );


  target.style.left =
    Math.random() *
    maxX +
    "px";

  target.style.top =
    Math.random() *
    maxY +
    "px";


  target.addEventListener(
    "pointerdown",
    event => {

      event.preventDefault();

      if (!timeAttackRunning) return;


      timeAttackScore++;


      document.getElementById(
        "timeAttackScore"
      ).textContent =
        timeAttackScore;


      if (
        timeAttackScore >= 30
      ) {

        finishTimeAttack();

      } else {

        spawnTarget();

      }

    }
  );


  targetArea.appendChild(target);

}


function finishTimeAttack() {

  if (!timeAttackRunning) return;


  const finalTime =
    (
      performance.now() -
      timeAttackStartTime
    ) / 1000;


  timeAttackRunning = false;

  clearInterval(timeAttackTimer);

  targetArea.innerHTML = "";


  document.getElementById(
    "timeAttackTime"
  ).textContent =
    finalTime.toFixed(2);


  document.getElementById(
    "timeAttackMessage"
  ).textContent =
    "FINISHED IN " +
    finalTime.toFixed(2) +
    " SECONDS!";


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
      finalTime.toFixed(2) + "s";

  }

}


function stopTimeAttack() {

  timeAttackRunning = false;

  clearInterval(timeAttackTimer);

  targetArea.innerHTML = "";

}


/* =========================
   SNAKE
========================= */

const snakeCanvas =
  document.getElementById("snakeCanvas");

const sctx =
  snakeCanvas.getContext("2d");

let snake = null;
let food = null;
let snakeDX = 20;
let snakeDY = 0;
let snakeInterval = null;


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


  snakeInterval =
    setInterval(
      updateSnake,
      180
    );

}


document.getElementById(
  "snakeStart"
).addEventListener(
  "click",
  startSnake
);


function changeSnakeDirection(
  direction
) {

  if (!snake) return;


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


function updateSnake() {

  if (
    activeGame !== "snake" ||
    !snake
  ) return;


  const head = {

    x:
      snake[0].x +
      snakeDX,

    y:
      snake[0].y +
      snakeDY

  };


  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= 400 ||
    head.y >= 400
  ) {

    clearInterval(snakeInterval);

    snake = null;

    alert("GAME OVER!");

    return;

  }


  if (
    snake.some(
      part =>
        part.x === head.x &&
        part.y === head.y
    )
  ) {

    clearInterval(snakeInterval);

    snake = null;

    alert("GAME OVER!");

    return;

  }


  snake.unshift(head);


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


function drawSnake() {

  sctx.clearRect(
    0,
    0,
    400,
    400
  );


  if (!snake || !food) return;


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


/* =========================
   REACTION
========================= */

let reactionReady = false;
let reactionStartTime = 0;
let reactionTimer = null;

const reactionBox =
  document.getElementById("reactionBox");


document.getElementById(
  "reactionStart"
).addEventListener(
  "click",
  () => {

    reactionReady = false;

    reactionBox.style.background =
      "#222";

    reactionBox.textContent =
      "WAIT...";


    clearTimeout(reactionTimer);


    reactionTimer =
      setTimeout(() => {

        reactionReady = true;

        reactionStartTime =
          performance.now();

        reactionBox.style.background =
          "#ff2020";

        reactionBox.textContent =
          "CLICK!";

      },
      1000 +
      Math.random() * 3000
    );

  }
);


reactionBox.addEventListener(
  "pointerdown",
  () => {

    if (!reactionReady) return;


    const time =
      performance.now() -
      reactionStartTime;


    reactionReady = false;

    reactionBox.style.background =
      "#222";

    reactionBox.textContent =
      Math.round(time) +
      " ms";

  }
);


/* =========================
   CPS
========================= */

let cpsRunning = false;
let cpsClicks = 0;
let cpsTime = 5;
let cpsInterval = null;


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
      ).textContent = "0";


      document.getElementById(
        "cpsButton"
      ).textContent =
        "CLICK FAST!";


      clearInterval(cpsInterval);


      cpsInterval =
        setInterval(() => {

          cpsTime--;


          document.getElementById(
            "cpsTime"
          ).textContent =
            cpsTime;


          if (cpsTime <= 0) {

            clearInterval(cpsInterval);

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


/* =========================
   MEMORY
========================= */

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


  const cards = [
    ...memorySymbols,
    ...memorySymbols
  ];


  cards.sort(
    () =>
      Math.random() - 0.5
  );


  cards.forEach(symbol => {

    const card =
      document.createElement("div");


    card.className =
      "memory-card hidden";


    card.textContent = symbol;

    card.dataset.symbol = symbol;


    card.addEventListener(
      "click",
      flipCard
    );


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
  ) return;


  this.classList.remove("hidden");

  flipped.push(this);


  if (flipped.length === 2) {

    memoryLocked = true;


    setTimeout(() => {

      if (
        flipped[0].dataset.symbol ===
        flipped[1].dataset.symbol
      ) {

        flipped.forEach(card =>
          card.classList.add("matched")
        );

      } else {

        flipped.forEach(card =>
          card.classList.add("hidden")
        );

      }


      flipped = [];

      memoryLocked = false;

    }, 700);

  }

}


document.getElementById(
  "memoryStart"
).addEventListener(
  "click",
  startMemory
);


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
  ) return;


  this.textContent =
    tttPlayer;


  const cells =
    [
      ...document.querySelectorAll(
        ".ttt-cell"
      )
    ];


  const won =
    winPatterns.some(pattern =>
      pattern.every(index =>
        cells[index].textContent ===
        tttPlayer
      )
    );


  if (won) {

    document.getElementById(
      "tttStatus"
    ).textContent =
      tttPlayer +
      " WINS!";


    tttGameActive = false;

    return;

  }


  const full =
    cells.every(
      cell =>
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
    tttPlayer +
    "'s turn";

}


document.getElementById(
  "tttReset"
).addEventListener(
  "click",
  resetTTT
);


resetTTT();
